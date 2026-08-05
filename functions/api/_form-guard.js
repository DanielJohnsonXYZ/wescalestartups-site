const ALLOWED_HOSTS = new Set([
  "wescalestartups.com",
  "www.wescalestartups.com"
]);

const DISPOSABLE_DOMAINS = new Set([
  "immenseignite.info"
]);

const DEFAULT_HONEYPOT_FIELDS = ["website", "company_website"];

function hostnameFrom(value) {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isAllowedHost(hostname) {
  return ALLOWED_HOSTS.has(hostname) || hostname.endsWith(".wescalestartups-site.pages.dev");
}

async function rateLimit(context, bucket = "forms") {
  const store = context.env?.FORM_RATE_LIMIT;
  if (!store?.get || !store?.put) return true;

  const ip = context.request.headers.get("CF-Connecting-IP") || "unknown";
  const minute = Math.floor(Date.now() / 60000);
  const key = `${bucket}:${ip}:${minute}`;
  const count = Number(await store.get(key) || 0);
  if (count >= 8) return false;
  await store.put(key, String(count + 1), { expirationTtl: 120 });
  return true;
}

/**
 * @param {object} context Cloudflare Pages function context
 * @param {object} payload Parsed request body
 * @param {object} [options]
 * @param {string} [options.sourcePageField="source_page"] Absolute same-site page URL field
 * @param {string[]} [options.honeypotFields] Fields that must be empty (bots fill them)
 * @param {string} [options.rateLimitBucket="forms"] KV key prefix when FORM_RATE_LIMIT is bound
 */
export async function checkFormRequest(context, payload, options = {}) {
  const sourcePageField = options.sourcePageField || "source_page";
  const honeypotFields = options.honeypotFields || DEFAULT_HONEYPOT_FIELDS;
  const rateLimitBucket = options.rateLimitBucket || "forms";

  const originHost = hostnameFrom(context.request.headers.get("Origin"));
  const refererHost = hostnameFrom(context.request.headers.get("Referer"));
  const sourceHost = hostnameFrom(payload?.[sourcePageField]);

  for (const field of honeypotFields) {
    if (payload?.[field]) {
      return { ok: false, reason: "honeypot" };
    }
  }

  if (!originHost || !isAllowedHost(originHost)) {
    return { ok: false, reason: "origin" };
  }

  if (refererHost && !isAllowedHost(refererHost)) {
    return { ok: false, reason: "referer" };
  }

  if (!sourceHost || !isAllowedHost(sourceHost)) {
    return { ok: false, reason: "source_page" };
  }

  const email = String(payload?.email || payload?.Email || "").trim().toLowerCase();
  const emailDomain = email.split("@").pop() || "";
  if (DISPOSABLE_DOMAINS.has(emailDomain)) {
    return { ok: false, reason: "email_domain" };
  }

  if (!(await rateLimit(context, rateLimitBucket))) {
    return { ok: false, reason: "rate_limit" };
  }

  return { ok: true };
}
