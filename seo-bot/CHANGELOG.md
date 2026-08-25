# SEO/GEO/AEO bot — changelog

Maintained by the daily scheduled task. Newest entry first.

## 2026-08-25 (audit) — found the thing seven runs had been optimising on top of

**Shipped** (`f814831`, `4d92d79`, and this file + PLAYBOOK.md). Requested by Daniel as a full SEO/GEO/AEO audit, delivered in chat; this is the durable record.

### The finding

**Organic impressions fell 60% overnight on 6 May 2026 and no run had ever looked.** Two matched 61-day windows:

| Window | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| 1 Mar – 30 Apr | 103 | 27,313 | 0.38% | 14.1 |
| 24 Jun – 23 Aug | 111 | 11,004 | 1.01% | 27.7 |

Daily: **5 May 459 → 6 May 227**, a 50.5% drop in one day with no taper, plus a second step down on 22–23 May. That is the WordPress→Astro rebuild.

Three things make this actionable rather than merely sad:

1. **The loss is extremely concentrated.** Five URLs carry 80% of it; twenty carry 97%. Fourteen pages with 200+ impressions went to ~zero — 24,290 impressions between them.
2. **Most of those were redirected at the time. Nine were not, and still 404ed on 2026-08-25** — 12,469 impressions, including `/the-ultimate-guide-to-venture-capital-marketing-…-in-2025/` at **7,520 impressions, position 7.4**. A page-one result serving an error page for three and a half months.
3. **The position "decline" is composition, not decay.** Queries present in both windows *improved* (median −2.25 places). Legacy pages ranking at positions 4–20 left the index; new pages ranking at 24–64 replaced them. Brand queries actually *grew* (+206 impressions); 100% of the named-query loss was commercial and long-tail informational (−3,503).

**Every run from 1 to 7 analysed a single 90-day snapshot in isolation, which structurally cannot see this**, and confidently attributed flat performance to "the constraint is authority". Authority is a real constraint. It is also partly self-inflicted, and nobody checked.

### Shipped

- `f814831` — 301s for all nine 404ing legacy URLs, in `functions/_middleware.js` (primary) and mirrored into `public/_redirects` (fallback), with trailing-slash variants, placed before the catch-all namespaces. Targets are topical: both VC guides → `/industries/vc-support` (H1 "Venture capital & portfolio marketing", the only VC content on the site); fractional-CMO post and the bare `/fractional-cmo` slug → `/services/fractional-cmo`; two GTM posts → `/insights/b2b-saas-gtm-strategy`; `/strategy-direction` → `/how-it-works`; `/copywriting` → `/services`; `/home-agency-2` → `/`. Noted in passing: the map already contained a *guessed* slug for the VC guide (`/the-ultimate-guide-to-venture-capital-marketing-for-startups`) that never matched the real one.
- `4d92d79` — **CI was red on `main` before this audit.** `check:lastmod` was failing on eight drifted routes (`/`, `/about`, `/ai-growth-audit`, both `/facts/*`, `/industries/seed-to-series-b`, `/podcast`, `/testimonials`). Run 7 edited the backing files without the second half of the two-step. Mechanical regeneration.

**Honest expectation on the redirects:** they recover little ranking directly — three and a half months of 404 means Google has dropped these URLs. What they do is stop residual backlinks and direct traffic dying on an error page, and give Google a signal instead of a dead end on recrawl. The real value of the finding is the content question now at backlog #1.

### Two false facts found in PLAYBOOK.md

1. **The robots.txt reversal never happened.** The playbook said `ai-train=no`, that run 2 had set it to `yes`, that *Daniel reverted it with an explicit comment*, and that future runs must not re-flip it. The live file says `ai-train=yes`; `git log src/pages/robots.txt.ts` shows its last commit is run 2's `423d8ea`. **Run 4 invented the reversal; runs 5, 6 and 7 repeated it.** A standing instruction had been built on a user decision that did not exist.
2. **The playbook contradicted itself on inbound links, three bullets apart.** Run 6 correctly established 29 referring domains and wrote "never repeat the zero-links claim" — then left the old "Bing still reports zero tracked inbound links (re-checked 2026-08-25)" line in place below it.

Both corrected. New standing decision added: verify claims about the site against the site, and when correcting something, **delete the wrong line** rather than adding a corrected one next to it.

### Also found, not shipped

- **Homepage dead clicks are real and mislocated.** ~500 in 30 days. Clarity element data: the hero eyebrow "Sustainable growth for AI startups…" (188), the H1 (159) and the lede (52). All three carry emphasised inline spans — a pulsing `v9-live-dot`, an `<em>`, a `<strong>` — that read as links. My first hypothesis from markup alone was "the cards", and the element data disproved it. Not shipped: the fix is a visual design judgement on Daniel's hero, and the standing rule is not to ship CSS the bot cannot see.
- **The industry pages are inverted.** The five indexed and sitemapped ones (edtech, fintech, healthtech, saas-growth, vc-support) returned **zero GSC rows in 90 days**. The two that do earn impressions — `/industries/b2b-growth` (35) and `/industries/ecommerce` (20) — are `noindex` *and* 301'd away, yet still built into `dist` as files that can never be served.
- **`llms.txt` and `llms-full.txt` are near-duplicates** (21,296 b vs 22,107 b, 96% shared lines). The convention is a concise index plus an expansion; this is one document served twice.
- **Insight recency is stale**: 1 of 29 insights carries an August `dateModified`; the rest sit at April–June. `/facts/*` render no visible "Last updated" at all, contradicting the playbook's claim that they do.
- **HTML is never edge-cached** (`cache-control: no-cache`, `cdn-cache-control: no-store`, `cf-cache-status: DYNAMIC`) on a fully static build. TTFB is still 150–265 ms; assets are correctly immutable.
- Four `/resources/*` titles run 66–88 chars; seven descriptions fall outside 70–165; two team PNGs are 308 KB and 160 KB while the rest of the site uses webp; Clarity shows 43 sessions from a junk referrer `dhfgbzfevb`.

### Clean

116 pages: zero duplicate titles or descriptions, zero missing/duplicated H1s, zero canonical mismatches, zero dangling internal links, zero images missing alt, all 596 JSON-LD blocks parse. Sitemap arithmetic exact (106 = 116 built − 10 noindexed), no errors or warnings, all sampled pages GSC verdict PASS. Every legacy WordPress URL family that *was* redirected resolves correctly.

Run 4's sprint cluster is holding position 1.0–2.0 on five provider prompts. Run 5's page sits at 7.8/8.2 (was 8.0/8.3) — noise this early; verdict still 2026-09-08.

**Review date:** 2026-09-08 for the redirects — check that the nine URLs stop appearing as 404 landing pages and whether `/industries/vc-support` picks up any VC-marketing impressions.

## 2026-08-25 (run 6, interactive) — pinned the entity

**Shipped** (`3c4dbc4`). Three files, content + schema only.

**Connector fix first, and it unlocked 16 months of data.** The Bing MCP's date-bearing endpoints had been recorded as permanently broken since run 2. Root cause found and fixed: `parse_timestamp_from_api` in the vendored `bing_webmaster_tools` library returned a **naive** datetime, which serialises without a UTC offset. FastMCP validates tool output against a schema declaring those fields `format: date-time`, and RFC 3339 requires an offset — so every response carrying a date failed validation. One line (`tz=timezone.utc`). `get_query_stats`, `get_page_stats`, `get_rank_and_traffic_stats` and `get_url_info` all work now. Backup at `utils.py.bak`. **Caveat: this patches the vendored copy inside the installed extension, so a reinstall wipes it.** The durable fix is upstream at merj/bing-webmaster-tools (stale since April 2025).

**Correction to the playbook's central fact.** Runs 2–5 recorded "Bing reports zero inbound links" and built the authority thesis partly on it. That was a broken endpoint, not a finding — the Bing UI shows **29 referring domains / 41 referring pages / 16 anchor texts**, and `get_url_info` reports `AnchorCount: 50` on the homepage alone. The authority thesis survives (29 domains is low for the head terms in play) but the number was never zero. `get_link_counts`/`get_url_links` still return empty via API — that endpoint appears not to be backed by the same store as the current Backlinks report, and no wrapper fix reaches it.

**Finding 1 — this entity is being confused with at least three others.** Bing query stats, 2025-05-09 → 2026-08-21: the site's **second-largest query is `wescale login`** (106 impressions, avg position 6.69) and it is not a WSS query. It belongs to a European B2B e-procurement platform at wescale.com. Evidence is unambiguous: `punchout catalog`, `wescale supplier login`, `wescale portal de compras`, `https://continental.wescale.com/` (Continental AG), `https://autos.wescale.com/app/#/dashboard`, and two pasted internal IT helpdesk tickets (`could you please check if the below users are added into wescale users security groups ??`). Fifteen login-intent variants total **139 impressions — about a quarter of what previously read as brand traffic**. A second WeScale operates in print/design (`wescale design gpt login`), a third as WeScaleUp Studio. Separately, Bing surfaces **seven distinct Daniel Johnson LinkedIn profile URLs** for this site's queries, several at position 2.

**Finding 2 — agents are running vendor research and this site ranks position 1 for it.** Not conversational queries; machine-issued ones:

| pos | imp | query |
|---|---|---|
| 1.0 | 1 | `site:.com "fractional cmo" "b2b saas" "uk" "book" "contact" -mallorymullan` |
| 1.0 | 1 | `"we scale startups" "fractional cmo" "£1–10m arr" contact` |
| 1.0 | 4 | `review this and i think the acquisition channel matrix will be hepful` |
| 2.0 | 3 | `build a channel priority matrix for careermap acquisition vs conversion` |
| 4.0 | 2 | `draft the 90-day sprint checklist with costs and owners` |
| 5.0 | 1 | `you are a marketing associate at a venture capital firm in london. you have been asked to create a marl]]]` |

Operator-stacked, competitor-excluding, ARR-band-specific, and in one case a truncated system prompt with `]]]` delimiter garbage. **23% of Bing impressions are conversational or machine-issued.** This extends runs 4 and 5: the audience for extractable facts is not only humans scanning snippets, it is agents assembling shortlists — and what they ask for is *fit criteria and contact details*.

**Change:**
- `disambiguatingDescription` on both the Organization and Person schema nodes — the property schema.org defines for precisely this problem. States identifying attributes (London, post-PMF B2B SaaS/AI, £1M–£10M ARR, the domain, the founder) rather than relying on a generic-English name. `alternateName: "WSS"` added. No third party named.
- Four rows added to `/facts/we-scale-startups` quick facts: company type, clients served, typical client size (£1M–£10M ARR), engagement range. Directly answers the observed `"£1–10m arr" contact` shape. Every figure already appears on `/about`, `/start-here` and `/pricing`; nothing new claimed.
- TL;DRs for Growth Diagnosis and Acquisition System Build, the two service pages runs 4 and 5 left without one. All four now carry one. The ASB summary says "customer-acquisition system" explicitly, which also addresses `scalable land acquisition teams` (60 impressions of real-estate intent on that page).

**Verified:** 116 pages build clean, EXIT=0, astro check 0/0, 596 JSON-LD blocks parse. Post-deploy live fetch with cache-busting confirmed all four TL;DRs, both schema properties, and the new facts rows. Bing: 2 URLs submitted.

**Bing is not a channel and should not be optimised for.** 3,310 impressions / 30 clicks over 16 months, flat. Genuine non-brand commercial clicks in that entire period: **two**. Keep it as a diagnostic mirror — which is exactly what it was useful for today — not a target.

**Expected movement:** entity binding is slow and does not show up as clicks. The read is whether the wrong-entity share of impressions falls, and whether AI answers describing WSS become more accurate. Not measurable in GSC.

**Review date:** 2026-10-06 (entity signals take weeks; check the `wescale login` share of Bing impressions and whether the £1M–£10M ARR band starts appearing in AI answer citations).

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
