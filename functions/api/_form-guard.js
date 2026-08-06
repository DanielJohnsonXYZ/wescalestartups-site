const ALLOWED_HOSTS = new Set([
  "wescalestartups.com",
  "www.wescalestartups.com"
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

/**
 * Verify a Cloudflare Turnstile token with siteverify.
 * Fail closed when secret/token missing or Cloudflare is unreachable.
 * @param {object} context Cloudflare Pages function context
 * @param {string|undefined|null} token
 * @returns {Promise<{ok: true}|{ok: false, reason: string}>}
 */
async function verifyTurnstile(context, token) {
  const secret = context.env?.TURNSTILE_SECRET_KEY;

  // Fail CLOSED when unconfigured, but only once the rollout flag is on.
  // See TURNSTILE_ENFORCE below.
  if (!secret) return { ok: false, reason: "turnstile_unconfigured" };
  if (!token) return { ok: false, reason: "turnstile_missing" };

  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  const ip = context.request.headers.get("CF-Connecting-IP");
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body }
    );
    const data = await res.json();
    return data?.success
      ? { ok: true }
      : { ok: false, reason: `turnstile_failed:${(data?.["error-codes"] || []).join(",")}` };
  } catch (err) {
    console.error("Turnstile verify error", err);
    // Network failure to Cloudflare's own endpoint: fail closed.
    return { ok: false, reason: "turnstile_unreachable" };
  }
}

/**
 * @param {object} context Cloudflare Pages function context
 * @param {object} payload Parsed request body
 * @param {object} [options]
 * @param {string} [options.sourcePageField="source_page"] Absolute same-site page URL field
 * @param {string[]} [options.honeypotFields] Fields that must be empty (bots fill them)
 * @param {string} [options.turnstileField="cf-turnstile-response"] Turnstile token field
 */
export async function checkFormRequest(context, payload, options = {}) {
  const sourcePageField = options.sourcePageField || "source_page";
  const honeypotFields = options.honeypotFields || DEFAULT_HONEYPOT_FIELDS;
  const tokenField = options.turnstileField || "cf-turnstile-response";

  const enforceTurnstile = context.env?.TURNSTILE_ENFORCE === "1";
  // Calendly booking stamps use keepalive on unload — no Turnstile token.
  // Skip Turnstile for that path only; Origin / source_page still apply.
  const skipTurnstile =
    payload?.booked_diagnostic === true ||
    payload?.booked_diagnostic === "true";
  if (enforceTurnstile && !skipTurnstile) {
    const ts = await verifyTurnstile(context, payload?.[tokenField]);
    if (!ts.ok) return ts;
  }

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

  return { ok: true };
}
