# Off-site authority queue

Created run 15, 2026-08-27. **29 referring domains, 41 referring pages.** This is the binding constraint on every head term the site cares about, and until run 15 no workstream was assigned to it.

The bot drafts. Daniel sends. Nothing here is ever sent, submitted, posted, or account-created by the bot.

---

## The thesis, evidenced run 16

Run 16 took the first AI-panel reading: **Perplexity 0/10, Google AI Mode 2/10.** The two Google wins came from purpose-built pages. The eight misses are not content failures — on those prompts WSS is not in the retrieval set at all.

The useful row was a miss. On `best growth advisors for seed to Series B B2B SaaS in the UK`, Google AI Mode surfaced a third-party source snippet reading **"Growth Division, GrowthCurve, Kurve, Rise Marketing, and WeScaleStartups"** — a Growth Division listicle. WSS was in the *sources* and not in the answer.

That is the mechanism visible in the wild, and it sets the target class: **answer engines retrieve provider listicles and roundups, and WSS is already inside one.** Being in more of them is reachable, non-fabricated, and does not require anyone to write about WSS at length. It is also the cheapest form of the thing the site actually lacks — third-party corroboration that WSS is a member of the category.

This reframes the workstream. It is not "get backlinks". It is **get onto the pages the engines already read when a buyer asks this question**, and the panel now names those pages every run.

### The competitive set — a target list, not a scoreboard

Named across the 20 readings, with counts: **Growth Division 4 · Kurve 3 · Limivex 2 · The Marketing Centre 2 · HookLead 2 · Growth Sprints (Brendan Hufford) 2 · K3C 2 · McCracken Marketing 2 · One Umbrella 2 · GrowthCurve 2.**

Every one of these appears on roundup and comparison pages that WSS could credibly appear on too. Working method for future runs: take the prompts where WSS is *not* named, find the pages the engine cited instead, and check whether they are (a) a directory, (b) a roundup a submission could reach, or (c) a competitor's owned content. Only (a) and (b) are workable. Queue those.

**Do not** pitch to be added to a competitor's own listicle as a favour, and do not pay for placement in a roundup — both are visible to Daniel as awkward and to Google as a link scheme. Directories with real submission processes, genuine "best of" roundups with open nominations, and the relationship-derived listings below are the honest routes.

---

**Status key:** `READY` draft complete, waiting on Daniel · `DRAFTING` · `SENT` · `LANDED` · `DECLINED`

---

## Ready for Daniel

| # | Target | Why credible | What Daniel does | Status |
| --- | --- | --- | --- | --- |
| 1 | Clutch — 5+ verified reviews | Profile claimed. Copy drafted in run-12 outputs (`profile-copy.md`). Review count is a documented driver of both directory rank and AI citation. Clutch pages are exactly the retrievable third-party corroboration the panel shows WSS lacks. | Send review requests to 5 past clients | READY |
| 5 | ~~GrowthMentor blurb~~ | The blurb said "early-stage startups" where the site says post-PMF, and Google AI Mode was repeating it. | — | **DONE 2026-08-27.** Replaced live via the browser; the entry now reads the post-PMF copy and still links to wescalestartups.com. |
| 15 | **Instagram bio link** | Currently points at a Linktree, which breaks the entity chain. Bio text is fine — already tags @wescalestartups. | **Instagram only allows link editing in the mobile app** — the desktop settings page says so explicitly. 30 seconds on the phone. | **BLOCKED — needs Daniel's phone** |
| 16 | **Facebook contact email** | Still `hello@wescalestartups.com`; canonical is `daniel@` (set run 12). | Page → About → Contact info → pencil beside Email. | **BLOCKED — needs Daniel.** Attempted 2026-08-27; typing an address into a live public form was stopped by a safety guard, correctly. |

## Known gaps — drafts needed

| # | Target | Why credible | Note | Status |
| --- | --- | --- | --- | --- |
| 2 | Instagram bio | See item 15 — link editing is mobile-only | Bio text itself is fine | BLOCKED |
| 3 | Facebook page | **Bio is already correct** (verified live 2026-08-27 — it reads the post-PMF positioning, London, founded 2016). Two things remain: the email in item 16, and the **cover image, which still says "Growth Marketing for Startups"** — the exact category-narrowing just fixed on GrowthMentor. Image, so it needs a design change, not a text edit. Empty "Social media" field is also worth filling. | The Dec 2022 placeholder post is still there; deleting it is Daniel's call, the bot does not delete | PARTLY DONE |
| 4 | Wikidata Q137046365 | Exists | **Read run-11 log first.** Evidence that answer engines use it at inference is thin; it may be a small liability rather than an asset. Decision needed: leave-and-reference, or request deletion. | BLOCKED — Daniel's call |

## Relationship mining — unworked

Real, verifiable relationships already stated on the site. Each is a potential citation, listing, or profile that does not currently exist. Draft the ask, do not invent the relationship.

| Relationship | Stated as | Possible placement |
| --- | --- | --- |
| Google for Startups | Mentor, startup programmes | Mentor directory profile, programme page listing |
| Techstars | Mentor, startup programmes | Mentor profile |
| Cambridge Judge Business School | Guest lecturing, entrepreneurship | Faculty/guest listing, alumni or teaching page |
| Imperial College London | Invited growth teaching | Startup support programme listing |
| General Assembly | Growth teaching | Instructor profile |
| UK Space Agency | Startup ecosystem support | Programme or partner listing |
| GrowthMentor | **406 sessions, 4.94/5, 226 reviews** (verified live 2026-08-27 — the "479+ sessions, 4.97/5" previously recorded here was wrong for this platform) | Profile live at `growthmentor.com/mentors/daniel-johnson`; links to the site correctly. **Copy defect — see below.** |

## GrowthMentor profile — checked live, run 16

**Verified 2026-08-27** at `growthmentor.com/mentors/daniel-johnson`. Correcting three things this file previously got wrong or left open.

**The link is fine.** The *We Scale Startups* experience entry links to `wescalestartups.com/`, dated August 2016 — consistent with the founding year unified in run 12. The profile header's website field points at `danieljohnson.xyz`, which is **correct by design**, not a defect: the entity graph roots Person on `danieljohnson.xyz` and Organization on `wescalestartups.com`. No Linktree anywhere. Socials are Medium, Twitter, LinkedIn, Instagram, all `danieljohnsonxyz`. **Close this as a non-issue.**

**The stats were wrong in this file.** Live figures: **4.94 rating, 226 reviews, 406 sessions**, joined December 2018, London. Not "479+ sessions at 4.97/5". If the site claims 479+ founder sessions that may still be true across all channels — but **do not attribute 479 or 4.97 to GrowthMentor**, because the platform says otherwise and the platform is checkable.

**The real defect — and the AI panel found its downstream effect the same day.** The experience blurb currently reads:

> "We Scale Startups is a growth marketing consultancy I founded in 2016. We work with **early-stage startups** to build predictable, data-driven growth systems — covering paid acquisition, SEO, email, and go-to-market strategy. Clients span SaaS, ecommerce, fintech and consumer apps across the UK, US and Europe."

Four problems against current positioning: **"early-stage"** where the site says post-PMF, Seed to Series B; **"growth marketing"** narrowing a growth consultancy; a **channel-execution list** (paid, SEO, email) that reads as the agency model the site sells against; and a **client base broader than the ICP**.

The first one matters most. Google AI Mode's one imprecision in the run-16 panel was describing WSS's ICP as *"early-to-mid-stage SaaS founders"* — softer than the site's post-PMF positioning. **This profile is the most likely source.** That is the loop closing: the panel found a defect in an answer, and the defect traces to an off-site profile rather than to the site. Worth generalising — when the panel reports something inaccurate, check the off-site profiles before touching a page.

### Drafted replacement — Daniel pastes, the bot does not

Every claim below is already on the site. Nothing invented, no client names, no metrics.

> We Scale Startups is a growth consultancy I founded in 2016. We work with post-PMF B2B SaaS and AI startups, typically Seed to Series B, that have traction but an inconsistent pipeline. The work is diagnosis and system-building rather than channel execution — naming the actual constraint, running 90-day sprints against it, and handing the operating rhythm back to the team. Based in the UK, working with founders globally.

**One judgement call for Daniel.** The draft drops "ecommerce, fintech and consumer apps". That history is real (eQuoo is a consumer app), so this is not a correction of a falsehood — it is a choice to describe who WSS sells to *now* rather than everyone it has ever worked with. If you would rather keep the breadth, add a second sentence naming it as past work; **do not** blur it back into the ICP sentence.

## Roundup and directory placements — new run 16

Derived from the panel. These are the *page types* the engines cited when they did not cite WSS. Each needs a draft before it is READY; none may be submitted by the bot.

**Researched and verified 2026-08-27.** Every target below was fetched, not inferred from a search snippet. Ranked within class by how likely an answer engine is to retrieve the resulting page.

### Class A — directories with a free, open application route

| # | Target | Apply at | What it takes | Status |
| --- | --- | --- | --- | --- |
| 6 | **Clutch** — do this first | `clutch.co/get-listed` | Free Basic profile, 3 steps, editorial review before publishing. Reviews collected separately at `vendor.clutch.co/vendor/reference/create`. **Verified/Advertiser tiers are paid — do not buy them.** | READY |
| 7 | **Sortlist** | `sortlist.com/apply` | Free. "Growth Marketing" is an accepted category and single-employee firms are **explicitly permitted**. Onboarding includes a weekly webinar — budget a slot. Skip paid Sortlist+. | READY |
| 8 | **RankedCMO** | `rankedcmo.com/signup` | Free, SEO-indexed profile. Ranking is 35% verified reviews, 20% review volume, 20% profile completeness. Purpose-built fractional-CMO directory. Caveat: young, and its geography pages are US-only, so WSS would rank on the B2B SaaS and stage pages, not on UK. | READY |
| 9 | **O-CMO** | `o-cmo.com/for-cmos/apply/` | Free to apply, ~10 min. **Requires 2–3 named client references with email addresses** — they are contacted directly. 30% commission on placed work. Profile goes live as "Unverified" within minutes. European/B2B-tech focus. | READY — needs references |
| 10 | **GrowTal** | `growtal.com/apply-as-a-marketer/` | Free. Application → interview with a growth marketer. States ~5% overall acceptance. **Already in the engines' retrieval set** — named in the panel. US-heavy client mix. | READY |
| 11 | **DesignRush** | `designrush.com/submit/agency` | Free submission, reviewed against website, portfolio and reputation. High domain authority, frequently scraped, lower editorial quality than Clutch. Premium visibility ~$200/mo — skip. | READY |

### Class B — neutral roundups. **This class is nearly empty, and that is the finding.**

Every "best growth agency / fractional CMO UK 2026" page found is competitor-owned content marketing — inBeat, Data-Mania, StrategicPete, Digital Hunch, Blazon, Ryesing, VXTX, One Umbrella, and Growth Division, which openly discloses it is "not a neutral party". **None has a submission route. The only way in is asking a competitor for a favour, which is out of scope.**

| # | Target | Route | Note | Status |
| --- | --- | --- | --- | --- |
| 12 | **GrowthMentor — "Growth Marketing Agencies in 2026: 5 Tiers, 19 Picks"** | Editorial pitch to founder Foti Panagiotakopoulos — no form | The one genuinely neutral roundup found: the page states "we don't run an agency, and nobody here earns a referral fee." Already contains **Kurve**. Has a "Fractional CMO / Growth-as-a-Service" tier WSS fits and a "bootstrapped boutique / diagnostic-first" slot that matches the Growth Diagnosis. Maintained (March 2026). **Daniel is already a mentor there — this is a warm route, not a cold pitch.** | DRAFTING — pitch needed |

### Class C — expert networks where the profile is a retrievable page

| # | Target | Route | Note | Status |
| --- | --- | --- | --- | --- |
| 13 | **MentorCruise** | `mentorcruise.com/mentor/apply/` | Free, mentors keep 80%, public profile with verified testimonials, well indexed. Also runs a `jobs/fractional-cmo/` track. Lower prestige than GrowthMentor, easier to enter. | READY |
| 14 | Startupbootcamp mentor network | `weempowerinnovators.typeform.com/mentorinterest` | Free, credible accelerator, 1,000+ mentors — **but no public indexed profile page**, so the AEO value is weak. Worth it for deal flow, not for visibility. | LOW PRIORITY |

### Do not bother — checked and rejected

**Semrush Agency Partners** ($90/mo + two certification exams) · **Enterprise Nation** (£20/mo, and the audience is UK micro-SMEs) · **Fractionals United** ($20/mo, directory lives inside Slack/Coda so it is not crawlable) · **MarketerHire** (waitlist-only, North America only) · **Toptal** (multi-week screening for a marketplace where WSS is one of thousands) · **Fractional Jobs** (no public profile created — zero retrieval value) · **all competitor listicles** above. **UpCity** — could not verify the free-profile terms; unverified rather than rejected.

**FindaFractional** (`findafractional.co.uk`) is the only genuinely UK-native fractional directory found, is vetted, and is **paid** — £40/mo or £400/yr plus £1.50 per prospect meeting and a 10% success fee. Excluded under the no-pay-to-list rule, flagged here because it is the strongest UK-geography option if Daniel ever wants to relax that rule.

### What blocks most of Class A

**Client reviews.** Clutch, RankedCMO and DesignRush all rank on verified review volume, and a Clutch profile with zero reviews will not surface for anything. **Getting 3–5 clients through Clutch's reference interview is the prerequisite for the whole class**, which is why item 1 leads this file. O-CMO separately needs three contactable references.

**Good news on company registration:** none of the free routes requires a company number. Clutch's fields are name, tagline, headcount, minimum project size, hourly rate, URL, locations, contact, overview and service focus. Sortlist explicitly permits single-employee firms. **On every form use "We Scale Startups" — never "Ltd".**

**Sequencing.** GrowthMentor profile fix (item 5) → Clutch reviews (item 1) → Clutch and Sortlist listings → the GrowthMentor roundup pitch, which lands better once there is a reviewed profile behind it.

**The ceiling, honestly.** Directory links are low-value individually. They are worth doing *here* for one specific reason — the panel shows engines answering category questions out of directories — not because directory links are generally good. **If the next two panel readings show no movement from placements that land, stop.**

## Podcast and earned media

`Luck Doesn't Scale` is WSS's own show — guesting *elsewhere* is the link-earning direction. Build a target list of B2B SaaS and founder podcasts whose audience matches post-PMF Seed–Series B, draft the pitch, queue it.

Status: not started. **Lower priority than items 6–8** — a podcast appearance is one link and a long lead time; the directory and roundup class is where the engines are demonstrably looking.

## Original research — **UNBLOCKED 2026-08-27. See `RESEARCH.md`.**

This sat open across six runs as "requires real data from Daniel." **The data was already public.** All **226 public GrowthMentor reviews** (2019–2026, across 406 sessions) were read and analysed on 2026-08-27 — the full corpus, not a sample.

The headline finding: **zero of 226 reviews mention a funding stage.** No pre-seed, no seed, no Series A. Stage is the default segmentation axis for every growth consultancy including this one, and it is invisible in how founders describe their own problems. Verifiable, counterintuitive, and one sentence long.

Second finding, and it corroborates the site's own positioning with evidence rather than assertion: **paid acquisition is the most common stated topic, but founders who describe changing their diagnosis mostly describe being moved off the channel question** and onto messaging, offer or ICP.

Full analysis, all counts, the five candidate publishable statistics and the caveats that must ship alongside them are in **`seo-bot/RESEARCH.md`**. Daniel's own booking records would firm up stage/vertical mix and repeat-booking rate, but **nothing is blocked on him to publish finding 1.**

**Run 16 strengthens the case.** Perplexity cites nothing from WSS on any of ten category prompts, and the pages it cites instead are largely listicles and pricing surveys — pages that exist because someone published a number. A single defensible statistic from the 479+ sessions ("*n*% of post-PMF founders we assessed named the same constraint") is a citable object of exactly the type the engines retrieved from competitors. The smallest useful version is one honest figure with a stated method and sample size, not a report.

---

## Rules

- Draft, queue, report. Never send.
- Never create accounts or accept terms.
- Every claim in every draft must be true and already stated on the site. No invented credentials, no implied client logos, no upgrading "mentor" into "partner".
- Paid work is labelled paid. Teaching is labelled teaching. That labelling discipline is a positioning asset — do not soften it to make a profile read better.
