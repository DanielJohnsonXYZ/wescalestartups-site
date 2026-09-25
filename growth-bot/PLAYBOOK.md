# Growth-bot playbook (reset 2026-09-23)

The programme was reset on 2026-09-23 at Daniel's request. The old playbook and findings are in `growth-bot/archive/`. Read them only if a question needs history. Keep this file under 10KB and rewrite it instead of appending.

## What we know (checked 2026-09-23, 90 days to 2026-09-22 unless stated)

- **Where traffic comes from (GA4, 90d):** Direct 3,448 sessions but only 18% engaged, mostly bots. Google organic 313 (18 `book_call`). LinkedIn (three source spellings) 72 (8 `book_call`, 140–260s average). ChatGPT 48 (4 `book_call`). Customer.io/SendFox email 73, about 6s average, likely link scanners. Clutch/GoodFirms/GrowthMentor referrals total about 40.
- **Search is brand.** GSC 90d: "we scale startups" gets 41 clicks at position 1.1. Non-brand queries have about zero clicks. The homepage takes 108 of about 170 search clicks.
- **Bookings are mostly off-site in origin.** Last 28d: 14 bookings, about 3 with any website involvement. Sources: MentorCruise, GrowthMentor, podcast guests, Daniel's outreach. Daniel (2026-09-21): "More calls, don't filter."
- **Outreach prospects use the site as a credibility check.** Koa Browne (Onfound, after Daniel's approach) went `/` → `/pricing` → booked, with full scroll. Site behaviour doesn't show how someone got the link, so read the email thread.
- **Booking CTA:** about 65 `book_call` clicks in 90d. Sticky bar redesigned 2026-09-21 (`f9a0ef7`); compare `book_call` ÷ `sticky_book_cta_shown` around 2026-10-19 (baseline 30/357 = 8.4%).
- **Turnstile:** CSP fixed 2026-09-23 (`ebf5643`). The script now loads on all five forms, but tokens stayed empty in headless Chrome. `TURNSTILE_ENFORCE` is unset. Leave it unset until Daniel confirms a real-browser submission.
- **Intercom:** a GTM-injected widget, blocked by CSP. Daniel hasn't said whether it should be live. Leave it alone.
- **Mobile:** about 87% of Clarity sessions are desktop. `/book*` scores 94/100 on Clarity CWV. No known friction on `/book`.

## Starting candidates (re-rank each Monday on fresh data)

1. **Grow LinkedIn-sourced visits.** It's the best-engaged, best-converting real channel, but tiny. Levers: consistent UTMs on every link Daniel posts (currently split across `linkedin.com`, `lnkd.in` and `LinkedIn`), linking posts to a specific proof page and not just the homepage, and drafting posts in the report that point somewhere useful.
2. **Make outreach landings convincing.** Read the acquisition run's Notion pipeline. Check that the pages those prospects are likely to open (home, pricing, the closest case study) answer their obvious questions with proof from their segment. If a segment has no matching proof page, build one from existing repo proof.
3. **Brand searchers land on `/`.** They already know the name. Check the homepage gets them to proof and to booking fast on desktop, since most traffic is desktop.
4. **AI referrals (ChatGPT)** convert about as well as LinkedIn. That's SEO-bot territory. Hand off findings; don't duplicate its work.

## Access notes (short)

- GA4 via the WSS Search Analytics connector: one date range per call, since two ranges error. If the connector isn't listed, run `RefreshMcpTools` once before calling it absent.
- Chrome GA4 fallback: `authuser=2`. Clarity: sign in as `daniel@wescalestartups.com` if prompted.
- Headless Playwright: use `waitUntil: 'load'` because `networkidle` never settles with analytics running.
- **Booking feed: search with `in:anywhere`.** Cal.com notices can be filed in Trash (Conor, Marathon Accountants, booked 2026-09-15, was only found there at run 10). The default Gmail search leaves Trash out.
- GitHub pushes go through the connector with a blob-SHA check. `git clone` over HTTPS works for reading.

## Open asks to Daniel

- Authorise the `daniel@wescalestartups.com` work calendar on the Google Calendar connector. The booking emails miss about 40% of bookings.
- Confirm a real contact-form submission still lands now that Turnstile runs.
- Decide on Intercom: remove it from GTM, or add `widget.intercom.io` and related hosts to the CSP.
- Consider a separate Cal.com event type for MentorCruise/mentoring calls, so "Growth Audit" bookings stay a clean prospect signal.
