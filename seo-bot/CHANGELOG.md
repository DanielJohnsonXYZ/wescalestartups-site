# SEO/GEO/AEO bot — changelog

Maintained by the daily scheduled task. Newest entry first.

## 2026-08-21 (run 2) — full SEO/GEO/AEO audit + fixes

**Scope:** full audit across GSC (90d), Bing Webmaster, Microsoft Clarity, live site, repo build, and independent research into mid-2026 practice. Delivered `wss-seo-geo-audit-2026-08-21.md` and `wss-consolidation-proposal.md` to Daniel. Six commits shipped.

**Shipped** (`d4f40e7`, `31baca6`, `c429d2b`, `f07965f`, `4373428`, `423d8ea`):

- **Four bugs visible in shipped output.** `llms.txt` served raw source identifiers (`{siteConfig.podcastName}` — JSX braces in a JS template literal). `/industries/saas-growth` titled "SaaS Growth Growth Systems". `/ai-growth-systems` carried the brand twice in `<title>` with the pipe leaking into the `<h1>` and breadcrumb. `robots.txt` `Content-Signal` sat after a blank line, so it belonged to no user-agent group.
- **Sitemap lastmod, generated.** All 55 resolvable entries in the hand-maintained map were stale; 48% of sitemap URLs claimed a lastmod 3+ months older than the content, and PR #83's design rewrite on 20 Aug moved none of them. `/pricing` said 2026-05-03, last edited 2026-08-20. New `scripts/refresh-lastmod.mjs` resolves each route to its backing files and takes the latest commit date; dropped 15 dead routes. Wired into CI as `npm run check:lastmod` (needs `fetch-depth: 0`).
- **Prices reached structured data.** Four published ranges existed in copy and nowhere in schema. Added `AggregateOffer` on Service pages (with `UnitPriceSpecification` on the recurring Fractional CMO engagement), `OfferCatalog` on `/pricing`, `priceRange` + `currenciesAccepted` on the Organization node, and `image` on both Article builders derived from the route.
- **robots.txt made coherent.** It said `ai-train=no` while explicitly Allowing GPTBot and ClaudeBot, which are training crawlers. Resolved to `ai-train=yes` — for a firm selling growth advice, presence in model weights is the goal. Reversing needs Disallow rules too; the file comment says so.

**Verified:** all six items fetched live post-deploy. `astro check` 0 errors, 121 pages, `check:lastmod` green, negative-tested by corrupting a date and confirming exit 1.

**Incident:** `main` did not build for ~20 minutes. Commits `9d40663` and `7300343` were pushed file-by-file, leaving `schema.ts` importing `servicePriceRanges` from `../site` while it had landed in `../lastmod`. The deploy from `9d40663` would have failed outright. Fixed in `d4f40e7`. Cause was pushing a partial file set; see the standing decisions in PLAYBOOK.md.

**Corrections to run 1:** branded-query CTR was ranked #1 in the backlog and has been demoted — on 90d data it's 902 impressions / 36 clicks and the brand is a generic English phrase, so much of that volume was never looking for WSS. The FAQ schema rationale for `97531e3` was out of date; FAQPage rich results were deprecated May–Aug 2026.

**Not shipped, deliberately:** `Review`/`AggregateRating` — checked Google's policy, self-serving review markup on Organization/LocalBusiness is ineligible for stars and all WSS ratings live on third-party sites. Consolidation (§2) is proposed, not executed, because merging pages is Daniel's call.

**Expected movement:** none from this run on its own. These fixes remove suppression (stale lastmod blocking recrawl) and add rich-result eligibility; they don't add authority. Position movement depends on consolidation and off-site work.

**Review date:** 2026-09-04 — check recrawl activity in GSC (did the corrected lastmod trigger it?) and whether `/pricing` picks up any Offer rich result.

## 2026-08-21 (run 1)

**Shipped:** Re-anchored `/fractional-cmo-vs-agency` to its query family.
Commit `97531e3` (`seo-bot: re-anchor /fractional-cmo-vs-agency to its query family`), one file: `src/pages/fractional-cmo-vs-agency.astro`.

**Evidence:** GSC 28d (2026-07-24 → 2026-08-20): site total 70 clicks / 5,330 impressions / avg pos 27. This page held the largest non-brand impression pool — 637 impressions, 0 clicks, avg pos 44.1 — and every surfacing query contains "fractional cmo vs agency" or a close variant ("fractional cmo vs agency" 38 imps @ 23.7, "fractional cmo vs branding agency" 24 @ 57.7, "embedded growth team vs agency" 19 @ 41.2, "do i need a growth team or a growth agency" 10 @ 49.3). Yet the title/description/H1/lede said "Marketing Agency vs Growth Partner" and never used "fractional CMO".

**Change detail:** title → "Fractional CMO vs Marketing Agency: Which to Hire?"; description/keywords/H1/TL;DR/lede now name the term; card kicker "Choose a fractional CMO (WSS) when"; 3 new FAQs matching the query variants (cost vs agency — figures match pricingTiers; vs branding agency; embedded growth team), fed into the existing FAQPage schema; related reading gains `/fractional-cmo-vs-full-time-cmo`. No layout/structure edits (Daniel merged design-audit PR #83 the evening before; deliberately stayed one-file, content-only).

**Verified:** Cloudflare Pages deployed; live page renders new title/meta/H1/6 FAQs; canonical clean. Bing: URL submitted (quota 100/day, used 1). Google: URL inspected — indexed, canonical fine, last crawl Aug 10; connector has no request-indexing action, recrawl comes via sitemap.

**Expected movement:** position improvement on the "fractional cmo vs agency" query family (from ~24–58 toward page 1–2) and first clicks from this page; impressions may broaden on the cost/branding variants.

**Review date:** 2026-08-28 — check this page's query positions and CTR in GSC (allow crawl + ~3 days data lag).
