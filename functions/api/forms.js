/**
 * Customer.io Forms API proxy.
 *
 * Keeps Track API credentials server-side. Clients POST JSON (or form-urlencoded)
 * to /api/forms; we forward to:
 *   POST https://track[.eu].customer.io/api/v1/forms/{form_id}/submit
 *
 * Cloudflare Pages env (Production + Preview):
 *   CUSTOMER_IO_SITE_ID
 *   CUSTOMER_IO_TRACK_API_KEY
 *   CUSTOMER_IO_REGION          — "eu" (default; WSS workspace) or "us"
 *   CUSTOMER_IO_FORM_ID         — default form id when body omits form_id
 */

const MAX_ATTR = 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function clip(value, max = MAX_ATTR) {
  const s = typeof value === "string" ? value.trim() : "";
  if (!s) return "";
  return s.length > max ? s.slice(0, max) : s;
}

function trackBase(region) {
  return region === "eu" ? "https://track-eu.customer.io" : "https://track.customer.io";
}

async function readPayload(request) {
  const contentType = (request.headers.get("Content-Type") || "").toLowerCase();
  if (contentType.includes("application/json")) {
    return await request.json();
  }
  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await request.formData();
    const out = {};
    for (const [key, value] of form.entries()) {
      if (typeof value === "string") out[key] = value;
    }
    return out;
  }
  // Fallback: try JSON, then empty.
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await readPayload(context.request);
  } catch {
    return json(400, { ok: false, error: "Invalid request body" });
  }

  const email = clip(payload.email || payload.Email, 320);
  if (!email || !EMAIL_RE.test(email)) {
    return json(400, { ok: false, error: "Valid email required" });
  }

  const env = context.env || {};
  const siteId = (env.CUSTOMER_IO_SITE_ID || "").trim();
  const apiKey = (
    env.CUSTOMER_IO_TRACK_API_KEY ||
    env.CUSTOMER_IO_API_KEY ||
    ""
  ).trim();
  if (!siteId || !apiKey) {
    console.error("Customer.io credentials missing (CUSTOMER_IO_SITE_ID / CUSTOMER_IO_TRACK_API_KEY)");
    return json(503, {
      ok: false,
      error: "Email capture unavailable",
      hint: "Set CUSTOMER_IO_SITE_ID and CUSTOMER_IO_TRACK_API_KEY on Cloudflare Pages"
    });
  }

  const formId =
    clip(payload.form_id || payload.formId, 150) ||
    clip(env.CUSTOMER_IO_FORM_ID, 150) ||
    "wss-newsletter";

  const data = { email };
  const passThrough = [
    "source_type",
    "source_page",
    "lead_magnet",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "first_name",
    "name"
  ];
  for (const key of passThrough) {
    const v = clip(payload[key]);
    if (v) data[key] = v;
  }

  const region = (env.CUSTOMER_IO_REGION || "eu").trim().toLowerCase();
  const url = `${trackBase(region)}/api/v1/forms/${encodeURIComponent(formId)}/submit`;
  const auth = btoa(`${siteId}:${apiKey}`);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ data })
    });

    if (res.ok || res.status === 204) {
      return json(200, { ok: true, form_id: formId });
    }

    const detail = await res.text().catch(() => "");
    console.error("Customer.io forms submit failed", res.status, detail.slice(0, 400));
    return json(502, { ok: false, error: "Customer.io rejected submission" });
  } catch (err) {
    console.error("Customer.io forms submit error", err);
    return json(502, { ok: false, error: "Customer.io unreachable" });
  }
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
