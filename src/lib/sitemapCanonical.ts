/**
 * Canonical pathname rules for sitemap emission (must match `functions/_middleware.js`
 * and real redirects in `public/_redirects`). Only paths where the canonical location
 * equals the requested path should appear in the sitemap so crawlers see final 200 URLs.
 */

function normalizePathname(path: string): string {
  if (path === "" || path === "/") return "/";
  const trimmed = path.replace(/\/$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** Single-hop redirects; values may chain (we recurse). */
const REDIRECT_TO: Record<string, string> = {
  "/contact-us": "/contact",
  "/services/growth-strategy": "/services/growth-diagnosis",
  "/services/customer-research": "/services/90-day-growth-sprint",
  "/services/acquisition-systems": "/services/acquisition-system-build",
  "/about-us": "/about",
  "/portfolio/greenscreen": "/case-studies",
  "/team/rahul-van-manen": "/about",
  "/test": "/experimentation",
  "/case-study": "/case-studies",
  "/case-studies/diadia": "/case-studies/diadia-health"
};

export function sitemapCanonicalPath(path: string): string {
  const p = normalizePathname(path);
  const to = REDIRECT_TO[p];
  if (to) return sitemapCanonicalPath(to);
  return p;
}

export function isFinalSitemapPath(path: string): boolean {
  return sitemapCanonicalPath(path) === normalizePathname(path);
}
