const ALLOWED_HOSTS = new Set([
  "wescalestartups.com",
  "www.wescalestartups.com"
]);

const DEFAULT_HONEYPOT_FIELDS = ["website", "company_website"];

/** Synthetic Customer.io profile used by scripts/lead-capture-check.sh — never a real lead. */
const MONITOR_PROBE_EMAIL = "monitor+run@wescalestartups.com";
const MONITOR_HEADER = "X-WSS-Monitor";

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

function secretsEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length === 0 || a.length !== b.length) {
    return false;
  }
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

/**
 * Cron probe may skip Turnstile when FORM_MONITOR_SECRET matches X-WSS-Monitor
 * and the body email is the allowlisted synthetic address. Origin / Referer /
 * source_page / honeypot checks still run.
 */
function isMonitorProbe(context, payload) {
  const expected = (context.env?.FORM_MONITOR_SECRET || "").trim();
  if (!expected) return false;
  const provided = context.request.headers.get(MONITOR_HEADER) || "";
  if (!secretsEqual(provided, expected)) return false;
  const email = String(payload?.email || payload?.Email || "").trim().toLowerCase();
  return email === MONITOR_PROBE_EMAIL;
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
 * @param {boolean} [options.skipTurnstile=false] Server-path only (e.g. /api/booked). Never set from client payload. Also skipped for the synthetic monitor probe when FORM_MONITOR_SECRET matches.
 */
export async function checkFormRequest(context, payload, options = {}) {
  const sourcePageField = options.sourcePageField || "source_page";
  const honeypotFields = options.honeypotFields || DEFAULT_HONEYPOT_FIELDS;
  const tokenField = options.turnstileField || "cf-turnstile-response";

  const enforceTurnstile = context.env?.TURNSTILE_ENFORCE === "1";
  // skipTurnstile is set only by trusted server handlers (path-based), never from payload.
  // Monitor probe: secret header + synthetic email only (see isMonitorProbe).
  const skipTurnstile = options.skipTurnstile || isMonitorProbe(context, payload);
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
