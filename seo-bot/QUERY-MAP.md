# Query → intent → page map

Seeded run 15, 2026-08-27. Window: 2026-07-28 to 2026-08-24 (28 days), 351 queries, 2,758 impressions, 23 clicks — all 23 from three branded queries.

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

## Open leads — unworked

| Query | Impr | Pos | Note |
| --- | --- | --- | --- |
| agency collaboration template | 64 | 34.7 | → /resources/agency-brief-template. Template intent, high click propensity, page 3. |
| branding agency for scale-ups | 82 | 61.4 | AUTHORITY |
| growth readiness | 45 | 58.3 | AUTHORITY |
| scaling beyond founder led gtm | 28 | 37.8 | ABSENT? check |
| how does a post-pmf plg saas company scale acquisition without breaking unit economics | 16 | 36.1 | ABSENT |
| how to scale b2b saas acquisition | 10 | 35.5 | ABSENT? |

## Anomalies

- **Prompt-shaped queries ranking well.** Several rows read as verbatim assistant prompts with em-dashes, and rank at positions 1–7 — e.g. "our board set a 12-week deadline for a full brand refresh and site relaunch—who has a repeatable sprint process for high-growth saas?" at 7.3. Likely AI-surface traffic. This is what the GSC generative-AI report exists to measure.
- **18 queries at position ≤3 with zero clicks**, including `startup accountants` and `google for startups in shoreditch`. Irrelevant matching, not opportunity.
- **Duplicate-punctuation splits:** the Series A fractional CMO question appears twice (32 @ 8.0 and 11 @ 7.6), combined 43 impressions. Combine before prioritising.
