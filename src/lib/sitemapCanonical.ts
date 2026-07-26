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
  "/how-we-work": "/how-it-works",
  "/portfolio/greenscreen": "/case-studies",
  "/team/rahul-van-manen": "/about",
  "/test": "/experimentation",
  "/case-study": "/case-studies",
  "/quiz": "/resources/growth-bottleneck-scorecard",
  "/case-studies/diadia": "/case-studies/healthtech-precision-medicine",
  "/case-studies/diadia-health": "/case-studies/healthtech-precision-medicine",
  // IA consolidation — overlapping conceptual pages → canonical Growth OS
  "/growth-engine": "/growth-operating-system",
  "/ai-driven-growth": "/growth-operating-system",
  "/execution-model": "/how-it-works",
  "/engagement-models": "/how-it-works",
  "/podcast-guest-strategy": "/podcast",
  "/industries/ai-genai": "/ai-growth-systems",
  "/industries/b2b-growth": "/industries/saas-growth",
  "/industries/b2b-saas": "/industries/saas-growth",
  "/industries/ecommerce": "/industries",
  "/industries/seed-to-series-b": "/start-here",
  "/case-studies/marketplace-performance-audit": "/case-studies"
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
