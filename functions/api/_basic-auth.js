/**
 * Safe Basic-auth encoding for Customer.io Track API credentials.
 *
 * Why this exists: btoa() throws InvalidCharacterError on any code point above
 * U+00FF. A credential pasted from a rich-text source (doc, email, chat, or a
 * password manager's formatted field) can silently carry a zero-width space,
 * BOM, non-breaking space or direction mark. Because the btoa() call sat
 * outside the request's try block, that throw escaped the Pages Function and
 * Cloudflare answered with a bare text/plain 502 — every form submission on the
 * site failed, with no error visible to the visitor and no signal in the
 * response body. That outage ran for five days (2026-08-06 to 2026-08-12).
 *
 * Customer.io site IDs and Track API keys are printable-ASCII tokens. Any
 * character outside that range is paste contamination and never part of the
 * real credential, so stripping it recovers the intended value rather than
 * corrupting it. If a character was substituted rather than inserted, the
 * credential is genuinely wrong and Customer.io answers 401 — which the caller
 * reports as a normal JSON error instead of crashing the whole function.
 */

const PRINTABLE_ASCII = /[^\x20-\x7E]/g;

/** Strip non-printable / non-ASCII characters that cannot be part of a credential. */
export function sanitiseCredential(value) {
  return (typeof value === "string" ? value : "").trim().replace(PRINTABLE_ASCII, "").trim();
}

/**
 * Build a Basic-auth header value from a site ID and API key.
 * Returns { ok: true, auth } or { ok: false, reason } — never throws.
 */
export function basicAuth(rawSiteId, rawApiKey, label = "customer.io") {
  const siteId = sanitiseCredential(rawSiteId);
  const apiKey = sanitiseCredential(rawApiKey);

  if (!siteId || !apiKey) return { ok: false, reason: "missing" };

  const siteIdDirty = siteId !== String(rawSiteId ?? "").trim();
  const apiKeyDirty = apiKey !== String(rawApiKey ?? "").trim();
  if (siteIdDirty || apiKeyDirty) {
    console.warn(
      `[${label}] credential contained non-ASCII characters and was sanitised before encoding`,
      JSON.stringify({ site_id_sanitised: siteIdDirty, api_key_sanitised: apiKeyDirty })
    );
  }

  try {
    return { ok: true, auth: btoa(`${siteId}:${apiKey}`) };
  } catch (err) {
    console.error(`[${label}] credential could not be base64 encoded`, err);
    return { ok: false, reason: "unencodable" };
  }
}
