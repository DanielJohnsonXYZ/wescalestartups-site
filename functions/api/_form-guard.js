const ALLOWED_HOSTS = new Set([
  "wescalestartups.com",
  "www.wescalestartups.com"
]);

const DISPOSABLE_DOMAINS = new Set([
  "immenseignite.info"
]);

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

async function rateLimit(context) {
  const store = context.env?.FORM_RATE_LIMIT;
  if (!store?.get || !store?.put) return true;

  const ip = context.request.headers.get("CF-Connecting-IP") || "unknown";
  const minute = Math.floor(Date.now() / 60000);
  const key = `forms:${ip}:${minute}`;
  const count = Number(await store.get(key) || 0);
  if (count >= 8) return false;
  await store.put(key, String(count + 1), { expirationTtl: 120 });
  return true;
}

export async function checkFormRequest(context, payload) {
  const originHost = hostnameFrom(context.request.headers.get("Origin"));
  const refererHost = hostnameFrom(context.request.headers.get("Referer"));
  const sourceHost = hostnameFrom(payload?.source_page);

  if (payload?.website || payload?.company_website) {
    return { ok: false, reason: "honeypot" };
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

  if (!(await rateLimit(context))) {
    return { ok: false, reason: "rate_limit" };
  }

  return { ok: true };
}
