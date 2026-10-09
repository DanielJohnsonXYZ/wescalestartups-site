# Growth-bot playbook (reset 2026-09-23)

The programme was reset on 2026-09-23 at Daniel's request. The old playbook and findings are in `growth-bot/archive/`. Read them only if a question needs history. Keep this file under 10KB and rewrite it instead of appending.

## What we know (checked 2026-09-23, 90 days to 2026-09-22 unless stated)

- **Where traffic comes from (GA4, 90d):** Direct 3,448 sessions but only 18% engaged, mostly bots. Google organic 313 (18 `book_call`). LinkedIn (three source spellings) 72 (8 `book_call`, 140–260s average). ChatGPT 48 (4 `book_call`). Customer.io/SendFox email 73, about 6s average, likely link scanners. Clutch/GoodFirms/GrowthMentor referrals total about 40.
- **Search is brand, and content isn't changing that (run 17, GSC 28d to 09-29).** Site: 58 clicks, 3.66k impressions; `/` takes 35 clicks, `/resources` 9. All 27 `/insights/*` pages together: 318 impressions, **2 clicks**. The runs 10–13 pillars are still near zero (`/insights/b2b-saas-gtm-strategy` 20 impr at 8.4; the fractional-CMO pillar under 5), so the SEO bot's 09-23 test reads as "authority-bound". Don't build more articles to fix pipeline; demand comes from Daniel's channels. **Brand watch:** GSC position of `/` for "we scale startups" was 1.0 every day to 09-24, then 5.8–7.6 from 09-25 (09-29: 3.4), while `/about`, `/proof`, `/press`, `/facts` stay at 1.0. No site change that day; the live UK SERP (Chrome, 10-02) still shows WSS first with sitelinks, then LinkedIn, Instagram, Trustpilot, Crunchbase and `we-scale.co`. Likely a SERP-layout or reporting effect. **Run 22 (10-09):** `/` 28d 12 clicks / pos 3.1 vs prior 18 / ~1.1; sitelinks still 1.0, live SERP still first. Noise; recheck 10-19. puddding.com brand listing (old "agency" copy) handed to SEO bot.
- **Bookings are mostly off-site in origin.** Last 28d: 14 bookings, about 3 with any website involvement. Sources: MentorCruise, GrowthMentor, podcast guests, Daniel's outreach. Daniel (2026-09-21): "More calls, don't filter."
- **Outreach prospects use the site as a credibility check.** Koa Browne (Onfound, after Daniel's approach) went `/` → `/pricing` → booked, with full scroll. Site behaviour doesn't show how someone got the link, so read the email thread.
- **Booking CTA:** about 65 `book_call` clicks in 90d. Sticky bar redesigned 2026-09-21 (`f9a0ef7`); compare `book_call` ÷ `sticky_book_cta_shown` around 2026-10-19 (baseline 30/357 = 8.4%).
- **Newsletter popup on money pages (run 12, 2026-09-27):** the popup close button was the most-clicked control on desktop `/pricing` (4 of 30 clicks in 30d), matching every "Get in touch" click combined. Popup now off `/pricing` (`5f0d26d`, review 2026-10-25) and `/` (run 13, `3a86006`, review 2026-10-28: desktop `/` popup close 26 of 181 clicks, the top control; sticky-bar dismiss 18; booking links ~12). It still runs on `/services/*` and elsewhere. Sticky-bar dismisses outnumber its booking clicks on `/`: weigh that at the 10-19 verdict.
- **Turnstile JS errors (run 15):** in 17.7% of Clarity sessions; with `TURNSTILE_ENFORCE` unset they block nothing. Not a conversion defect.
- **Mentees still book on the Growth Audit link (run 15):** Bea Brampton (Up Club mentee) rebooked via Growth Audit on 09-29 with "Mentoring!" as her challenge. Count by form answers, not event title alone.
- **Legacy 404s are crawlers, not buyers (run 16):** old WordPress URLs (`/strategic-customer-research-programme/`, `/crypto-marketing/` etc.) draw about 20 views a week at one view per user and 0s engagement. Off-ICP topics, so leave them as 404s.
- **Mobile:** about 87% of Clarity sessions are desktop. `/book*` scores 94/100 on Clarity CWV. No known friction on `/book`.

## Starting candidates (re-rank each Monday on fresh data)

1. **Grow LinkedIn-sourced visits.** It's the best-engaged, best-converting real channel, but tiny. Levers: consistent UTMs on every link Daniel posts (currently split across `linkedin.com`, `lnkd.in` and `LinkedIn`), linking posts to a specific proof page and not just the homepage, and drafting posts in the report that point somewhere useful.
2. **Make outreach landings convincing.** Read the acquisition run's Notion pipeline. Check that the pages those prospects are likely to open (home, pricing, the closest case study) answer their obvious questions with proof from their segment. If a segment has no matching proof page, build one from existing repo proof.
3. **Brand searchers land on `/`.** They already know the name. Check the homepage gets them to proof and to booking fast on desktop, since most traffic is desktop.
4. **AI referrals (ChatGPT)** convert about as well as LinkedIn. That's SEO-bot territory. Hand off findings; don't duplicate its work.

## Access notes (short)

- **Use the WSS Search Analytics connector first** (from 2026-10-06; see below). Chrome fallback: GSC works in Claude in Chrome at `authuser=2`, `sc-domain:wescalestartups.com`. JS is often denied, so use URL filters (`query=!<exact>`, `page=*<fragment>`, `breakdown=date|page|query`) and `get_page_text`, which returns the first 10 rows.
- Chrome GA4 fallback: `authuser=2`. Clarity: sign in as `daniel@wescalestartups.com` if prompted.
- Headless Playwright: use `waitUntil: 'load'` because `networkidle` never settles with analytics running.
- **Google Calendar connector is on the work account (2026-09-26).** `search_events` "Growth Audit We Scale Startups" returns every Cal.com booking with its form answers (company, stage, constraint, challenge) and the invitee's RSVP. Use it to cross-check the Gmail count and to qualify invitees.
- **Booking feed: search with `in:anywhere`.** Cal.com notices are routinely in Trash: 8 September bookings, two of them (Conor McCutcheon, Isabelle Kent) found only there at run 10. The default Gmail search leaves Trash out.
- **GA4 events before GTM v37 (pre-2026-09-26):** no per-CTA clicks; `book_call` counted clicks, not bookings.
- **GTM version 37 (Daniel, 2026-09-26 11:07):** `cta_click`, `scorecard_start`, `pricing_click`, `resource_click` and `outbound_link_click` now go to GA4 under their own names with `cta_label` and `cta_href`. `cta_label` is registered as the event-scoped custom dimension "CTA label". `booking_complete` (no "d") now fires on page views of `/book/thanks`. The old Calendly trigger listens for `calendly.event_scheduled`, which the site never sends, so bookings aren't double-counted. Per-CTA and completed-booking comparisons start from 2026-09-26: never compare them with windows before that date. The old `booking_completed` key event is dead.
- **GA4 route (run 16, 2026-10-01):** the browser pane is still signed out of every Google account; **Claude in Chrome is signed in** and reads GA4 at `authuser=2`, account `a161039443p259840282`. URLs carrying `_u.date00`/`date01`, and the `all-events` report, bounce to Home: use the Pages report (`r=all-pages-and-screens&collectionId=life-cycle`, default last 28 days), set rows to 250 via the `mat-select`, and switch the Event count column's "All events" button to one event to get that event by page. Chrome dropped its connection mid-run, so read what you need early.
- **Clarity via the browser pane works (run 12):** project `wkannkoxst`. Heatmap URL: `/projects/view/wkannkoxst/heatmaps?date=Last%2030%20days&heatmapDeviceType=2&heatmapType=0&url=<page>&URL=2%3B6%3B<escaped regex>` (device 2 = desktop). Read the click list with JS: split `document.body.innerText` on `N clicks (x%)` lines. Screenshots fail while the pane is hidden, so use `read_page` or JS.
- GitHub pushes go through the connector with a blob-SHA check. `git clone` over HTTPS works for reading.

## Open asks to Daniel

- **(run 20) Add UTMs to the Gmail signature link:** `https://wescalestartups.com/?utm_source=email&utm_medium=signature&utm_campaign=daniel-signature`. ~65 sent emails a week carry a bare link today, so outreach visits vanish into bot-heavy Direct. Once done, GA4 `email / signature` is the outreach-landing measure for candidate 2.

## Closed 2026-10-06

- **`booking_complete` is a GA4 key event** (marked in Chrome at Daniel's instruction, run 19). Completed-booking counts in GA4 are valid from 2026-10-06. `book_call` is still a key event too; it counts clicks, not bookings, so never report it as conversions.
- **SEO/GEO bot is running.** Daniel didn't know about it; its run 30 committed at 07:37 on 2026-10-06 and closed seven verdicts: every classic-search content change failed, retrieval holds on `/facts/*` and the sprint service page, ~5 AI-referred human sessions a month, no bookings. Don't re-ask Daniel. Read `seo-bot/VERDICTS.md` before any search-driven page change; its operative rule (check humans ask the query, in that phrasing, in volume) applies here too.
- **`/book/thanks` query string stripped before GTM loads** (`6a3411a`). Cal.com was putting invitee names and free-text notes into GA4 `page_location`. Only `?type=<eventTypeSlug>` survives. Not a conversion test, so no lock.
- **WSS Search Analytics connector** now gives GA4 (property `259840282`), GSC (`sc-domain:wescalestartups.com`) and Clarity reads without Chrome. Use account_id `google`.

## LinkedIn UTM convention (from 2026-10-06)

Every link Daniel posts: `?utm_source=linkedin&utm_medium=social&utm_campaign=<yyyy-mm>-<post-slug>`. Point posts at a proof page, not `/`. Drafts waiting for his return are in run 19's log.

## Closed with Daniel (2026-09-28)

- **Turnstile:** real visitors pass (Cloudflare, 7d to 09-28: 4,761 issued, 1,391 solved). Automated browsers never get a token, so form tests from here prove nothing. `TURNSTILE_ENFORCE` stays unset (needs `FORM_MONITOR_SECRET` on Pages and Steve; a wrong secret drops leads). Revisit only if bot signups appear in Customer.io.
- **Intercom:** paused in GTM v38 (free tools only). No chat replacement.
- **Mentoring bookings:** Cal.com "Mentoring Session" (`cal.wescalestartups.com/daniel/mentoring`, 20 min, public). Calendar title `Mentoring | {Scheduler} × Daniel Johnson`, so count it separately from Growth Audits. `/mentoring` links it (`mentoring-book`, `mentoring-final-book`; `2f1759e`). MentorCruise and GrowthMentor book natively; nothing to swap there.
