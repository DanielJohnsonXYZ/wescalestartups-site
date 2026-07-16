/**
 * Podcast guest application intake.
 *
 * Always emails daniel@wescalestartups.com. Delivery (first match wins):
 * 1. RESEND_API_KEY → email via Resend
 * 2. GUEST_APPLICATION_WEBHOOK_URL → POST JSON (Zapier/Make/n8n/Discord)
 * 3. FormSubmit.co fallback
 *
 * Always returns JSON. Client still copies to clipboard + offers mailto as backup.
 */

const MAX_FIELD = 8000;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function clip(value, max = MAX_FIELD) {
  const s = typeof value === "string" ? value.trim() : "";
  return s.length > max ? s.slice(0, max) + "…" : s;
}

function buildBody(data) {
  return [
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Role: ${data.role}`,
    `Website: ${data.website}`,
    `LinkedIn: ${data.linkedin}`,
    `Email: ${data.email}`,
    "",
    "What are you building?",
    data.whatBuilding,
    "",
    "How are you using AI?",
    data.howUsingAi,
    "",
    "Practical lessons for listeners:",
    data.practicalLessons,
    "",
    "Relevant links:",
    data.relevantLinks,
    "",
    `Page: ${data.page}`
  ].join("\n");
}

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }

  const data = {
    name: clip(payload.name, 200),
    company: clip(payload.company, 200),
    role: clip(payload.role, 200),
    website: clip(payload.website, 500),
    linkedin: clip(payload.linkedin, 500),
    whatBuilding: clip(payload.whatBuilding),
    howUsingAi: clip(payload.howUsingAi),
    practicalLessons: clip(payload.practicalLessons),
    relevantLinks: clip(payload.relevantLinks),
    email: clip(payload.email, 320),
    page: clip(payload.page, 500)
  };

  if (!data.name || !data.company || !data.role || !data.email) {
    return json(400, { ok: false, error: "Missing required fields" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json(400, { ok: false, error: "Invalid email" });
  }
  if (!data.whatBuilding || !data.howUsingAi || !data.practicalLessons) {
    return json(400, { ok: false, error: "Missing application answers" });
  }

  const env = context.env || {};
  const subject = `Podcast Guest Application: ${data.name} (${data.company})`;
  const textBody = buildBody(data);
  // Always notify Daniel — do not allow env overrides to divert applications.
  const to = "daniel@wescalestartups.com";

  // 1) Resend
  if (env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: env.GUEST_APPLICATION_FROM || "We Scale Startups <onboarding@resend.dev>",
          to: [to],
          reply_to: data.email,
          subject,
          text: textBody
        })
      });
      if (res.ok) {
        return json(200, { ok: true, via: "resend", to });
      }
      const detail = await res.text().catch(() => "");
      console.error("Resend failed", res.status, detail.slice(0, 300));
    } catch (err) {
      console.error("Resend error", err);
    }
  }

  // 2) Generic webhook (Zapier / Make / n8n / Discord-compatible)
  if (env.GUEST_APPLICATION_WEBHOOK_URL) {
    try {
      const res = await fetch(env.GUEST_APPLICATION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          ...data,
          text: textBody,
          source: "podcast-guest-application"
        })
      });
      if (res.ok || res.status === 202 || res.status === 204) {
        return json(200, { ok: true, via: "webhook", to });
      }
      console.error("Webhook failed", res.status);
    } catch (err) {
      console.error("Webhook error", err);
    }
  }

  // 3) FormSubmit.co — works without secrets; first live submit emails an
  // activation link to `to`. Disable with GUEST_APPLICATION_DISABLE_FORMSUBMIT=1.
  if (env.GUEST_APPLICATION_DISABLE_FORMSUBMIT !== "1") {
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _subject: subject,
          name: data.name,
          email: data.email,
          company: data.company,
          role: data.role,
          website: data.website,
          linkedin: data.linkedin,
          message: textBody,
          _template: "table",
          _captcha: "false"
        })
      });
      if (res.ok) {
        return json(200, { ok: true, via: "formsubmit", to });
      }
      console.error("FormSubmit failed", res.status, (await res.text().catch(() => "")).slice(0, 200));
    } catch (err) {
      console.error("FormSubmit error", err);
    }
  }

  // No delivery backend succeeded — client falls back to clipboard/mailto.
  return json(503, {
    ok: false,
    error: "Delivery backend unavailable",
    hint: "Set RESEND_API_KEY or GUEST_APPLICATION_WEBHOOK_URL on Cloudflare Pages"
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400"
    }
  });
}
