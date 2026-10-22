# Growth-bot playbook (rewritten 2026-10-19, run 30)

Keep under 10KB; rewrite, don't append. History: `growth-bot/archive/`, `growth-bot/changelog/`. The 2026-09-23 reset and the long-form notes from runs 1–29 are in git history (`d0c5b37`).

## Remit (Daniel, 2026-10-14 and 2026-10-16; operator prompt of record from 2026-10-19)

- **Objective: qualified booked calls from the website.** Rankings, traffic and clicks are inputs. Trace the whole chain: demand → visibility → click → landing → trust → intent → booking → qualified.
- **Web growth operator, not outreach.** Partner/prospect outreach belongs to the acquisition run. Drafts only for any email (Daniel sends).
- **Each run:** look across every source, research, pick the highest-value action, do it, verify, record baseline and review date. Don't change things just to show activity; a verdict plus a clear finding is a valid run.
- **Tests:** at most two open site experiments, judged on bookings, reviewed within 14 days where the volume allows. Lock only the pages changed. Read every test against Daniel's activity (see "What we know").
- **Never:** send prospect/client email or DMs, publish as Daniel, commit to price or terms, invent facts, pay, delete accounts or data, touch Cal.com flow, analytics/GTM tags or form handling. **No client review requests on any platform** (Daniel, 2026-09-04/07, permanent). Reporting goes in chat only (no Slack, email or push).

## What we know (updated 2026-10-20)

- **Bookings follow Daniel, not the site.** 21 Sep–18 Oct: `/book` views 18 (prior 52), Growth Audit bookings ~6 (prior ~13), page views flat (1,220 vs 1,252). Every booking came from someone who already knew him (mentees, peers, partners, repeats). When he's away, warm traffic and bookings drop together.
- **Qualified rate is 0% in every FUNNEL window since July (run 31).** All bookings come from Daniel's network, mentoring or GrowthMentor project intros (Nana/Prodigio, 10-19: pre-PMF, <$5K). No cold ICP buyer has booked from the site in the tracked period. Daniel (10-20) doesn't recall any paying client who first found WSS through the website: treat the site as a credibility check, not a cold-lead source, until one shows up.
- **ChatGPT is the only cold source landing on a money page (run 32).** GA4 90d to 10-20: 54 sessions, 5 key events (9.3%). Top landings `/` 10, `/services/growth-diagnosis` 9 (22% engaged), `/about` 4, `/insights/when-to-hire-fractional-cmo` 4 (0 engaged). Protect and improve the paths ChatGPT already uses before chasing new ones.
- **Service-page quotes are real (Daniel, 2026-10-21).** The eight anonymised `caseProof` quotes on `/services/*` were removed in run 32 as unsourced and restored the same day after Daniel confirmed all are from real clients. Don't remove or re-question them; anonymised attribution is deliberate.
- **ChatGPT referrals collapsed and it isn't access (run 33).** GA4 AI Assistant: 2 sessions in 28d to 10-21 (~5/week before week 40). Cloudflare AI Crawl Control shows ChatGPT-User fetching the site ~60–100 times a week (mostly `/`, then `/insights/fractional-cmo-cost-uk`, `/services/*`, `/pricing`), only 6 challenges in 30d; OAI-SearchBot allowed. Reads as people vetting WSS by name in ChatGPT and rarely clicking. "Unsuccessful" in AI Crawl Control is scanner noise (spoofed UAs hitting `/.env` etc.): ignore it.
- **Real channels, GA4 28d to 10-18:** Google organic 93 sessions (almost all brand, 7 of 15 key events); LinkedIn 9 (best key-event rate); ChatGPT 7 (was ~5/week before week 40; GA4 now files it under the **AI Assistant** default channel, `chatgpt.com / ai-assistant`); directories ~10 (Clutch, GoodFirms, DesignRush, The Manifest, TechBehemoths). Direct 733 at 18% engaged is mostly bots. aocr.org (radiology college) 20 sessions: ignore.
- **Non-brand search is authority-bound.** Content verdicts all failed (seo-bot `VERDICTS.md`); ~29 referring domains. Read seo-bot `VERDICTS.md` before any search-driven page change.
- **Brand SERP (UK):** WSS first with sitelinks and a Business Profile panel, then LinkedIn, Instagram, **Trustpilot**, Facebook, Crunchbase, Puddding. GSC brand position averages ~4–5 because it pools pages; the live SERP is fine. Brand watch closed 2026-10-19. The `/pricing` sitelink shows the WhatsApp line: fix its meta description after 10-25.
- **Trustpilot (run 30, fixed 2026-10-21):** the July 2022 one-star review now carries Daniel's rewritten, calmer reply.
- **AI visibility:** Bing WMT "AI Performance" (Chrome, signed in) shows ~615 Copilot citations in 3 months, mostly off-ICP queries; no visits follow. ChatGPT is the only AI source that sends visits. SEO bot owns this.
- **Off-site mentions:** reclamation drafts sent 2026-10-16 (startups.com, MediaPost, marcdos.com, Worst Advice Podcast, parisvega.com); review 2026-11-06 by checking each page for a `wescalestartups.com` href. A fresh sweep on 10-19 found only owned profiles; no new targets. pitchpodcasts.com (10 mentions) and the MentorCruise profile (7) have no link.
- **Referral 404s fixed (run 29):** three legacy posts linked from GrowthMentor and danieljohnson.xyz now 301. Other legacy 404s are crawlers, off-ICP: leave them.
- **Cloudflare:** Bot Fight Mode managed-challenges PerplexityBot (Free plan, no per-bot bypass). Perplexity sends 0 referrals. Not acted on.
- **Sticky booking bar:** closed 2026-10-19, no measurable lift, design kept. Don't retest the bar.
- **Newsletter popup:** off `/pricing` (verdict 10-25) and `/` (verdict 10-28). Still on `/services/*` and elsewhere.
- **Outreach prospects use the site as a credibility check** (`/` → `/pricing` → `/book`). Read the email thread to know how they got the link.
- **Mobile:** ~87% of Clarity sessions are desktop. `/book` is fast. Turnstile JS errors block nothing.
- **Mentees book on the Growth Audit link.** Count by form answers, not title. Mentoring has its own Cal.com event (`Mentoring | …`).

## Next candidates (re-rank Mondays)

1. Trustpilot reply: DONE 2026-10-21 (Daniel rewrote it; live, verified on uk.trustpilot.com).
2. `/pricing` meta description once its lock closes (10-25).
3. LinkedIn-to-site links: best-converting channel, tiny volume. Every link Daniel posts: `?utm_source=linkedin&utm_medium=social&utm_campaign=<yyyy-mm>-<post-slug>`, pointing at a proof page, not `/`.
4. ChatGPT referral drop: answered run 33 (not access; fewer asks, few click-throughs). Recheck AI Crawl Control 30d on 11-05.
5. `email / signature` UTM: 0 sessions 10-15 to 10-18; recheck 10-26.

## Open asks to Daniel

- **(2026-10-21) GoodFirms** lists WSS as founded 2019; the site, Clutch and Crunchbase say 2016. Not signed in, so Daniel fixes it.

- **(2026-10-21) Repo is public.** Growth-bot notes name bookers and their form answers. Daniel is making the repo private (2026-10-21). After that, unauthenticated `git clone` fails: the bots need an authenticated route (GitHub connector reads, or `gh` with access), and Cloudflare Pages' GitHub app must have access to the repo. Until it's private, don't add booker names or form answers to repo files.
- **(2026-10-12) DesignRush:** profile still shows 2019, $99/hr, PPC/SEO. The account exists and needs a password (checked 2026-10-21), so Daniel logs in. Copy in `seo-bot/outreach/2026-10-10-run31.md`. GoodFirms (founded 2019) is not signed in either.
- **(2026-10-12) Facebook page:** contact email `hello@` and the "Growth Marketing for Startups" cover. Save was blocked by a permission check.
- **(2026-10-12) Instagram bio link:** needs Daniel's phone.

## Access notes

- **WSS Search Analytics connector** (GA4 property `259840282`, GSC `sc-domain:wescalestartups.com`, `account_id: google`) is absent at run start most days. Try `+WSS_Search_Analytics` in ToolSearch; if missing, use Chrome.
- **GA4 in Claude in Chrome:** `authuser=2`, account `a161039443p259840282`. Events: `r=top-events`; Pages: `r=all-pages-and-screens` (switch the Event count "All events" button to one event); Traffic: `r=lifecycle-traffic-acquisition-v2`. Rows: add `params=_r.explorerCard..rowsPerPage%3D100`. Date URL params bounce; use the date picker's Compare toggle ("Previous period (match day of week)"). Source × landing page: switch the table's primary dimension to Session source/medium, add secondary "Landing page + query string", read rows with JS (`document.querySelectorAll('tr')`).
- **GSC in Chrome:** `/u/2/`, URL filters work (`query=!<exact>`, `query=*<contains>`, `page=*<fragment>`, `breakdown=`). `get_page_text` is denied there since 10-19: take screenshots.
- **Bing WMT in Chrome** is signed in; AI Performance at `bing.com/webmasters/aiperformance?siteUrl=https://wescalestartups.com/`.
- **Cloudflare dashboard** in Claude in Chrome is signed in (account `2f53f880d2dd5bf1dc904eabb154f2a7`). AI Crawl Control: `/wescalestartups.com/ai/metrics?crawler=ChatGPT-User&time-window=43200` (30d). Read only; don't change settings.
- **Browser pane (built-in)** was signed out of Google and ChatGPT on 10-22; use Claude in Chrome for GA4.
- **Clarity** via the browser pane, project `wkannkoxst` (heatmap URL pattern in git history, run 12). Read click lists with JS.
- **Calendar:** `search_events` "Growth Audit We Scale Startups" returns every Cal.com booking with form answers; results are large, so save and filter with `jq` on `.created`.
- **Gmail booking notices:** search `in:anywhere` (they land in Trash). `create_draft` works, including replies.
- **GA4 events:** `booking_complete` (page view of `/book/thanks`) is the completed-booking key event from 2026-10-06. `book_call` counts clicks on `/book` or Cal.com links, not bookings. Per-CTA `cta_click` with `cta_label` is clean from 2026-09-26 only.
- **Repo:** `DanielJohnsonXYZ/wescalestartups-site`, deployed to Cloudflare Pages from `main`. Clone over HTTPS to read; push through the GitHub connector (git push is refused by the proxy), all related files in one commit. Headless Playwright: `waitUntil: 'load'` and `executablePath: '/opt/pw-browsers/chromium'`.
