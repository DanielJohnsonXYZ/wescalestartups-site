# Growth-bot playbook

State for the scheduled Growth/CRO operator (daily, 07:00 London). The SEO/GEO operator's state is in `seo-bot/`; locks are shared both ways. Prompt of record is the scheduled task "WSS Growth Operator (CRO, daily)".

## Access notes

- **GA4 no longer needs Chrome.** The **WSS Search Analytics (Rankrat)** connector came online at the end of run 2 and reaches GA4 directly. Verified against property `259840282` for 2026-08-20 → 2026-09-16: `wss-search-analytics_google_analytics_landing_page_performance` returned `/` 408 sessions, `/book` 27, `/pricing` 25, `/services/growth-diagnosis` 20, `/contact` 10 — consistent with run 1's hand-read table, so it is answering about the right property. `accounts_list` → `account_id: "google"`, and the GA4 tools take `property_id` explicitly. **Try this before the browser; it is faster and has no account-chooser trap.** Still assert the numbers look like this site.
  - **Clarity is still Chrome-only.** The connector exposes `clarity_insights` but **no `clarity` account is configured** — the call is rejected. It is also capped at 1–3 days, so even once configured it will not replace the 28-day dashboard read.
  - **Cloudflare is still unavailable.** No `cloudflare` account configured in the connector either.
  - **The built-in browser is not a substitute for Google-authenticated sources.** It keeps its own profile with **no Google session**: both `clarity.microsoft.com` and `analytics.google.com` bounce to `accounts.google.com/v3/signin/identifier`. Signing in needs a password, which is prohibited. **Do not spend a run trying to route around this** — record the gap and move on.
  - **Chrome is still required for Clarity and the GSC Generative AI report.** At run 2 the `claude-in-chrome` extension was not connected for the whole run and both were unreachable; it reconnected afterwards.
- **Mobile viewport: use the built-in browser, not Chrome.** `resize_window` with `preset: "mobile"` gives a real 375x812 viewport and a mobile user agent (verified via `window.innerWidth`). Chrome's `resize_window` did **not** change the screenshot frame at run 1. The built-in browser needs the desktop app online; it can drop mid-run.
- **GA4 property `259840282`, account `161039443`** — "We Scale Startups / wescalestartups.com". URL shape that works:
  `https://analytics.google.com/analytics/web/?authuser=1#/a161039443p259840282/reports/explorer?params=_u..nav%3Dmaui%26_u.date00%3D20260819%26_u.date01%3D20260915&r=<report>`
  Comparison window: add `_u.date10`/`_u.date11`. Rows per page: `_r.explorerCard..rowsPerPage%3D100`.
  - **`?authuser=1` alone lands on the WRONG property** — it resolved to *Baboodle Universal - GA4* (`a232346320p339200980`). Daniel has access to dozens of GA4 accounts. **Assert the property name in the header before reading any number.**
  - Report ids that work: `all-pages-and-screens`, `landing-page`, `top-events`, `lifecycle-traffic-acquisition-v2`. **`lifecycle-events` and `tech-details` bounce silently to Home**, and the next table read returns Home's country widget, which parses as a valid table. **Assert `document.title` with every table read.**
- **Key event is `book_call`** — a **CTA click, not a booking**. It fires on `/` and `/book`. Related events: `sticky_book_cta_shown`, `ai_referral`. Never report `book_call` as bookings.
- Booking source of truth: Gmail, `from:noreply@wescalestartups.com` (self-hosted Cal.com at cal.wescalestartups.com, subjects `Growth Audit | <name> × We Scale Startups`). Legacy Calendly from `notifications@calendly.com` for old event types. Count by invitee + final event time. **Gmail has been reliable on every run; it is the one instrument that has never gone dark.**
  - **The Cal.com booking form captures `Company`, `Stage`, constraint and free-text challenge.** This is primary-source qualification evidence and beats a CRM lookup. Legacy Calendly notifications carry none of it — qualification from those is low confidence.
- Clarity: project `wkannkoxst` at `clarity.microsoft.com/projects/view/wkannkoxst/dashboard`. Sign in via **Sign in to Google → daniel@wescalestartups.com** (already authorised in Chrome, no consent screen). Date control is a numeric "Last _N_ days" field, not a preset list.
- **PageSpeed is exhausted by both routes.** Keyless curl returns 429 (shared Google project `583797351490`); the connector's `pagespeed_core_web_vitals` returns `RATE_LIMITED` on the same quota. Re-tested at run 2. **Needs an API key from Daniel, or skip — do not re-test both routes each run.**
- **Cloudflare connector is unauthenticated and unavailable.** Bot share comes from Clarity's own exclusion count only.

## Funnel model

Organic / AI / referral / direct → landing page → money page (`/pricing`, `/services/*`, `/contact`) → `/book` (Cal.com embed) → booking → qualified?

**Revised at run 1, corrected at run 2: a majority of bookings never enter at the top.** Referrals, MentorCruise, the podcast and Daniel's own outbound all land straight on the Cal.com link — **five of eight** in the run 2 window. **Separate website-sourced bookings from the rest before computing any conversion rate. The website denominator is 3 per 28 days, not 7 or 8.**

- **MentorCruise is a recurring structural source of non-ICP bookings** — two of eight in the run 2 window, both mentees seeking personal guidance rather than a company engagement. No site change affects it. Count it separately every run.

## Settled findings

- **Run 1 baseline (2026-08-19 → 2026-09-15): 7 bookings, ZERO qualified.** Every invitee was out of ICP on their own stated company and stage — two `pre-pmf`, a consultancy, a consumer drinks brand, a VR franchisor who wrote **"We aren't SaaS"**, and a partner intro Daniel sourced himself. Prior 28 days the same, at lower confidence. **The booking flow is not broken. It converts the wrong people.**
- **Run 2 (2026-08-20 → 2026-09-16): 8 bookings, ZERO qualified. Twelve for twelve across both measured windows.** The eighth was Josefina — company Dempo, stage `post-pmf-under-1m`, personal gmail, and in her own words *"I'll join this company on Monday and I need guidance during my first quarter"*. An incoming employee wanting personal guidance, sourced from MentorCruise. **Eight for eight is a pattern, not a small-sample accident.**
- **No friction constraint on this site, run 1 window.** Clarity 28d: rage clicks 0% (0 sessions), excessive scrolling 0% (0 sessions), dead clicks 5.25% (32 of 609), quick backs 3.78% (23). Pages/session 1.25, scroll depth 31.94%, active time 47s. **Do not re-derive this; re-read it, but do not treat "find the friction" as an open thread.**
- **No mobile render defect on `/pricing` or `/book`** (run 2, 375x812). Both render correctly. `/book` states the next step — **"Pick a time →"** — in the first screen without scrolling, with the Scorecard fallback beneath it. **The Cal.com embed lazy-loads and renders on mobile; an empty container before scroll is expected, not a fault.**
- **`/book` ALREADY carries qualification copy** — `BEFORE YOU BOOK — This call isn't for everyone`, four disqualifiers, honest free-vs-paid labelling, Scorecard fallback. What it lacks is the **positive** ICP (B2B SaaS and AI, Seed–Series B, £1m–£10m ARR). Run 1's opening hypothesis, "the booking page has no qualification", was **false**. **Read the rendered page before diagnosing it.**
- **The money pages filter on budget and symptom, never on company type or stage** (run 2, `/pricing`). `/pricing` filters twice — by budget in the first screen (*"If the ranges aren't workable for you, an agency or in-house hire will probably be a better fit"*) and by symptom in the self-routing block — and never asks whether the visitor is the kind of company WSS serves. The only ICP clause on the page sits inside the Fractional CMO tier, where a visitor shopping a £2k diagnosis will not read it. **The four proof cases named — eQuoo (healthtech), Nevly (financial wellness), LessonsUp (EdTech), Ned (fintech) — are not labelled as B2B SaaS or AI.** A B2B SaaS founder sees no signal that this firm works with companies like theirs. This is the same gap as `/book`, and it explains how a drinks brand, a VR franchisor and an accountancy all self-routed through.
- **The sharpest lever in the funnel is no-touch.** The Cal.com `Stage` field offers `pre-pmf` and books it, against a page that says to hold off. The embed, its container and the Cal.com instance are off-limits. Report it; never route around it.
- **GA4 session totals are not a conversion denominator.** Direct was **792 of 996 sessions (79.5%) at 8s and 16.67% engaged**, against Organic Search 116 at 47s / 56.03%. Clarity excluded **305 bot sessions from 914** over the same days. Any "conversion rate ÷ sessions" built on the raw GA4 number is fiction.
- **`/book/thanks` is landed on directly** (15 landing sessions / 12 users vs 7 booking emails). Not a booking proxy.

## Open, not established

- **One booking produced no Cal.com notification email** (Tom McColllum, 09-15 — two reschedule emails, no original). The source of truth may under-count. No second instance at run 2. Watch for one before acting.
- **`/book` on mobile puts the calendar in a nested scroll box** (run 2, measured at 375px). `#book-cal-inline` is `overflow-y: auto` with `clientHeight` 698px and `scrollHeight` 956px; the Cal.com iframe is 956px. **Not clipped — nested-scrolled.** A mobile visitor must scroll inside a 698px window to reach the bottom 258px of the calendar, where `month_view` puts the time slots and the confirm step. **This is a friction candidate found by inspection, not a demonstrated constraint** — Clarity was dark, so no behavioural evidence and no device split. **It is no-touch (FIXED RULE 1 covers the container). Report it; never route around it.** Promote or retire it with the Clarity mobile `/book` read.

## Locks inherited from seo-bot (read `seo-bot/VERDICTS.md` every run)

Open verdict windows: `/insights/what-is-a-fractional-cmo` (09-16), `/insights/how-to-run-a-90-day-growth-sprint` (09-17), `/facts/we-scale-startups` (09-22), the three pillars + `/insights` hub + orphans (09-23), `/insights/what-226-founder-reviews-reveal` (09-24), `/services/fractional-cmo` consolidation (10-03).

**The 2026-09-29 row names no page.** It marks the first genuinely independent money-page *click* window, not an experiment on a page. Working interpretation, **flagged to Daniel and not yet confirmed**: it does not lock money pages for conversion work, but **no title or meta-description change on a money page before 09-29**, because money-page clicks is the series under observation. Body copy, CTA placement and proof placement remain available.

Run 2 note: the 09-17 row judges whether the new insight URL takes queries **off `/services/90-day-growth-sprint`**, so that service page is entangled in the window. Treat it as locked until the row is judged.

## Ranked backlog

1. **Blocked on Daniel — are non-ICP booked calls a problem or part of the model?** Nothing about booking-page filtering can ship until this is answered. Daniel runs mentoring, a podcast and a referral network; five of eight bookings in the run 2 window came from channels he built deliberately.
2. Close the baseline: device split, and the Clarity money-page view (`/pricing`, `/services/*`, `/book`) — scroll depth to CTA, dead clicks on money pages only. **The GA4 half is now connector-reachable without Chrome. The Clarity half still needs Chrome.** If Chrome is down, pull the GA4 half anyway and record only Clarity as the gap.
3. ~~Find a working mobile viewport route.~~ **Solved at run 2** — built-in browser, `resize_window` `preset: "mobile"`. `/pricing` and `/book` captured and clean. Remaining money pages not yet captured on mobile: `/contact`, `/services/growth-diagnosis`, `/services/acquisition-system-build`, `/`.
4. Money-page mobile CWV — blocked on a PageSpeed API key.
5. Only if 1 returns "yes, filter": state the positive ICP where the decision is made — `/book` above the calendar, and the top of `/pricing`. Metric: qualified share of website-sourced bookings. **Baseline 0 of 3 per 28 days — set a review window of at least 28 days, not 14, or it cannot be read.**

## Proposed to Daniel

- Answer backlog 1.
- **Keep Chrome running with the Claude extension when the daily run fires** — now needed for Clarity and the GSC Generative AI report, no longer for GA4.
- **Configure `clarity` and `cloudflare` accounts on the WSS Search Analytics connector** if that is possible. GA4 went from Chrome-dependent to one call once it was configured; the same would take Clarity off the critical path.
- A PageSpeed API key (unblocks mobile CWV).
- Authorise the Cloudflare connector (bot share is currently inferred from Clarity alone).
- Confirm the 09-29 money-page interpretation above.

## Method notes

- **Check which GA4 property you are reading. Twice.** Run 1 spent its first reads on another company's site and the numbers looked healthy.
- **Qualify from the invitee's own form answers, not from the domain.** "We aren't SaaS" in a notes field settles a case a domain lookup would have got wrong.
- **A booking is not a website conversion until you know how the invitee got the link.** Check Gmail for outbound from Daniel, and for MentorCruise and referral threads, before counting one. Josefina looked like a website booking until the MentorCruise thread turned up.
- **A window that moves forward by a day is not a new measurement.** Run 2's 7 → 8 is one addition, not growth. Say so, or the next run reads a trend into it.
- **An empty container is not a broken embed.** The Cal.com widget renders nothing until scrolled near. Inspect the DOM before calling a blank screen a defect.
- **Programmatic scroll does not move this site.** `window.scrollTo` and `Element.scrollIntoView` leave `window.scrollY` at 0 — a smooth-scroll library intercepts them. Only real wheel events via the `computer` scroll action move the page, so only they fire a lazy-load. **Scroll with `computer`, never with injected JS, when testing lazy-loaded elements.** Two false "the embed failed to load" readings at run 2 came from this.
