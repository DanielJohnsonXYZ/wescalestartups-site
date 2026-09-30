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
- **Newsletter popup on money pages (run 12, 2026-09-27):** the popup close button was the most-clicked control on desktop `/pricing` (4 of 30 clicks in 30d), matching every "Get in touch" click combined. Popup now off `/pricing` (`5f0d26d`, review 2026-10-25) and `/` (run 13, `3a86006`, review 2026-10-28: desktop `/` popup close 26 of 181 clicks, the top control; sticky-bar dismiss 18; booking links ~12). It still runs on `/services/*` and elsewhere. Sticky-bar dismisses outnumber its booking clicks on `/`: weigh that at the 10-19 verdict.
- **Turnstile JS errors (run 15):** Clarity shows Turnstile client errors 300010, 600010, 300030 and 110200 in 17.7% of sessions over the last 7 days (30 errors), against 3% over 30 days. They rose after the 09-23 CSP fix made the widget load. With `TURNSTILE_ENFORCE` unset they block nothing: `/api/forms` skips verification and the contact form hands off to `mailto:` anyway. The codes match automation and privacy browsers, and Cloudflare shows real visitors solving. Not a conversion defect. Recheck only if `TURNSTILE_ENFORCE` is ever switched on.
- **Mentees still book on the Growth Audit link (run 15):** Bea Brampton (PAWD Drinks, Up Club mentee) rebooked on 2026-09-29 through Growth Audit, a day after the Mentoring event type went live, with "Mentoring!" as her challenge. Existing mentees reuse the link they already have. Count by form answers, not event title alone.
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
- **Google Calendar connector is on the work account (2026-09-26).** `search_events` "Growth Audit We Scale Startups" returns every Cal.com booking with its form answers (company, stage, constraint, challenge) and the invitee's RSVP. Use it to cross-check the Gmail count and to qualify invitees.
- **Booking feed: search with `in:anywhere`.** Cal.com notices are routinely in Trash: 8 September bookings, two of them (Conor McCutcheon, Isabelle Kent) found only there at run 10. The default Gmail search leaves Trash out.
- **GA4 event inventory (checked 2026-09-26):** before GTM version 37, GA4 received only `page_view`, `ga4event`, `session_start`, `first_visit`, `user_engagement`, `sticky_book_cta_shown`, `scroll`, `book_call`, `ai_referral`, `click` and `form_start`. Per-CTA clicks were not measured, and GA4 "key events" counted `book_call` clicks, not bookings.
- **GTM version 37 (Daniel, 2026-09-26 11:07):** `cta_click`, `scorecard_start`, `pricing_click`, `resource_click` and `outbound_link_click` now go to GA4 under their own names with `cta_label` and `cta_href`. `cta_label` is registered as the event-scoped custom dimension "CTA label". `booking_complete` (no "d") now fires on page views of `/book/thanks`. The old Calendly trigger listens for `calendly.event_scheduled`, which the site never sends, so bookings aren't double-counted. Per-CTA and completed-booking comparisons start from 2026-09-26: never compare them with windows before that date. The old `booking_completed` key event is dead.
- **Browser pane Google session (2026-09-30):** every Google account in the pane showed "Signed out", so GA4 could not be read at run 15. Clarity in the pane still works. Claude in Chrome was not connected. Signing in needs Daniel.
- No GA4 connector is listed, even after refresh. Use Chrome at `authuser=2`: the Events report for property `259840282` works.
- **Clarity via the browser pane works (run 12):** project `wkannkoxst`. Heatmap URL: `/projects/view/wkannkoxst/heatmaps?date=Last%2030%20days&heatmapDeviceType=2&heatmapType=0&url=<page>&URL=2%3B6%3B<escaped regex>` (device 2 = desktop). Read the click list with JS: split `document.body.innerText` on `N clicks (x%)` lines. Screenshots fail while the pane is hidden, so use `read_page` or JS.
- GitHub pushes go through the connector with a blob-SHA check. `git clone` over HTTPS works for reading.

## Open asks to Daniel

- Sign the browser pane back in to `daniel@wescalestartups.com` / the GA4 account (found signed out 2026-09-30). Unlocks per-CTA `cta_click` reads and the `booking_complete` check.
- The SEO/GEO bot's last run log is `seo-bot/changelog/2026-09-15-run29.md` and there is no cloud scheduled task for it. Its 09-22, 09-24 and 09-29 verdicts are unjudged. Confirm whether it is meant to still run.
- Mark `booking_complete` as a GA4 key event once it first appears (after the next booking). Daniel agreed on 2026-09-28; it has not fired yet.

## Closed with Daniel (2026-09-28)

- **Turnstile:** Daniel said "do it yourself". Cloudflare analytics for sitekey `0x4AAAAAAEIhzoHuWLsynQnO`, 7 days to 2026-09-28: 4,761 challenges issued, 1,390 solved without interaction, 1 solved interactively. Real visitors pass. Automated browsers (headless, the browser pane and Claude in Chrome) never get a token, so a form test from here can't prove anything. `TURNSTILE_SECRET_KEY` is set on the `wescalestartups-com` Pages project. `TURNSTILE_ENFORCE` stays unset: switching it on also needs `FORM_MONITOR_SECRET` on Pages and on Steve for the lead-capture probe, and a wrong secret would silently drop leads. Revisit only if bot signups show up in Customer.io.
- **Intercom:** Daniel wants free tools only. The Intercom tag in GTM-TV6C7GS was paused and published as **version 38** (2026-09-28). Live `gtm.js` serves v38 with no Intercom reference. It had never loaded (CSP-blocked). No chat replacement.
- **Mentoring bookings:** Cal.com event type **"Mentoring Session"**, `cal.wescalestartups.com/daniel/mentoring` (id 6), **20 min** and **public on the profile** (Daniel, 2026-09-28), Google Meet, same availability. Calendar title is **`Mentoring | {Scheduler} × Daniel Johnson`**, so the Calendar search "Growth Audit We Scale Startups" no longer returns calls booked through it. Count `Mentoring |` events separately from Growth Audits. `/mentoring` now has "Book a 20-minute mentoring session" (hero, `data-cta="mentoring-book"`) and "Book a mentoring session" (closing band, `mentoring-final-book`) pointing there, with "Contact me" kept beside each (`2f1759e`, lastmod `9528813`). MentorCruise and GrowthMentor book natively through their own schedulers and have no external booking-link field; neither profile carries a Cal.com or Calendly link, so there was nothing to swap there.
