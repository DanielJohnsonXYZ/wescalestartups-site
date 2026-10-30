import { checkFormRequest } from "./_form-guard.js";

/**
 * WSS Solo demand-discovery intake. No paid applications or automated
 * newsletter enrolment. Founder feedback is delivered to the WSS owner.
 */
const INBOX = "daniel@wescalestartups.com";
const STAGES = new Set(["idea", "launched", "first-customers", "growing"]);
const BLOCKERS = new Set(["finding-buyers", "messaging", "outreach", "conversion", "time-and-systems", "other"]);
const PRICE_FIT = new Set(["yes", "maybe", "no", "not-sure"]);

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function clip(value, maximum) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function emailBody(data) {
  return [
    "New WSS Solo discovery feedback",
    "",
    "Name: " + data.name,
    "Email: " + data.email,
    "Product stage: " + data.stage,
    "Biggest blocker: " + data.blocker,
    "£750 pilot interest: " + data.priceFit,
    "Opted into future updates: " + data.updates,
    "",
    "In their words:",
    data.feedback || "(No additional comment)",
    "",
    "Source page: " + data.page,
    "UTM source: " + data.utmSource,
    "UTM medium: " + data.utmMedium,
    "UTM campaign: " + data.utmCampaign
  ].join("\n");
}

export async function onRequestPost(context) {
  const length = Number(context.request.headers.get("Content-Length") || 0);
  if (length > 20000) return json(413, { ok: false, error: "Form too large" });

  let body;
  try {
    body = await context.request.json();
    if (!body || Array.isArray(body) || typeof body !== "object") throw new Error("Invalid");
  } catch {
    return json(400, { ok: false, error: "Invalid form data" });
  }

  const guard = await checkFormRequest(context, body, {
    sourcePageField: "source_page",
    honeypotFields: ["company_website"]
  });
  if (!guard.ok) {
    console.warn("WSS Solo feedback rejected:", guard.reason);
    return json(403, { ok: false, error: "Verification failed. Refresh and try again." });
  }

  const data = {
    name: clip(body.name, 120),
    email: clip(body.email, 320),
    stage: clip(body.stage, 60),
    blocker: clip(body.blocker, 60),
    priceFit: clip(body.price_fit, 60),
    feedback: clip(body.feedback, 1800),
    updates: body.updates === "yes" ? "yes" : "no",
    page: clip(body.source_page, 500),
    utmSource: clip(body.utm_source, 200),
    utmMedium: clip(body.utm_medium, 200),
    utmCampaign: clip(body.utm_campaign, 200)
  };

  const sourceUrl = new URL(data.page);
  if (sourceUrl.pathname !== "/solo" && sourceUrl.pathname !== "/solo/") {
    return json(400, { ok: false, error: "Invalid source page" });
  }
  if (!data.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      !STAGES.has(data.stage) || !BLOCKERS.has(data.blocker) || !PRICE_FIT.has(data.priceFit)) {
    return json(400, { ok: false, error: "Please complete all required fields" });
  }

  const env = context.env || {};
  const subject = "WSS Solo feedback: " + data.name;
  const content = emailBody(data);

  if (env.RESEND_API_KEY) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + env.RESEND_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: env.GUEST_APPLICATION_FROM || "We Scale Startups <onboarding@resend.dev>",
          to: [INBOX],
          reply_to: data.email,
          subject,
          text: content
        })
      });
      if (response.ok) return json(200, { ok: true });
      console.error("WSS Solo Resend delivery failed:", response.status);
    } catch (error) {
      console.error("WSS Solo Resend unavailable:", String(error));
    }
  }

  if (env.SOLO_INTEREST_WEBHOOK_URL) {
    try {
      const response = await fetch(env.SOLO_INTEREST_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "wss-solo", text: content })
      });
      if (response.ok) return json(200, { ok: true });
    } catch (error) {
      console.error("WSS Solo webhook unavailable:", String(error));
    }
  }

  // Established website fallback. FormSubmit may require inbox activation
  // before its first successful delivery, so prefer Resend or a webhook.
  if (env.SOLO_INTEREST_DISABLE_FORMSUBMIT !== "1") {
    try {
      const response = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(INBOX), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject,
          _template: "table",
          _captcha: "false",
          name: data.name,
          email: data.email,
          stage: data.stage,
          blocker: data.blocker,
          price_fit: data.priceFit,
          consent_updates: data.updates,
          feedback: data.feedback,
          message: content
        })
      });
      if (response.ok) return json(200, { ok: true });
    } catch (error) {
      console.error("WSS Solo form fallback unavailable:", String(error));
    }
  }

  return json(503, { ok: false, error: "Delivery temporarily unavailable" });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Allow": "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400"
    }
  });
}