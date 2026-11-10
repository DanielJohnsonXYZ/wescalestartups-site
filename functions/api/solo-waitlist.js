import { checkFormRequest } from "./_form-guard.js";
import { basicAuth } from "./_basic-auth.js";

const TO = "daniel@wescalestartups.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STAGES = new Set(["", "idea", "building", "launched", "customers"]);

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

function clip(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function alertOwner(env, data) {
  if (!env.RESEND_API_KEY) {
    console.warn("WSS Solo waitlist: no Resend key, subscriber was saved to Customer.io");
    return;
  }
  const fields = [
    "New WSS Solo waitlist signup",
    "",
    "Name: " + data.name,
    "Email: " + data.email,
    "Stage: " + (data.stage || "Not provided"),
    "Consent: Yes, WSS Solo cohort updates",
    "Joined at: " + data.joinedAt,
    "Source: " + data.source,
    "UTM source: " + data.utmSource,
    "UTM medium: " + data.utmMedium,
    "UTM campaign: " + data.utmCampaign,
    "",
    "Stored in Customer.io: wss_solo_waitlist = true"
  ];
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.RESEND_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: env.CONTACT_FORM_FROM || env.GUEST_APPLICATION_FROM || "We Scale Startups <onboarding@resend.dev>",
        to: [TO],
        reply_to: data.email,
        subject: "WSS Solo waitlist: " + data.name.replace(/[\r\n]/g, " "),
        text: fields.join("\n")
      })
    });
    if (!res.ok) console.warn("WSS Solo waitlist: owner notification rejected", res.status);
  } catch (err) {
    console.warn("WSS Solo waitlist: owner notification unavailable", String(err));
  }
}

export async function onRequestPost(context) {
  const contentLength = Number(context.request.headers.get("Content-Length") || 0);
  if (contentLength > 6000) return json(413, { ok: false, error: "Request too large." });

  let payload;
  try {
    payload = await context.request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid");
  } catch {
    return json(400, { ok: false, error: "Please check your details and try again." });
  }

  const guard = await checkFormRequest(context, payload, {
    sourcePageField: "source_page",
    honeypotFields: ["company_website"]
  });
  if (!guard.ok) {
    console.warn("WSS Solo waitlist rejected:", guard.reason);
    return json(403, { ok: false, error: "Verification failed. Refresh the page and try again." });
  }

  const name = clip(payload.name, 120);
  const email = clip(payload.email, 254).toLowerCase();
  const stage = clip(payload.stage, 25);
  const source = clip(payload.source_page, 500);
  const consent = payload.waitlist_consent === "yes";
  const utmSource = clip(payload.utm_source, 150);
  const utmMedium = clip(payload.utm_medium, 150);
  const utmCampaign = clip(payload.utm_campaign, 150);

  let sourceURL;
  try { sourceURL = new URL(source); } catch { return json(400, { ok: false, error: "Invalid page." }); }
  if (!["/solo", "/solo/"].includes(sourceURL.pathname)) {
    return json(400, { ok: false, error: "Invalid page." });
  }
  if (!name || !EMAIL_RE.test(email) || !STAGES.has(stage) || !consent) {
    return json(400, { ok: false, error: "Enter your name, a valid email and agree to WSS Solo updates." });
  }

  const env = context.env || {};
  const creds = basicAuth(env.CUSTOMER_IO_SITE_ID, env.CUSTOMER_IO_TRACK_API_KEY || env.CUSTOMER_IO_API_KEY, "wss-solo-waitlist");
  if (!creds.ok) {
    console.error("WSS Solo waitlist: Customer.io not configured", creds.reason);
    return json(503, { ok: false, error: "The waitlist is temporarily unavailable. Please try again later." });
  }

  const joinedAt = new Date().toISOString();
  const base = (env.CUSTOMER_IO_REGION || "eu").toLowerCase() === "eu"
    ? "https://track-eu.customer.io" : "https://track.customer.io";

  // Customer.io uses the email as the profile identifier. Repeated signups update
  // the same profile rather than creating a separate waitlist entry.
  const traits = {
    email,
    name,
    wss_solo_waitlist: true,
    wss_solo_waitlist_consent: true,
    wss_solo_waitlist_joined_at: joinedAt,
    wss_solo_waitlist_stage: stage || "not-provided",
    wss_solo_waitlist_source: "https://wescalestartups.com/solo",
    wss_solo_waitlist_utm_source: utmSource,
    wss_solo_waitlist_utm_medium: utmMedium,
    wss_solo_waitlist_utm_campaign: utmCampaign
  };

  try {
    const res = await fetch(base + "/api/v1/customers/" + encodeURIComponent(email), {
      method: "PUT",
      headers: {
        Authorization: "Basic " + creds.auth,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(traits)
    });
    if (!res.ok) {
      console.error("WSS Solo waitlist: Customer.io rejected signup", res.status);
      return json(503, { ok: false, error: "We couldn't save your place. Please try again." });
    }
  } catch (err) {
    console.error("WSS Solo waitlist: Customer.io unavailable", String(err));
    return json(503, { ok: false, error: "We couldn't save your place. Please try again." });
  }

  // Notifications are supplementary: a confirmed CRM save is the source of truth.
  const notification = alertOwner(env, {
    name, email, stage, source, joinedAt, utmSource, utmMedium, utmCampaign
  });
  if (typeof context.waitUntil === "function") context.waitUntil(notification);
  else await notification;

  return json(200, { ok: true, joined: true });
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
