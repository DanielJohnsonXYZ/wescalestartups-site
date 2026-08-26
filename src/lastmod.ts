/**
 * Per-URL sitemap lastmod (ISO date), aligned to the last git change on the
 * page file and, for dynamic routes, its content-collection entry.
 *
 * GENERATED — do not hand-edit. Regenerate with:
 *   node scripts/refresh-lastmod.mjs
 *   node scripts/refresh-lastmod.mjs --check   # non-zero exit if stale
 *
 * Unlisted paths fall back to siteConfig.siteLastModified.
 *
 * This was hand-maintained until 2026-08-21, by which point all 55 resolvable
 * entries had gone stale and 48% of sitemap URLs misreported by 3+ months.
 * Wrong lastmod values suppress recrawl, so keep this generated.
 */
export const staticPathLastModified: Partial<Record<string, string>> = {
  "/": "2026-08-25",
  "/about": "2026-08-25",
  "/ai-growth-systems": "2026-08-21",
  "/ai-sameness-scorecard": "2026-08-18",
  "/book": "2026-08-20",
  "/book/thanks": "2026-08-19",
  "/wss-calendar": "2026-08-20",
  "/case-studies": "2026-08-20",
  "/contact": "2026-08-20",
  "/diagnose": "2026-08-20",
  "/experimentation": "2026-08-20",
  "/growth-course": "2026-08-19",
  "/wss-scale-score": "2026-08-19",
  "/first-30-days": "2026-08-20",
  "/fractional-cmo-vs-agency": "2026-08-22",
  "/gtm-strategy": "2026-08-20",
  "/how-it-works": "2026-08-22",
  "/industries": "2026-08-20",
  "/founder-led-growth": "2026-08-20",
  "/healthtech-buyer-confidence-matrix": "2026-08-18",
  "/hiring-readiness-scorecard": "2026-08-22",
  "/post-raise": "2026-08-22",
  "/ai-growth-audit": "2026-08-25",
  "/portfolio-growth-readiness": "2026-08-18",
  "/growth-operating-system": "2026-08-22",
  "/insights": "2026-08-20",
  "/llms.txt": "2026-05-03",
  "/llms-full.txt": "2026-05-03",
  "/markdown/home.md": "2026-08-09",
  "/press": "2026-08-19",
  "/pricing": "2026-08-21",
  "/podcast": "2026-08-25",
  "/insights/glossary": "2026-08-20",
  "/seo-content-strategy": "2026-08-19",
  "/privacy": "2026-08-19",
  "/proof": "2026-08-20",
  "/reports": "2026-07-10",
  "/resources": "2026-08-18",
  "/services": "2026-08-20",
  "/start-here": "2026-08-20",
  "/terms": "2026-08-19",
  "/testimonials": "2026-08-25",
  "/when-growth-plateaus": "2026-07-10",
  "/services/90-day-growth-sprint": "2026-08-25",
  "/services/acquisition-system-build": "2026-08-25",
  "/services/fractional-cmo": "2026-08-25",
  "/insights/what-is-a-fractional-cmo": "2026-08-26",
  "/insights/b2b-saas-gtm-strategy": "2026-08-20",
  "/insights/ai-native-gtm": "2026-08-20",
  "/insights/startup-growth-bottlenecks": "2026-08-20",
  "/services/growth-diagnosis": "2026-08-25",
  "/industries/ai-genai": "2026-08-21",
  "/industries/b2b-growth": "2026-08-21",
  "/industries/b2b-saas": "2026-08-21",
  "/industries/ecommerce": "2026-08-21",
  "/industries/edtech": "2026-08-21",
  "/industries/fintech": "2026-08-21",
  "/industries/healthtech": "2026-08-21",
  "/industries/saas-growth": "2026-08-21",
  "/industries/seed-to-series-b": "2026-08-25",
  "/industries/vc-support": "2026-08-21",
  "/about/daniel": "2026-08-20",
  "/facts/daniel-johnson": "2026-08-25",
  "/facts/we-scale-startups": "2026-08-25",
  "/team": "2026-08-19",
  "/speaking": "2026-08-19",
  "/workshops": "2026-08-19",
  "/growth-dashboard-template": "2026-08-19",
  "/board-growth-report-template": "2026-08-19",
  "/resources/growth-dependency": "2026-08-20",
  "/resources/customer-segment": "2026-08-20",
  "/resources/positioning": "2026-08-20",
  "/resources/gtm-leak": "2026-08-20",
  "/resources/weekly-focus": "2026-08-20",
  "/resources/90-day-growth-sprint-planner": "2026-08-20",
  "/resources/vc-portfolio-growth-diagnosis": "2026-08-20",
  "/resources/acquisition-channel-matrix": "2026-08-20",
  "/resources/fractional-cmo-hiring-checklist": "2026-08-20",
  "/resources/ai-native-gtm-stack-map": "2026-08-20",
  "/resources/agency-brief-template": "2026-08-20",
  "/resources/first-marketing-hire-scorecard": "2026-08-20",
  "/resources/ai-search-visibility-checklist": "2026-08-20"
};

/**
 * Canonical numeric price ranges (GBP) for structured data only.
 * Display strings live with the copy: `pricingTiers` in site.ts and the
 * `price` fields in src/pages/services/[slug].astro. These numbers MUST
 * match them. `perMonth` marks a recurring engagement (Fractional CMO).
 */
export const servicePriceRanges: Record<string, { lowPrice: number; highPrice: number; perMonth?: true }> = {
  "growth-diagnosis": { lowPrice: 2000, highPrice: 4000 },
  "90-day-growth-sprint": { lowPrice: 8000, highPrice: 12000 },
  "acquisition-system-build": { lowPrice: 15000, highPrice: 25000 },
  "fractional-cmo": { lowPrice: 5000, highPrice: 8000, perMonth: true }
};
