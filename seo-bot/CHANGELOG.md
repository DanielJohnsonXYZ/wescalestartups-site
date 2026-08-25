# SEO/GEO/AEO bot — changelog

Maintained by the daily scheduled task. Newest entry first.

## 2026-08-25 (run 5) — answered the three-way decision, one layer up from run 4

**Shipped** (`f641844`). One file, content-only: `src/content/insights/when-to-hire-fractional-cmo.mdx`.

**The find.** Run 4 established that this site ranks for provider-selection prompts. Run 5 found the same shape one layer up the funnel — **hiring-decision prompts** — and the page that already wins them was answering a different question.

`/insights/when-to-hire-fractional-cmo`, GSC 90d (2026-05-25 → 2026-08-22), all zero clicks:

| pos | imp | query |
|---|---|---|
| 8.3 | 29 | `should a series a startup hire a fractional cmo a growth agency or wait to hire a full-time vp of growth` |
| 8.0 | 9 | same query, question-mark variant |
| 14.5 | 10 | `when to hire a fractional cmo for a startup` |
| 10.5 | 4 | `when should a startup hire a fractional cmo?` |
| 25.6 | 18 | `when to hire a fractional cmo` |

Outside `/services/90-day-growth-sprint`, this is the highest-position non-brand commercial family on the site. And the three-way shape recurs right across the fractional-CMO cluster at every position: `is it better to hire a full-time growth team or use a fractional growth agency at our stage` (24 imp @ 46.5), `growth pod vs hiring a fractional cmo vs full-service agency` (12 @ 83.4 + 7 @ 94.3), `growth marketing agencies vs hiring a fractional leader, which makes more sense at series a` (2 @ 8.5), `growth agency vs fractional growth lead seed stage startup` (2 @ 10.0), `business growth agency vs fractional cmo comparison` (1 @ 8.0).

The page answered a **two-way** question — fractional CMO versus more execution capacity. It never named the third option the query names, never compared the three in one place, and had no `updatedAt` at all, so it advertised an April date on a 2026 decision question. Google has already picked this page for the three-way prompt (`/fractional-cmo-vs-agency` ranks **94.0** for the same query), so the change reinforces Google's choice rather than creating a second competing answer — which matters, because run 3 spent a whole run undoing exactly that kind of split.

**Change:** new H2 "Fractional CMO, growth agency, or full-time VP of Growth?" with a bolded direct answer, a six-row comparison table (when to buy / what you get / time to useful / typical UK cost / what's left afterwards / minimum commitment) and stage guidance for pre-PMF, Seed, Series A and Series B. `tldr` rewritten to answer all three options — it renders in `detail-aside`, which is the first content block in the DOM, so the direct answer sits above the article body without touching the shared template. `updatedAt: 2026-08-25`. Four FAQs matching the observed prompts.

Every figure reuses what the site already publishes: retainers from `pricingTiers` via `/pricing`, the £6k–£20k agency band and £120k–£180k full-time band from `/insights/fractional-cmo-cost-uk`. **No new market statistics.** The "point them somewhere better" voice is kept — the growth-pod FAQ says plainly that if what you need is sustained channel production, an agency is the better buy.

**Deliberately did not** add the slug to `insightPillarIds` in `[slug].astro`. It would have rendered a second copy of the TL;DR in the article body for marginal gain, on a shared template that run 4 had edited three hours earlier.

**Verified before the commit existed.** Run 5 cloned, `npm ci`'d and built the repo *in the sandbox* — which the playbook previously said was impossible. 116 pages build clean, `BUILD_EXIT=0`, `astro check` 0 errors 0 warnings, all 596 JSON-LD blocks parse, FAQPage carries 4 questions, `dateModified` 2026-08-25, the table renders, and all six internal link targets exist in `dist`. Post-deploy (live in **under 2 minutes**): page fetched with cache-busting, all of the above confirmed on the live HTML. Bing: 1 URL submitted (quota 97/day, 697/month remaining). Google: URL inspected — indexed, canonical clean, last crawl 24 Aug, `PASS`.

**`check:lastmod` was green with zero routes updated, and that is correct, not a missed step.** `/insights/*` routes are not in `staticPathLastModified`; they fall back to `siteConfig.siteLastModified`. The two-step does not apply to insights content. Written into the playbook so a future run doesn't "fix" it.

**No quick wins found, and that is a finding.** Sitewide `dist` audit: zero images missing `alt`, every internal link target resolves, all 596 JSON-LD blocks parse, and run 4's legacy 404 families all redirect correctly — including `www…/portfolio/equoo/`, which still shows in GSC as a landing page at position 1.4 but chains cleanly www → apex → `/case-studies/equoo`. The hygiene layer is genuinely clean. Stop re-auditing it every run.

**Weighed and rejected, both recorded in the playbook so they aren't rediscovered:**
- **The homepage non-brand category cluster** — ~630 impressions at positions 7–13 with one click (`scale startup` 309 @ 12.6, `marketing startups` 126 @ 13.2, `growth marketing agency` 31 @ 9.1). Largest non-brand pool on page 1–2, and tempting. Rejected because the fix means re-anchoring the homepage on "agency", which contradicts WSS's positioning — the site sells *against* the agency model and has a page saying so — and because the homepage title sits on top of Daniel's design work.
- **`/insights` hub** (1,032 imp, pos 28.9). Real demand in WSS's own post-PMF language, but at position 29 a content fix is authority-bound. Stays at backlog 4.

**Expected movement:** clicks from `/insights/when-to-hire-fractional-cmo` on the position-8 three-way queries, and possibly the `when to hire a fractional cmo` head variant improving from 25.6. As with run 4, if these impressions are AI-answer citations rather than blue links, clicks will stay near zero and the win will be citation quality — which does not appear in GSC. Do not read flat clicks alone as failure; check whether position 8.0–8.3 is held and whether new decision-shaped prompts appear on the page.

**Review date:** 2026-09-08 (allow crawl + ~3 days lag).

**Verdicts due today: none.** Run 1's is due 2026-08-28, and its early read is now a **second negative**: `/fractional-cmo-vs-agency` shows 740 named-query impressions at an impression-weighted position 46.2 with zero clicks, against the 44.1 that motivated the re-anchor. Runs 2, 3 and 4 are all still inside their windows (2026-09-04, 2026-10-03, 2026-09-01). Nothing was marked as working or failing on the basis of data that isn't in yet.

## 2026-08-25 (run 4) — answered the prompts the site already wins

**Shipped** (`99ca705`, `dc91ce1`, `993d823`).

**The find.** `/services/90-day-growth-sprint` is the only page on the site ranking at position 1–5 for commercial intent, and it converted none of it. Of the ten non-brand queries the whole site holds at position ≤5 over 90 days, **eight land on this one page**, all zero-click, and all of them are provider-selection intent:

| pos | imp | query |
|---|---|---|
| 1.0 | 14 | `top providers of 90-day sprint marketing engagements for saas marketing teams?` |
| 1.0 | 12 | `which saas marketing agencies provide the best 90-day sprint marketing engagement?` |
| 1.0 | 6 | `who offers the best 90-day sprint marketing engagement in saas marketing?` |
| 1.0 | 4 | `who offers quick-start growth sprints for startups and mid-market brands?` |
| 2.0 | 4 | `what's the best 90-day sprint marketing engagement for saas marketing teams?` |
| 3.8 | 12 | `get a quote for a 90 day growth sprint for my startup` |
| 4.5 | 24 | `evaluate acme growth studio on 90-day sprint marketing engagements` |
| 5.6 | 12 | `our board set a 12-week deadline for a full brand refresh and site relaunch—who has a repeatable sprint process for high-growth saas?` |

The page described the engagement well but never said in one extractable passage *that WSS provides it, for whom, over what period, at what price*. That is what a human scanning a result and an answer engine assembling a shortlist both need — which is why the change is robust to either reading of these impressions (classic blue link vs AI Mode citation). We do not need to resolve that question to act.

**Change:** the `TldrCallout`, previously hardcoded to `fractional-cmo`, is now a `tldr` field any service can set (Fractional CMO's text byte-identical). The sprint gets one naming provider, audience, duration, price, deliverables and week structure. Three FAQs added for the observed prompts — who offers this (naming agency / in-house / DIY alternatives honestly), how to get a quote, and whether a sprint fits a fixed board deadline (which says plainly that a brand refresh is not this engagement). New `metaDescriptionById` map, one entry, mirroring the existing `metaTitleById`; the collection description is untouched so `/services` and the Service schema keep it.

**Framing note for future runs:** the FAQs are for **passage extraction, not rich results**. FAQPage rich results were deprecated May–Aug 2026. Do not cite this commit as evidence that FAQ schema works.

**Quick wins** (`dc91ce1`): three legacy WordPress URL families were still in Google's index while 404ing at the apex — `/seo-services/` (16 imp, **position 1.6**), `/portfolio-tag/marketing/` (14 imp, pos 11.4), `/testimonial/` (1 imp, pos 8.0). The www host 301s to the apex, so every click on those results landed on the error page. `/portfolio-tag/` and `/testimonial/` are WordPress taxonomy archives that the existing `/portfolio/` and `/team/` prefix rules never matched — different literal prefixes. Added those plus their theme siblings `/portfolio-category/` and `/testimonial-view/` to `functions/_middleware.js` (primary) and mirrored into `public/_redirects` (fallback). `/seo-services` → `/services` rather than a topical near-match, because WSS no longer sells SEO standalone.

**Verified:** 116 pages build clean on the tree that was pushed, `astro check` 0 errors 0 warnings, all 595 JSON-LD blocks parse, FAQPage now carries 9 questions, the other three service pages render no TL;DR and Fractional CMO's is unchanged. Post-deploy: live page fetched and confirmed rendering TL;DR, all 9 FAQs and the new description; all seven redirects confirmed 301 to the right targets with no existing rule shadowed (`/portfolio/equoo/` still resolves to its specific case study, `/services` and `/testimonials` still 200). `check:lastmod` green after the two-step regeneration. Bing: 3 URLs submitted (quota 100/day, monthly 700). Google: URL inspected — indexed, canonical clean, last crawl 14 Aug; recrawl comes via the sitemap, whose lastmod for all four service routes now reads 2026-08-25.

**A pleasing coherence win:** the existing `meta-ai:summary` tag is derived from the page description, so it picked up the new provider-shaped summary automatically. The GEO layer and the SEO layer now say the same thing on this page without duplication.

**Expected movement:** first clicks from `/services/90-day-growth-sprint`, and/or a firmer hold on the position-1 prompt cluster. If the impressions are AI Mode citations, expect impressions to hold and clicks to stay near zero — in that case the win is citation quality, not CTR, and the honest read is that this page's value does not show up in GSC at all. Do not treat flat clicks alone as failure; check whether the position-1 cluster is still held and whether new provider prompts appear.

**Review date:** 2026-09-01 (check the eight-query cluster's positions and any clicks; allow crawl + ~3 days lag). Redirect verdict earlier — by 2026-09-08 the three legacy URLs should stop appearing as landing pages in GSC.

## 2026-08-22 (run 3) — consolidation shipped

**Shipped** (`730416c`, `e66b9b9`): the §2 consolidation Daniel approved. Five pages merged into two, 121 → 116 pages, sitemap 111 → 106 URLs.

- Into `/fractional-cmo-vs-agency`: `/fractional-cmo-vs-full-time-cmo` (208w, 2 imp), `/before-you-hire-another-agency` (171w, 7 imp), `/before-you-hire-a-head-of-marketing` (171w, 0 imp). Page went 600 → 1,186 words with two new H2 sections.
- Into `/how-it-works`: `/build` (172w, 3 imp) and `/transfer` (175w, 0 imp). 738 → 894 words. That page's H1 was already "Diagnose. Build. Test. Transfer."; it now carries the detail too.
- Internal linking now points **down** rather than sideways. The cluster treated all seven pages as peers, which told Google nothing about which to rank.

**Deviated from the written proposal in two places, both deliberate:**
- **Kept `/first-30-days`.** The proposal listed it on zero impressions, but it's 413 words and linked from the service pages — zero impressions on a mid-funnel page means nobody searches for it by name, which is not cannibalisation. Merging it would have been consolidation for its own sake.
- **Did not touch title, description or H1 on `/fractional-cmo-vs-agency`.** Run 1 re-anchored them on 21 Aug and that experiment has not been measured. Changing them now would destroy the read.

**Verified:** 116 pages build clean, zero dangling internal links in `dist`, all five 301s confirmed live, both new sections rendering, `check:lastmod` green after regenerating (5 dead routes dropped automatically).

**Also checked and closed:** `cal.wescalestartups.com/auth/login`. It is **already** correctly noindexed — a Traefik `noindex-headers` middleware has served `X-Robots-Tag: noindex, nofollow` since 12 July, confirmed 10/10 requests including as Googlebot. Nothing to fix. Two residual notes: cal.com's own HTML emits a contradicting `<meta name="robots" content="index, follow">`, and there is a **duplicate Traefik router** (`calcom`) matching the same host on the same entrypoint *without* the middleware — currently losing the tie-break, but a latent risk if that ever flips. Do **not** add a robots.txt `Disallow` for `/auth`: that would stop Google seeing the noindex and lock the URL into the index.

**Expected movement:** the five merged URLs should leave the GSC page report within ~6 weeks and `/fractional-cmo-vs-agency` impressions should rise to roughly the cluster total. **Position movement is not expected from this alone** — the constraint is authority (§3), and merging pages does not create any. If positions have not moved by ~3 months, that is evidence *for* the authority thesis, not evidence the merge failed.

**Review date:** 2026-10-03 (allow the full 3-month window; check at 2026-09-19 only that the 301s resolved cleanly).

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
