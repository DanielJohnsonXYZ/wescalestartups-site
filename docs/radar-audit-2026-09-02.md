# Radar audit — 2 September 2026

Scope: `radar.wescalestartups.com` (the Radar marketing site and read-only fictional demo), its source repository `DanielJohnsonXYZ/client-health-radar` (`main` @ `32ae20c`), the Supabase schema and policies in that repo, the Vercel deployment, the GitHub CI, and the open pull requests. Evidence comes from a full read of `src/` and `supabase/`, `npm run verify` and `npm audit` run locally, Lighthouse 12 (mobile) against a local production build, HTTP probes of the live site, and online research against current Next.js, Vercel, Supabase, WCAG and ICO sources.

Companion PR with the code fixes: [DanielJohnsonXYZ/client-health-radar#27](https://github.com/DanielJohnsonXYZ/client-health-radar/pull/27) (draft). See "What was changed" at the end.

---

## 1. Headline

The site is well built. Static Next.js 16 on Vercel, strict CSP, HSTS preload, self-hosted fonts, no third-party scripts, RLS-backed Supabase, a CI gate that runs lint, typecheck, unit tests, build, a dependency audit and SQL engine assertions. Lighthouse on the production build scores 100 for best practices and SEO on every page tested, and 89–98 for performance. That is above the bar for a pre-revenue pilot site.

The problems are not in the craft. They are in three places:

1. **The product is not on `main`.** The live MVP (invite-only auth, Gmail ingestion, AI analysis engine, real dashboard) has sat in draft PR #23 since 12 August. `main` moved on with a demo redesign on 17 August, so the PR now conflicts. Worse, the PR's four migrations were already applied to the live Supabase project, so the live database no longer matches the migrations on `main` (the 15-minute analysis cron is unscheduled live but scheduled in the repo; `pilot_ends_at` defaults differ).
2. **The trust pages say things that are not true.** The privacy notice says the site "has no user accounts and no forms" and that "joining the pilot starts with an email to us"; the security page says "there is no login, no database and no API". In fact the pilot form writes directly from the browser to a Supabase Postgres table, Supabase is therefore a live sub-processor of applicants' personal data, and the form has no privacy link at the point of collection. For a product whose pitch is "your client conversations stay yours", this is the finding most likely to cost a pilot.
3. **The demo contradicts itself.** The design notes say "every number shown twice must come from one source". Today BrightPath renews in "six weeks" (homepage), "41 days" (notification bell) and "61 days" (client page); its reporting concern has been open for "23 days", "11 days" and "18 days" depending on the screen; the workspace is "Agency Co." in the hero and "Northline Studio" in the demo; the drafted outreach email says "Looking forward to it," twice. A buyer who is told to trust Radar's arithmetic will notice.

Below that: an unpatched Next.js minor line, a dependency audit that will fail the next CI run, a set of WCAG 2.2 contrast and labelling failures, broken in-page anchors on every page except the homepage, and zero analytics on the only conversion event the pilot has.

---

## 2. Scorecard

| Area | Score | Notes |
| --- | --- | --- |
| Security headers and CSP | Good | CSP, HSTS preload, XFO, nosniff, referrer and permissions policies all present. `script-src 'unsafe-inline'` is the documented Next.js trade-off for static pages. |
| Dependencies | Needs action | Next 16.2.12 is behind the 25 Aug 2026 security release (16.3.3+). `npm audit` reports one high (browserslist) that will fail the CI audit step. |
| Data protection / trust copy | Failing | Privacy and security pages contradict the pilot form's actual data flow. No privacy link on the form. |
| Accessibility (Lighthouse, mobile) | 96 / 85 / 91 | Home / Demo / Client. 23 contrast failures on the homepage; unlabelled selects; unnamed button; mismatched link name; no reduced-motion handling. |
| Performance (Lighthouse, mobile, local build) | 89 / 98 / 98 | Homepage LCP 3.2 s throttled, driven by 1.2 s element render delay (hydration). 262 KB compressed JS across 10 chunks for a static marketing page; 142 KB HTML. |
| SEO | 100 | Canonicals, sitemap, robots, OG image all correct. `SoftwareApplication` JSON-LD will not earn a rich result (no `offers`/rating) and may generate Search Console warnings. |
| Demo data integrity | Failing | Nine cross-screen contradictions (see §4). |
| Code quality | Good | Small, typed, consistent. One real bug (outreach sign-off never rendered). |
| Tests and CI | Fair | Content-consistency and build-info unit tests plus SQL engine assertions. No component, a11y or e2e tests. `npm audit` unpinned; Supabase CLI `version: latest`. |
| Infrastructure | Fair | Fully static on Vercel `lhr1`; region pin is irrelevant to static output. Live DB has drifted from repo migrations. Supabase tier unknown (free tier pauses after 7 idle days, which would break the form). |
| Repository hygiene | Poor | 26 remote branches, 4 open draft PRs of which 3 are superseded homepage redesigns; `README.md` and `.env.example` describe an app that is not on `main` (8 env vars referenced by nothing). |
| Observability | Missing | No analytics, no error boundaries, no error monitoring, no form-conversion data. |

---

## 3. Findings by priority

### P0 — fix before the next pilot conversation

**P0.1 Privacy and security pages are inaccurate.**
`src/app/privacy/page.tsx` says the site "has no user accounts and no forms" and that pilot enquiries start by email. `src/app/security/page.tsx` says "no login, no database and no API". `src/components/marketing/pilot-form.tsx` inserts name, work email, company and free text into `public.pilot_requests` via the Supabase Data API from the browser. UK GDPR Article 13 requires the privacy information at the point of collection; the form has no link to it. The privacy pack's sub-processor table already lists Supabase and Vercel, so the fix is copy, not architecture.
*Fix (done in PR):* rewrite both pages to describe the real flow (form → Supabase, London region, 90-day retention for applications that do not proceed, per `docs/pilot-privacy-pack/retention-and-rights.md`), and add a privacy link beside the submit button.

**P0.2 Next.js is on an unpatched minor line.**
`next@16.2.12` (25 Jul 2026). The August 2026 security release shipped 16.3.3 with two criticals (AVIF RCE in the image optimiser via `sharp`/libheif; Windows RCE) and no 16.2.x backport; 16.2 is no longer active LTS. The practical exposure here is low (the site does not use `next/image` and has no AVIF assets), but running an end-of-life minor is not a defensible posture for a security-led product.
*Fix (done in PR):* upgrade to `next@16.3.4`, `eslint-config-next@16.3.4`, and refresh `@supabase/supabase-js`, `lucide-react`, `react`, `react-dom`. Build, lint, typecheck and tests pass.

**P0.3 `npm audit` will fail the next CI run.**
`browserslist <=4.28.6` carries a high advisory (GHSA-c83g-rgw3-j3cx, GHSA-73wf-gq98-2v4g). The `verify` workflow runs bare `npm audit`, which fails on any advisory of any severity.
*Fix (done in PR):* override to a patched `browserslist`; change the CI step to `npm audit --audit-level=high` so low/moderate advisories in dev tooling do not block deploys.

**P0.4 Decide what to do with PR #23.**
Draft PR #23 (56 files, +5,760) is the actual product: invite-only magic-link auth, Gmail read-only OAuth ingestion filtered by client domain, provider-agnostic LLM engine (DeepSeek by default), sticky recommendations keyed on `dedup_key`, 69 engine tests, error and loading boundaries. It was based on `256476f` and now conflicts with `main` in `marketing-sections.tsx` (one file, small). Its migrations are already live. Two decisions are outstanding, both flagged in the PR body:
- The privacy pack and site say message content never reaches an external AI provider. With DeepSeek that becomes an international transfer to the PRC with no UK adequacy decision (IDTA plus transfer risk assessment). Either switch the default provider to a UK/EU-adequate one with zero-retention terms, or update the DPA, sub-processor list and site before any pilot data flows.
- Google's restricted `gmail.readonly` scope needs CASA Tier 2 verification (4–8 weeks) before leaving testing mode; refresh tokens expire every 7 days until then.
*Recommendation:* rebase PR #23 onto `main` this week (the conflict is trivial), keep it behind environment variables so the public site is unaffected, and merge. Leaving it open guarantees a bigger conflict later and keeps `main`'s migrations out of sync with production. Then close PRs #11, #17 and #20 (superseded homepage redesigns) and prune the 20+ dead branches.

### P1 — fix this sprint

**P1.1 Demo data contradictions.** See §4 for the full list. *Fix (done in PR):* every homepage and topbar number that also appears in the demo is now derived from `demo-content.ts`; the outreach sign-off bug is fixed; a unit test locks the cross-surface consistency.

**P1.2 Accessibility failures (WCAG 2.2 AA).**
- Text contrast: `--color-ink-faint #8b98b3` is 2.9:1 on white (used for ~40 captions at 11–12.5 px); `--color-good #12965a` is 3.79:1 (used for opportunity amounts and "Connected"); `--color-warn-icon #f79009` is 2.35:1 and is used as *text* in the stat card. Lighthouse flags 23 elements on the homepage, 12 on `/demo`, 8 on the client page.
- Two `<select>` filters on `/demo` have no accessible name; the sidebar workspace button has no name; the logo link's `aria-label="Radar home"` does not contain its visible text ("Radar by We Scale Startups"), failing label-in-name.
- Notification and help dropdowns have no `aria-expanded`, do not close on Escape or outside click.
- Form inputs use `focus:outline-none` and rely on a 1 px border colour change as the focus indicator (fails 2.4.11/2.4.13 intent).
- Hover lifts and the sidebar width transition ignore `prefers-reduced-motion`.
- The "Demo data" badge in the topbar is `hidden lg:inline-flex`, so phone and tablet visitors never see the fictional-data label the footer relies on.
*Fix (done in PR):* darker `ink-faint` and `good` tokens that pass 4.5:1 on both page and white; `warn` used for text; labels and names added; `aria-expanded`, Escape and outside-click handling; visible focus ring; `motion-reduce` on transitions; badge visible on all breakpoints.

**P1.3 Broken in-page anchors.** `SiteHeader` links "Product" to `#product` and "How it works" to `#how-it-works`; the footer does the same. On `/privacy`, `/security`, `/version` and the demo these resolve to non-existent anchors on the current page. (The same bug was fixed for `#pilot` in PR #22 but not for the other two.) *Fix (done in PR):* `/#product`, `/#how-it-works`.

**P1.4 No observability on the only conversion.** There is no analytics, no error boundary, no error monitoring. You cannot tell how many people reach the pilot form, start it, or hit the "already applied" or generic error path. Vercel Web Analytics is cookieless, first-party (`/_vercel/insights`), allowed by the existing CSP, and already covered by the privacy pack's Vercel entry ("content-free product analytics"). *Fix (done in PR):* `@vercel/analytics` added behind `NEXT_PUBLIC_ENABLE_ANALYTICS=1`, with content-free custom events for form submit, success and each error branch; `error.tsx` and `global-error.tsx` added. **Enable Web Analytics in the Vercel project settings first, then set the variable and redeploy**; until both are done the component is not rendered, so nothing 404s.

### P2 — schedule

**P2.1 Form abuse protection is client-side.** The `request_fingerprint` is generated in `localStorage`, so the 1-hour browser throttle is trivially reset; the 24-hour email dedupe only stops repeats of the same address. There is no IP throttle, no CAPTCHA, and because the POST goes straight to `*.supabase.co`, Vercel's WAF never sees it. `anon` also holds an unbounded insert grant on `product_events` for `pilot_application_submitted`, which nothing on `main` uses. Supabase's own guidance is that RLS is not a rate limiter and that per-IP limits belong in a `pgrst.db_pre_request` hook or an application layer. *Recommendation:* when the form starts receiving spam, move the insert into a Next.js route handler (so Vercel WAF rate limiting and Turnstile apply) or add a `db_pre_request` per-IP limit; add a CHECK constraint on email format; drop the unused `anon` grant on `product_events`.

**P2.2 CI hardening.** Pin `supabase/setup-cli` to a version rather than `latest`; add `engines.node` and `.nvmrc`; add Dependabot for npm and Actions; add a Lighthouse CI or `axe` step against the built site with an accessibility budget so P1.2 does not regress. *Partly done in PR* (engines, `.nvmrc`, Dependabot, audit level).

**P2.3 Structured data.** `SoftwareApplication` without `offers` and `aggregateRating`/`review` is ineligible for Google's rich result and produces "missing field" warnings. Do not fabricate ratings. *Fix (done in PR):* replaced with `WebSite` + `Organization` (+ `Brand`), which is what the page actually is; re-add `SoftwareApplication` when there is real pricing and reviews.

**P2.4 Small platform items.** Add `/.well-known/security.txt` (the security page invites vulnerability reports; RFC 9116 makes them findable) — *done*. Add a `Cross-Origin-Opener-Policy: same-origin` header — *done*. The manifest declares no icons, so it does not qualify as installable; either add an SVG icon or drop `display: standalone` — *icon added*. The live site returns `access-control-allow-origin: *` on every response; this is not set in `next.config.ts` or `vercel.json`, so it is coming from Vercel project configuration — verify it is intentional (harmless for public static pages, but it should not carry over to the authenticated app). HSTS `preload` is declared, but the preload list requires the apex `wescalestartups.com` to be submitted; check https://hstspreload.org.

**P2.5 Performance.** Already good. The homepage's LCP is the H1, delayed ~1.2 s by hydration of the whole marketing tree. `PilotForm` is the only component on the homepage that needs to be a client component; `SiteHeader`, `Hero` and the sections already are server components, so the remaining cost is React itself plus the demo chunks pulled in by `HeroProductMock`'s shared imports. Worth ~10 points on mobile, not urgent. `lucide-react` is already in Next's default `optimizePackageImports`; the React Compiler is not worth enabling for this page count.

**P2.6 Infrastructure checks.**
- Confirm the Supabase project tier. Free projects pause after 7 days of low activity; a paused project turns every pilot application into the generic error message. Pro does not pause.
- Run the Supabase security and performance advisors after any migration (the README asks for it; nothing enforces it).
- `vercel.json` pins functions to `lhr1`; the only function is the OG image. Fine, but the DPA's "functions pinned to London" claim should be re-checked when PR #23's API routes land.
- The `radar-continuous-analysis` cron (every 15 min) is scheduled in repo migrations and unscheduled in production per PR #23. Reconcile by merging PR #23 or by adding a migration that records the live state.

**P2.7 Repository hygiene.** `README.md` describes continuous analysis, RLS-isolated workspaces and a deterministic engine that are not reachable from anything on `main`. `.env.example` lists `INBOUND_SECRET`, `CHANNEL_INGEST_TOKEN`, `SLACK_SIGNING_SECRET`, `RESEND_*`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET` and `AI_*`, none of which any file on `main` reads. `REVIEW.md` (25 July) is a good document but half its findings are now addressed in PR #23 and it does not say so. Left untouched in the PR to avoid conflicting with PR #23, which rewrites `.env.example`; fix when that merges.

---

## 4. Demo data contradictions (evidence)

| What | Homepage | Demo topbar / sidebar | Demo client / insight |
| --- | --- | --- | --- |
| BrightPath renewal horizon | "6 weeks to renew", "Contract renews in six weeks", "six weeks left to renew" | Notification: "Renewal is now 41 days away" | "30 Oct 2026 · 61 days", "Renewal is in 61 days" |
| BrightPath reporting concern age | "unresolved for 23 days" | — | "needs client input for 11 days"; insight: "open for 18 days", "2 open items aging over 14 days" |
| BrightPath money at risk | "£5,000 MRR at risk" (hero, evidence card) | — | "£3,000 at risk, 60% probability" |
| Northstar opportunity | "£2,000–£4,000 opportunity" | — | "£6,000 opportunity" |
| Motive Labs commitments | "Three agreed actions", "3 overdue" | "Three actions still need follow-up" | "2 commitments overdue" |
| Workspace name | "Agency Co." | "Northline Studio" (topbar), "Agency Co." (sidebar avatar) | "Agency Co. Slack" |
| Sarah Mitchell's role | "Agency Co." (hero mock) | "Client Services Director" (sidebar) | "Account Director" (team list, KPI card) |
| Outreach email | — | — | Body ends "Looking forward to it,"; `signoff` field also "Looking forward to it,"; `OutreachCard` never renders `signoff`, so template insights lose their "Best," and BrightPath's works only because the sign-off was pasted into the body |
| "View client profile" link | — | — | Points at `/demo/clients` (the index), not the profile |

Some of these can be argued as different quantities (£5k retainer vs £3k probability-weighted risk). The demo does not explain the difference, so the visitor experiences it as an error. The PR makes the homepage numbers derive from the same objects the demo renders, and adds a test.

---

## 5. Product and positioning notes (from research)

- **Interactive demo.** Navattic's 2026 dataset (40k demos): best completion at 1–6 steps, 2–4 "aha" moments, 66% of top demos ungated, multi-flow demos +48% completion, only 52% mobile-optimised. Radar's demo is ungated and looks real, but has no guided path: a first-time visitor lands on a 12-row table with nothing telling them what to click. Every "Connect", "Manage", "Schedule call" and quick-action button is dead. Recommendation: a four-stop guided flow (Today → BrightPath → Why Radar flagged it → Drafted outreach) as the default entry from the homepage, and a small toast ("This is a fictional workspace; connecting tools is part of the pilot") on dead buttons instead of silence.
- **Competitive frame.** Customer-success platforms (Vitally ~$300+/mo, Custify ~$399/mo, ChurnZero ~$849/mo plus onboarding, Planhat $15–60k/yr) price for SaaS CS teams, not 5–30-client agencies, and none of them read email for the operator. Agency ops tools (Productive.io, Bonsai) have shallow "client health" but no signal detection. The wedge is real. The pilot pricing in `onboarding-authority-checklist.md` (£750) is nowhere on the site; the homepage removed pricing on 7 August. Consider stating the founding-pilot price: the buyer is a business, and "apply" without a number reads as enterprise sales.
- **UK GDPR.** ICO monitoring guidance treats reading worker email content as high-risk processing requiring a DPIA and generally rules out consent (power imbalance) and often legitimate interests (expectation). Radar's privacy pack already has this right in draft form. The two things the pack does not yet cover are in PR #23: the external AI provider transfer, and Gmail OAuth token storage (unencrypted at rest, per the PR body). Both need to be closed before real data flows. The Data (Use and Access) Act 2025's "recognised legitimate interests" (in force 5 Feb 2026) do not cover this use.

---

## 6. Roadmap

**Week 1 (this PR + decisions).** Merge the fix PR. Enable Vercel Web Analytics. Decide the AI provider and DPA question for PR #23. Rebase and merge PR #23 behind env vars. Close PRs #11, #17, #20; delete merged/abandoned branches.

**Week 2.** Reconcile repo migrations with the live database (or just merge PR #23, which does it). Confirm Supabase tier. Update `README.md`, `.env.example`, `REVIEW.md`. Add guided demo flow and dead-button feedback.

**Week 3.** Route the pilot form through a route handler with Turnstile and Vercel WAF rate limiting once traffic warrants it. Lighthouse CI / axe in the workflow with an accessibility budget. Publish pilot pricing.

**Ongoing.** Monthly Next.js security releases are now pre-announced; Dependabot (added in the PR) will open the upgrade PRs. Keep `npm run verify` green and treat a red `db-tests` job as a product bug.

---

## 7. What was changed

Draft pull request [DanielJohnsonXYZ/client-health-radar#27](https://github.com/DanielJohnsonXYZ/client-health-radar/pull/27):

- Next.js 16.3.4 and eslint-config-next 16.3.4; react/react-dom 19.2.8; supabase-js 2.114; lucide-react 1.39; browserslist audit override.
- Privacy and security pages rewritten to match the real data flow; privacy link on the pilot form.
- Homepage and topbar numbers derived from `demo-content.ts`; `OutreachCard` renders `signoff`; BrightPath's duplicated sign-off removed; "View client profile" link fixed; cross-surface consistency test added.
- Accessibility: contrast-safe tokens, labelled selects and buttons, logo name, `aria-expanded` + Escape + outside-click on dropdowns, visible focus ring on inputs, `motion-reduce`, "Demo data" badge on all breakpoints.
- Header and footer anchors fixed for non-home pages.
- Vercel Web Analytics (behind `NEXT_PUBLIC_ENABLE_ANALYTICS=1`) with content-free form events; `error.tsx`, `global-error.tsx`.
- `security.txt`, COOP header, manifest icon, `WebSite`+`Organization` JSON-LD.
- CI: `npm audit --audit-level=high`, pinned Supabase CLI, `engines`/`.nvmrc`, Dependabot.

Validated with `npm run verify` (lint, typecheck, 18 tests, build) and `npm audit` (0 vulnerabilities) before pushing. Lighthouse (mobile, production build) before → after:

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| `/` | 89 → 95 | 96 → 96 | 100 → 100 | 100 |
| `/demo` | 98 → 97 | 85 → 100 | 100 → 100 | 100 |
| `/demo/clients/brightpath` | 98 → 96 | 91 → 96 | 100 → 100 | 100 |

The remaining accessibility deductions are the aria-hidden decorative avatars and hero-mock chips that axe still measures; the remaining performance gap is the homepage hydration cost noted in P2.5.
