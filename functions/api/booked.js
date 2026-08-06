import { checkFormRequest } from "./_form-guard.js";

/**
 * Calendly booked_diagnostic stamp.
 * Separate from /api/forms so Turnstile is never skipped by a client-controlled
 * payload field. This path uses Origin / Referer / source_page only — the
 * client uses keepalive on unload and cannot reliably complete a challenge.
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

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }

  // Path-based: this endpoint never runs Turnstile. /api/forms has zero exemptions.
  const guard = await checkFormRequest(context, payload, { skipTurnstile: true });
  if (!guard.ok) {
    console.warn("Rejected /api/booked submission", guard.reason);
    return json(200, { ok: true });
  }

  const email = clip(payload.email || payload.Email, 320);
  if (!email || !EMAIL_RE.test(email)) return json(400, { ok: false, error: "Valid email required" });

  const env = context.env || {};
  const siteId = (env.CUSTOMER_IO_SITE_ID || "").trim();
  const apiKey = (env.CUSTOMER_IO_TRACK_API_KEY || env.CUSTOMER_IO_API_KEY || "").trim();
  if (!siteId || !apiKey) {
    console.error("Customer.io credentials missing");
    return json(503, { ok: false, error: "Email capture unavailable" });
  }

  const formId = clip(payload.form_id || payload.formId, 150) || clip(env.CUSTOMER_IO_FORM_ID, 150) || "wss-newsletter";
  const data = {
    email,
    booked_diagnostic: "true"
  };
  for (const key of ["source_page", "lead_magnet"]) {
    const value = clip(payload[key]);
    if (value) data[key] = value;
  }
  if (!data.lead_magnet) data.lead_magnet = "calendly-booking";

  const region = (env.CUSTOMER_IO_REGION || "eu").trim().toLowerCase();
  const url = `${trackBase(region)}/api/v1/forms/${encodeURIComponent(formId)}/submit`;
  const auth = btoa(`${siteId}:${apiKey}`);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ data })
    });
    if (res.ok || res.status === 204) return json(200, { ok: true, form_id: formId });
    const detail = await res.text().catch(() => "");
    console.error("Customer.io booked submit failed", res.status, detail.slice(0, 400));
    return json(502, { ok: false, error: "Customer.io rejected submission" });
  } catch (err) {
    console.error("Customer.io booked submit error", err);
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
