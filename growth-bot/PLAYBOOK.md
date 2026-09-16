# Growth-bot playbook

State for the scheduled Growth/CRO operator (daily, 07:00 London). The SEO/GEO operator's state is in `seo-bot/`; locks are shared both ways. Prompt of record is the scheduled task "WSS Growth Operator (CRO, daily)".

## Access notes

- **GA4 property `259840282`, account `161039443`** — "We Scale Startups / wescalestartups.com". URL shape that works:
  `https://analytics.google.com/analytics/web/?authuser=1#/a161039443p259840282/reports/explorer?params=_u..nav%3Dmaui%26_u.date00%3D20260819%26_u.date01%3D20260915&r=<report>`
  Comparison window: add `_u.date10`/`_u.date11`. Rows per page: `_r.explorerCard..rowsPerPage%3D100`.
  - **`?authuser=1` alone lands on the WRONG property** — it resolved to *Baboodle Universal - GA4* (`a232346320p339200980`). Daniel has access to dozens of GA4 accounts. **Assert the property name in the header before reading any number.**
  - Report ids that work: `all-pages-and-screens`, `landing-page`, `top-events`, `lifecycle-traffic-acquisition-v2`. **`lifecycle-events` and `tech-details` bounce silently to Home**, and the next table read returns Home's country widget, which parses as a valid table. **Assert `document.title` with every table read.**
- **Key event is `book_call`** — a **CTA click, not a booking**. It fires on `/` and `/book`. Related events: `sticky_book_cta_shown`, `ai_referral`. Never report `book_call` as bookings.
- Booking source of truth: Gmail, `from:noreply@wescalestartups.com` (self-hosted Cal.com at cal.wescalestartups.com, subjects `Growth Audit | <name> × We Scale Startups`). Legacy Calendly from `notifications@calendly.com` for old event types. Count by invitee + final event time.
  - **The Cal.com booking form captures `Company`, `Stage`, constraint and free-text challenge.** This is primary-source qualification evidence and beats a CRM lookup. Legacy Calendly notifications carry none of it — qualification from those is low confidence.
- Clarity: project `wkannkoxst` at `clarity.microsoft.com/projects/view/wkannkoxst/dashboard`. Sign in via **Sign in to Google → daniel@wescalestartups.com** (already authorised, no consent screen). Date control is a numeric "Last _N_ days" field, not a preset list.
- **PageSpeed keyless quota is exhausted** (429, shared Google project). Needs an API key from Daniel or skip.
- **Cloudflare connector is unauthenticated and unavailable.** Bot share comes from Clarity's own exclusion count only.

## Funnel model

Organic / AI / referral / direct → landing page → money page (`/pricing`, `/services/*`, `/contact`) → `/book` (Cal.com embed) → booking → qualified?

**Revised at run 1: this model is incomplete.** A material share of bookings never enters at the top — referrals, Mentorcruise, and Daniel's own outbound all land straight on the Cal.com link. Three of seven bookings in the first measured window did. **Separate website-sourced bookings from the rest before computing any conversion rate**; the website denominator is ~4 bookings per 28 days, not 7.

## Settled findings

- **Run 1 baseline (2026-08-19 → 2026-09-15): 7 bookings, ZERO qualified.** Every invitee was out of ICP on their own stated company and stage — two `pre-pmf`, a consultancy, a consumer drinks brand, a VR franchisor who wrote **"We aren't SaaS"**, and a partner intro Daniel sourced himself. Prior 28 days the same, at lower confidence. **The booking flow is not broken. It converts the wrong people.**
- **No friction constraint on this site, run 1 window.** Clarity 28d: rage clicks 0% (0 sessions), excessive scrolling 0% (0 sessions), dead clicks 5.25% (32 of 609), quick backs 3.78% (23). Pages/session 1.25, scroll depth 31.94%, active time 47s. **Do not re-derive this; re-read it, but do not treat "find the friction" as an open thread.**
- **`/book` ALREADY carries qualification copy** — `BEFORE YOU BOOK — This call isn't for everyone`, four disqualifiers, honest free-vs-paid labelling, Scorecard fallback. What it lacks is the **positive** ICP (B2B SaaS and AI, Seed–Series B, £1m–£10m ARR). Run 1's opening hypothesis, "the booking page has no qualification", was **false**. **Read the rendered page before diagnosing it.**
- **The sharpest lever in the funnel is no-touch.** The Cal.com `Stage` field offers `pre-pmf` and books it, against a page that says to hold off. The embed and the Cal.com instance are off-limits. Report it; never route around it.
- **GA4 session totals are not a conversion denominator.** Direct was **792 of 996 sessions (79.5%) at 8s and 16.67% engaged**, against Organic Search 116 at 47s / 56.03%. Clarity excluded **305 bot sessions from 914** over the same days. Any "conversion rate ÷ sessions" built on the raw GA4 number is fiction.
- **`/book/thanks` is landed on directly** (15 landing sessions / 12 users vs 7 booking emails). Not a booking proxy.

## Open, not established

- **One booking produced no Cal.com notification email** (Tom McColllum, 09-15 — two reschedule emails, no original). The source of truth may under-count. Watch for a second instance before acting.

## Locks inherited from seo-bot (read `seo-bot/VERDICTS.md` every run)

Open verdict windows: `/insights/what-is-a-fractional-cmo` (09-16), `/insights/how-to-run-a-90-day-growth-sprint` (09-17), `/facts/we-scale-startups` (09-22), the three pillars + `/insights` hub + orphans (09-23), `/insights/what-226-founder-reviews-reveal` (09-24), `/services/fractional-cmo` consolidation (10-03).

**The 2026-09-29 row names no page.** It marks the first genuinely independent money-page *click* window, not an experiment on a page. Working interpretation, **flagged to Daniel and not yet confirmed**: it does not lock money pages for conversion work, but **no title or meta-description change on a money page before 09-29**, because money-page clicks is the series under observation. Body copy, CTA placement and proof placement remain available.

## Ranked backlog

1. **Blocked on Daniel — are non-ICP booked calls a problem or part of the model?** Nothing about booking-page filtering can ship until this is answered. Daniel runs mentoring, a podcast and a referral network; several "unqualified" calls may be deliberate.
2. Close the baseline: device split, and the Clarity money-page view (`/pricing`, `/services/*`, `/book`) — scroll depth to CTA, dead clicks on money pages only.
3. Mobile render of money pages via Chrome. **Note: `resize_window` did not change the screenshot frame at run 1** — find a working mobile viewport route first.
4. Money-page mobile CWV — blocked on a PageSpeed API key.
5. Only if 1 returns "yes, filter": state the positive ICP on `/book` above the calendar. Metric: qualified share of website-sourced bookings. **Baseline 0 of ~4 per 28 days — set a review window of at least 28 days, not 14, or it cannot be read.**

## Proposed to Daniel

- Answer backlog 1.
- A PageSpeed API key (unblocks mobile CWV).
- Authorise the Cloudflare connector (bot share is currently inferred from Clarity alone).
- Confirm the 09-29 money-page interpretation above.

## Method notes

- **Check which GA4 property you are reading. Twice.** Run 1 spent its first reads on another company's site and the numbers looked healthy.
- **Qualify from the invitee's own form answers, not from the domain.** "We aren't SaaS" in a notes field settles a case a domain lookup would have got wrong.
- **A booking is not a website conversion until you know how the invitee got the link.** Check Gmail for outbound from Daniel before counting one.
