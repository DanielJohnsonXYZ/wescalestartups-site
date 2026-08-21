# SEO/GEO/AEO bot — changelog

Maintained by the daily scheduled task. Newest entry first.

## 2026-08-21 (run 1)

**Shipped:** Re-anchored `/fractional-cmo-vs-agency` to its query family.
Commit `97531e3` (`seo-bot: re-anchor /fractional-cmo-vs-agency to its query family`), one file: `src/pages/fractional-cmo-vs-agency.astro`.

**Evidence:** GSC 28d (2026-07-24 → 2026-08-20): site total 70 clicks / 5,330 impressions / avg pos 27. This page held the largest non-brand impression pool — 637 impressions, 0 clicks, avg pos 44.1 — and every surfacing query contains "fractional cmo vs agency" or a close variant ("fractional cmo vs agency" 38 imps @ 23.7, "fractional cmo vs branding agency" 24 @ 57.7, "embedded growth team vs agency" 19 @ 41.2, "do i need a growth team or a growth agency" 10 @ 49.3). Yet the title/description/H1/lede said "Marketing Agency vs Growth Partner" and never used "fractional CMO".

**Change detail:** title → "Fractional CMO vs Marketing Agency: Which to Hire?"; description/keywords/H1/TL;DR/lede now name the term; card kicker "Choose a fractional CMO (WSS) when"; 3 new FAQs matching the query variants (cost vs agency — figures match pricingTiers; vs branding agency; embedded growth team), fed into the existing FAQPage schema; related reading gains `/fractional-cmo-vs-full-time-cmo`. No layout/structure edits (Daniel merged design-audit PR #83 the evening before; deliberately stayed one-file, content-only).

**Verified:** Cloudflare Pages deployed; live page renders new title/meta/H1/6 FAQs; canonical clean. Bing: URL submitted (quota 100/day, used 1). Google: URL inspected — indexed, canonical fine, last crawl Aug 10; connector has no request-indexing action, recrawl comes via sitemap.

**Expected movement:** position improvement on the "fractional cmo vs agency" query family (from ~24–58 toward page 1–2) and first clicks from this page; impressions may broaden on the cost/branding variants.

**Review date:** 2026-08-28 — check this page's query positions and CTR in GSC (allow crawl + ~3 days data lag).
