# Query → intent → page map

Seeded run 15, 2026-08-27. Refreshed run 16, 2026-08-27. Window: **2026-07-29 to 2026-08-25** (28 days), 346 named queries, 2,666 named-query impressions, 22 named-query clicks — all 22 from three branded queries.

**Read the reconciliation before using the table below.** The site total for the same window is **68 clicks / 5,248 impressions**. Named queries account for 22 clicks. **The other 46 — 68% — come from queries Google anonymised**, and ten non-homepage URLs took 21 clicks between them without appearing anywhere in the named-query data (`/about/daniel` 8, `/resources` 4, `/facts/we-scale-startups` 2, then `/book`, `/growth-operating-system`, `/industries/saas-growth`, `/insights/what-is-a-growth-operating-system`, `/pricing`, `/services/90-day-growth-sprint`, `/team` at 1 each). Prior window the same figures were 21 anonymised and 12 non-homepage. **This map covers the 32% of clicks Google will name. Never mistake it for the site.**

**Status key:** `MATCHED` page can satisfy the intent · `MISMATCH` wrong page type for the intent · `ABSENT` no page behind it · `AUTHORITY` right page, wrong neighbourhood (45+) · `NOISE` not our buyer.

**The column that matters is "can it satisfy?"** A commercial URL chosen for a `what is` / `how to` / `why` query is a defect, not a ranking. Sweep for it every run.

---

## Cluster: 90-day growth sprint — 116 impr

| Query | Impr | Pos | Page Google chose | Intent | Can it satisfy? | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 90 day growth sprint | 32 | 12.6 | /services/90-day-growth-sprint | mixed | partly | ADDRESSED r15 |
| how to run a 90 day growth sprint | 31 | 11.3 | /services/90-day-growth-sprint | informational | **no** | ADDRESSED r15 |
| why 90 day growth sprint | 25 | 11.7 | /services/90-day-growth-sprint | informational | **no** | ADDRESSED r15 |
| what is a 90 day growth sprint | 22 | 15.0 | /services/90-day-growth-sprint | informational | **no** | ADDRESSED r15 |

Run 15 shipped `/insights/how-to-run-a-90-day-growth-sprint`. **Verdict 2026-09-17.** Watch whether the informational queries move to the new URL. A position drop on the service page for these four is the system working — do not confuse it with run 4's provider-intent verdict on 2026-09-01, which is a different intent on the same page.

Provider-intent queries on the same page (run 4, verdict 2026-09-01) are separate and holding at position 1.0–2.0.

## Cluster: fractional CMO vs agency — 196 impr at pos ≤30, 300+ overall

| Query | Impr | Pos | Status |
| --- | --- | --- | --- |
| fractional cmo vs marketing agency | 58 | 22.9 | AUTHORITY |
| fractional cmo vs agency | 39 | 28.3 | AUTHORITY |
| growth agency vs fractional cmo | 28 | 24.2 | AUTHORITY |
| embedded growth team vs agency | 27 | 36.5 | AUTHORITY |
| fractional cmo vs growth agency | 25 | 28.2 | AUTHORITY |
| marketing agency vs fractional cmo | 19 | 26.0 | AUTHORITY |
| fractional cmo vs branding agency | 23 | 56.4 | AUTHORITY |
| growth pod vs agency | 32 | 42.0 | AUTHORITY |

All land on `/fractional-cmo-vs-agency`, which is a good page — comprehensive, answer-first, FAQ-structured. Run 1 rewrote it. **Second negative verdict**: 740 named-query impressions at weighted position 46.2, zero clicks, against the 44.1 that motivated the change. Content is necessary but not sufficient here. **Do not rewrite again.** This cluster is the case for Workstream C, not for more copy.

## Cluster: growth operating system — 102 impr

`growth operating system` 89 @ 22.3. Run 14 (2026-08-27) added a definition and five FAQs to `/growth-operating-system`, which previously never defined the term. `/insights/what-is-a-growth-operating-system` sits at 10.6 on the same topic and is now linked from it. No review date was set — set one.

## Cluster: post-PMF — 75 impr

`post pmf saas scaling` 32 @ 14.2, `growth leader for post pmf startup` 31 @ 9.2. Strong ICP match, page 1–2, zero clicks. Run 13 rewrote the `/insights` hub for provider intent. **Verdict 2026-09-23.**

## Cluster: fractional CMO head terms — AUTHORITY

`fractional cmo for b2b saas` 45 @ 45.9, `saas fractional cmo` 43 @ 46.0, `startup fractional cmo` 20 @ 52.1. `/services/fractional-cmo` carries 453 impressions at position 46.7. Authority-bound. Prohibition 11 applies.

## Cluster: generic startup / scaling head terms — 287 impr

`scale startup` 108 @ 10.0, `marketing startups` 23 @ 5.7, `startup development agency` 21 @ 9.6. Largest page-1 pool, lowest intent. Deferred deliberately since run 5 — the fix means re-anchoring the homepage on "agency", which contradicts the positioning. Prohibition 14.

## Cluster: brand and near-brand — 88 impr across 31 variants

`wescale` itself at 35.5. Many are other companies: `we scale creators`, `we scale trades`, `we scale ab`, `wescale uploader`, `wescale ai`, `wescale login`. Discount from every CTR calculation. `we scale` at 164 impr / pos 6.9 / 1.8% CTR is the one worth understanding — that CTR is far below expectation for position 7.

## Standing sweep: commercial page chosen for an informational query

Run 15 found this pattern and run 16 swept the whole `page,query` set for it. **The pattern is real and run 15 took the only instance worth having.** Full residue, current window:

| Query | Page | Impr | Pos | Verdict |
| --- | --- | --- | --- | --- |
| whats the best fractional cmo or fractional growth leader service for a venture-backed startup | /services/fractional-cmo | 19 | 44.6 | AUTHORITY — prohibition 12 |
| how does a post-pmf plg saas company scale acquisition without breaking unit economics | /insights (bare index) | 16 | 36.1 | **MISMATCH — real, queued to 2026-09-23** (run 13 verdict window) |
| how to scale b2b saas acquisition | /services/acquisition-system-build | 10 | 35.5 | MISMATCH — clean but too small to justify a page |
| growth pod vs hiring a fractional cmo vs full-service agency which model is best for a series a startup | /services/fractional-cmo | 7 | 94.3 | AUTHORITY |
| what are the best fractional cmo services for a fast-growing b2b startup? | /services/fractional-cmo | 1 | 12.0 | too small |

37 impressions in total against run 15's 110. `/pricing`, `/contact`, `/book`, `/services`, `/services/growth-diagnosis` returned **no** informational-shape rows at all — their traffic is brand-navigational or generic commercial.

**Keep the sweep — it costs one pull. Do not expect it to generate a shippable change every run.** Demoted in the playbook backlog accordingly.

## Open leads — unworked

| Query | Impr | Pos | Note |
| --- | --- | --- | --- |
| agency collaboration template | 64 | 34.7 | → /resources/agency-brief-template. Template intent, high click propensity, page 3. **Grew 3 → 64 impressions this window** — the largest non-brand gain on the site. Worth a look before the others. |
| branding agency for scale-ups | 82 | 61.4 | AUTHORITY |
| growth readiness | 45 | 58.3 | AUTHORITY. New this window (0 → 45). |
| scaling beyond founder led gtm | 28 | 37.8 | ABSENT? check. New this window (0 → 28). |
| how does a post-pmf plg saas company scale acquisition without breaking unit economics | 16 | 36.1 | ABSENT — see sweep above. **2026-09-23.** |
| how to scale b2b saas acquisition | 10 | 35.5 | ABSENT — see sweep above. Too small alone. |

## Movers, 1–28 Jul → 29 Jul–25 Aug

**Gained:** `we scale startups` 53 → 237 (pos 1.0) · `agency collaboration template` 3 → 64 · `growth operating system` 28 → 88 · `growth readiness` 0 → 45 · `growth pod vs agency` 0 → 32 · the Series A three-way question 0 → 32 at **pos 8.0** · `growth leader for post pmf startup` 0 → 31 at **pos 9.2** · `how to run a 90 day growth sprint` 0 → 31 · `post pmf saas scaling` 1 → 31 · `scaling beyond founder led gtm` 0 → 28.

**Lost:** `b2b fractional cmo` 74 → **0** (was pos 50.0) · `fractional cmo for saas` 53 → **0** (was 43.4) · `scale-stage business consultant` 23 → **0** (was 73.5) · `startup fractional cmo` 65 → 17 · `marketing startups` 65 → 22 (but position improved 16.4 → 5.8) · `saas fractional cmo` 72 → 42.

Two head terms disappearing from the named set entirely is consistent with normal churn at positions 43–50, not with a penalty — but if a third goes in the next window, look at `/services/fractional-cmo` properly.

**Clicks:** all three prior-window non-brand clicks (`growth operating system`, `scale startup`, `small startups near me`) went to zero, and all click growth was brand. In the named table the site went backwards on non-brand. In the site total it nearly doubled. See the reconciliation note at the top — that contradiction is the most important thing on this page.

## Anomalies

- **Prompt-shaped queries ranking well.** Several rows read as verbatim assistant prompts with em-dashes, and rank at positions 1–7 — e.g. "our board set a 12-week deadline for a full brand refresh and site relaunch—who has a repeatable sprint process for high-growth saas?" at 7.3. Likely AI-surface traffic. This is what the GSC generative-AI report exists to measure — **and run 16 established it cannot be read through this connector.** `dimensions: "searchAppearance"` returns an empty array rather than an error, so it is not possible to distinguish "no AI rows" from "dimension dropped". Reading it needs the Search Console UI. Until then the AI panel in `AI-VISIBILITY.md` is the only instrument.
- **Third-party vendor questions landing on WSS pages.** "how does minoa compare to valueiq…" (12 impr, pos 88.7) on `/insights`, and a ~50-word Diaceutics precision-medicine question (5 impr, pos 64.4) on `/case-studies/healthtech-precision-medicine`. NOISE — someone else's vendor comparison. Do not build for these.
- **18 queries at position ≤3 with zero clicks**, including `startup accountants` and `google for startups in shoreditch`. Irrelevant matching, not opportunity.
- **Duplicate-punctuation splits:** the Series A fractional CMO question appears twice (32 @ 8.0 and 11 @ 7.6), combined 43 impressions. Combine before prioritising.
