import { checkFormRequest } from "./_form-guard.js";
import { basicAuth } from "./_basic-auth.js";

// Growth enquiries should reach the inbox without asking visitors to open an email app.
// Do not return success unless an email provider has accepted the full enquiry.
const TO = "daniel@wescalestartups.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clip(value, max = 6000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function fields(payload) {
  return {
    name: clip(payload.name, 200),
    email: clip(payload.email, 320),
    company: clip(payload.company, 200),
    stage: clip(payload.stage, 100),
    arr: clip(payload.arr, 100),
    channels: clip(payload.channels, 500),
    bottleneck: clip(payload.bottleneck),
    budget: clip(payload.budget, 100),
    timeline: clip(payload.timeline, 300),
    help: clip(payload.help),
    source_page: clip(payload.source_page, 500)
  };
}

function emailBody(data) {
  return [
    "New WSS growth enquiry",
    "",
    "Name: " + data.name,
    "Email: " + data.email,
    "Company: " + data.company,
    "Stage: " + data.stage,
    "ARR: " + data.arr,
    "Channels: " + data.channels,
    "Budget: " + data.budget,
    "Timeline: " + data.timeline,
    "",
    "Current bottleneck:",
    data.bottleneck,
    "",
    "Help needed:",
    data.help,
    "",
    "Page: " + data.source_page
  ].join("\n");
}

async function saveToCustomerIo(context, data) {
  const env = context.env || {};
  const siteId = clip(env.CUSTOMER_IO_SITE_ID, 150);
  const apiKey = clip(env.CUSTOMER_IO_TRACK_API_KEY || env.CUSTOMER_IO_API_KEY, 1000);
  if (!siteId || !apiKey) return;
  const auth = basicAuth(siteId, apiKey, "/api/contact");
  if (!auth.ok) {
    console.warn("WSS contact: Customer.io credentials unusable");
    return;
  }
  const formId = clip(env.CUSTOMER_IO_FORM_ID, 150) || "wss-newsletter";
  const base = (env.CUSTOMER_IO_REGION || "eu").toLowerCase() === "eu"
    ? "https://track-eu.customer.io" : "https://track.customer.io";
  try {
    const res = await fetch(base + "/api/v1/forms/" + encodeURIComponent(formId) + "/submit", {
      method: "POST",
      headers: {
        Authorization: "Basic " + auth.auth,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        data: {
          email: data.email,
          name: data.name,
          source_type: "contact-form",
          source_page: data.source_page,
          lead_magnet: "growth-enquiry"
        }
      })
    });
    if (!res.ok) console.warn("WSS contact: Customer.io capture failed", res.status);
  } catch (error) {
    console.error("WSS contact: Customer.io unavailable", error);
  }
}

export async function onRequestPost(context) {
  let payload;
  try {
    payload = await context.request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return json(400, { ok: false, error: "Invalid enquiry" });
    }
  } catch (_) {
    return json(400, { ok: false, error: "Invalid enquiry" });
  }

  const guard = await checkFormRequest(context, payload);
  if (!guard.ok) {
    console.warn("WSS contact rejected", guard.reason);
    return json(403, { ok: false, error: "Verification failed. Refresh the page and try again." });
  }

  const data = fields(payload);
  if (!data.name || !data.email || !data.company || !data.stage || !data.arr || !data.bottleneck || !data.budget || !EMAIL_RE.test(data.email)) {
    return json(400, { ok: false, error: "Complete the required fields and check your email address." });
  }

  const env = context.env || {};
  const from = env.CONTACT_FORM_FROM || env.GUEST_APPLICATION_FROM || "We Scale Startups <onboarding@resend.dev>";
  if (!env.RESEND_API_KEY) {
    console.error("WSS contact email backend not configured");
    return json(503, { ok: false, error: "Email delivery temporarily unavailable. Please use the direct email link." });
  }

  let sent = false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.RESEND_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [TO],
        reply_to: data.email,
        subject: "WSS enquiry from " + data.company.replace(/[\r\n]/g, " "),
        text: emailBody(data)
      })
    });
    sent = res.ok;
    if (!sent) {
      const detail = await res.text().catch(() => "");
      console.error("WSS contact: Resend declined delivery", res.status, detail.slice(0, 300));
    }
  } catch (err) {
    console.error("WSS contact: Resend unavailable", err);
  }

  if (!sent) {
    return json(503, { ok: false, error: "Email delivery temporarily unavailable. Please use the direct email link." });
  }

  // A failed CRM capture must not undo a successful email delivery.
  const capture = saveToCustomerIo(context, data);
  if (typeof context.waitUntil === "function") context.waitUntil(capture);
  else await capture;
  return json(200, { ok: true, delivered: true });
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