const FORM_RULES = {
  "growth-enquiry": { required: ["name", "email", "company", "stage", "arr", "bottleneck", "budget"], email: ["email"] },
  "course-waitlist": { required: ["name", "email"], email: ["email"] },
  "guest-application": { required: ["name", "company", "role", "what-building", "how-using-ai", "practical-lessons", "email"], email: ["email"] },
  "referral-form": { required: ["your_name", "your_email", "founder_name", "founder_email"], email: ["your_email", "founder_email"] }
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

function sanitiseFields(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const fields = {};
  for (const [key, raw] of Object.entries(value)) {
    if (!/^[a-zA-Z0-9_-]{1,64}$/.test(key) || key === "_website") continue;
    const text = String(raw ?? "").trim();
    if (text.length > 5000) return null;
    fields[key] = text;
  }
  return fields;
}

async function notifyByEmail(env, record) {
  if (!env.RESEND_API_KEY || !env.LEAD_NOTIFICATION_TO || !env.LEAD_NOTIFICATION_FROM) return;
  const lines = Object.entries(record.fields).map(([key, value]) => `${key}: ${value || "—"}`);
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.LEAD_NOTIFICATION_FROM,
      to: [env.LEAD_NOTIFICATION_TO],
      subject: `Website enquiry: ${record.formId} (${record.id})`,
      text: [`Submission: ${record.id}`, `Received: ${record.submittedAt}`, `Page: ${record.page}`, "", ...lines].join("\n")
    })
  });
}

async function forwardToMautic(env, record) {
  if (!env.MAUTIC_FORM_URL || !env.MAUTIC_FORM_ID) return;
  const email = record.fields.email || record.fields.your_email;
  if (!email) return;
  await fetch(env.MAUTIC_FORM_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      "mauticform[formId]": env.MAUTIC_FORM_ID,
      "mauticform[email]": email,
      "mauticform[source_type]": record.formId,
      "mauticform[source_page]": record.page,
      "mauticform[lead_magnet]": record.formId
    })
  });
}

export async function onRequestPost(context) {
  const requestUrl = new URL(context.request.url);
  const origin = context.request.headers.get("Origin");
  if (origin) {
    try {
      if (new URL(origin).host !== requestUrl.host) {
        return json({ ok: false, error: "origin_not_allowed" }, 403);
      }
    } catch (_) {
      return json({ ok: false, error: "origin_not_allowed" }, 403);
    }
  }

  const length = Number(context.request.headers.get("Content-Length") || 0);
  if (length > 32768) return json({ ok: false, error: "payload_too_large" }, 413);

  let payload;
  try {
    payload = await context.request.json();
  } catch (_) {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  if (payload?._website) return json({ ok: true, submissionId: crypto.randomUUID() }, 202);

  const formId = String(payload?.formId || "");
  const rules = FORM_RULES[formId];
  const fields = sanitiseFields(payload?.fields);
  if (!rules || !fields) return json({ ok: false, error: "invalid_payload" }, 400);

  const fieldErrors = {};
  for (const name of rules.required) {
    if (!fields[name]) fieldErrors[name] = "required";
  }
  for (const name of rules.email) {
    if (fields[name] && !EMAIL_RE.test(fields[name])) fieldErrors[name] = "invalid_email";
  }
  if (Object.keys(fieldErrors).length) {
    return json({ ok: false, error: "validation_failed", fields: fieldErrors }, 422);
  }

  if (!context.env.LEADS || typeof context.env.LEADS.put !== "function") {
    return json({ ok: false, error: "storage_unavailable" }, 503);
  }

  const id = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const page = typeof payload.page === "string" ? payload.page.slice(0, 500) : requestUrl.origin;
  const record = { id, formId, submittedAt, page, fields };
  const retentionDays = Math.min(Math.max(Number(context.env.LEAD_RETENTION_DAYS || 90), 1), 365);

  try {
    await context.env.LEADS.put(`lead:${submittedAt}:${id}`, JSON.stringify(record), {
      expirationTtl: retentionDays * 86400,
      metadata: { formId, submittedAt }
    });
  } catch (_) {
    return json({ ok: false, error: "storage_failed" }, 503);
  }

  context.waitUntil(Promise.allSettled([
    notifyByEmail(context.env, record),
    forwardToMautic(context.env, record)
  ]));

  return json({ ok: true, submissionId: id }, 202);
}

export function onRequest(context) {
  if (context.request.method === "POST") return onRequestPost(context);
  return json({ ok: false, error: "method_not_allowed" }, 405);
}
