# Radar: implementation brief for the remaining audit recommendations

Companion to `docs/radar-audit-2026-09-02.md`. Everything that could be fixed without a decision or a secret is already in [client-health-radar#27](https://github.com/DanielJohnsonXYZ/client-health-radar/pull/27). This brief covers what is left, written so each task can be handed to a cheaper model (or a contractor) as a self-contained prompt.

Repository: `DanielJohnsonXYZ/client-health-radar`. Quality gate for every task: `npm run verify` (lint, typecheck, tests, build) and, after a build, `npm run test:a11y`. Both must pass before a PR is opened. Do not touch `.env.example`, `README.md` or `REVIEW.md` in tasks 2–6; task 1 owns them.

## How to use this

Copy one task block into a fresh session with the repo checked out. Each block has: context, what to change, acceptance criteria, and how to verify. Tasks are independent unless stated. Keep PRs small and one task per PR.

---

## Task 1 — Rebase and merge the live MVP (PR #23) behind environment variables

**Needs Daniel first:** decide the AI provider. PR #23 defaults to DeepSeek, which sends client-message content to a PRC-based provider. Either (a) change the default to a UK/EU-adequate provider with zero-retention terms, or (b) keep DeepSeek and update `docs/pilot-privacy-pack/subprocessors-and-transfers.md`, the DPA draft, `/privacy` and `/security` to disclose it, including an IDTA and transfer risk assessment. Do not start the merge until one of those is chosen.

**Context.** PR #23 (`claude/mvp-audit-plan-65ngr4`, based on `256476f`) adds invite-only auth, Gmail ingestion, the LLM engine and the `/app` dashboard. `main` has since merged a demo redesign (`2b1baac`) and CI changes (`32ae20c`), and #27 adds audit fixes. A test merge of #23 into `main` conflicts only in `src/components/marketing/marketing-sections.tsx`. #23 also moves `src/components/demo/insight/*` to `src/components/insight/*`; git resolves that automatically but #27's edits to `insight-sections.tsx` (the `signoff` rendering in `OutreachCard`) must survive the move.

**Do.**
1. `git checkout claude/mvp-audit-plan-65ngr4 && git merge origin/main` (after #27 is merged). Resolve `marketing-sections.tsx` by keeping `main`'s version of every marketing section and re-applying only what #23 changed there (check `git diff 256476f claude/mvp-audit-plan-65ngr4 -- src/components/marketing/marketing-sections.tsx`).
2. Confirm `OutreachCard` in the moved `src/components/insight/insight-sections.tsx` still renders `insight.outreach.signoff` on its own line and includes it in the copied text.
3. Make sure nothing in the public site changes when the new env vars are absent: `/app`, `/login`, `/onboarding` and every `/api/*` route must return a clean 404 or 503, never a stack trace, when `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `ADMIN_API_SECRET`, `GOOGLE_CLIENT_ID/SECRET` and the AI key are unset.
4. Reconcile `supabase/migrations` with production: #23's four migrations are already applied live; verify with `supabase migration list` against the linked project and do not re-apply.
5. Update `README.md` and `.env.example` so they describe what is actually on `main` after the merge (which env vars exist, what each route does, how the cron routes are secured).
6. Run `npm run verify` and `npm run test:a11y`. Open the PR as a merge of #23, not a new PR, so its history and description are preserved.

**Acceptance.** `main` builds and deploys with no new env vars set and the public site is byte-for-byte unchanged in behaviour. With env vars set on a preview deployment, an invited user can sign in, connect Gmail in testing mode, and see the dashboard. `docs/pilot-privacy-pack/` names the chosen AI provider.

---

## Task 2 — Move the pilot form behind a route handler with Turnstile and rate limiting

**Context.** `src/components/marketing/pilot-form.tsx` inserts directly into `public.pilot_requests` from the browser using the publishable key. Abuse protection is a `localStorage` fingerprint (trivially reset) and a 24-hour per-email trigger in Postgres (`private.limit_pilot_requests`). Because the POST goes to `*.supabase.co`, Vercel's WAF never sees it. This is acceptable until the form receives spam; do this task when it does, or before any paid promotion of the site.

**Do.**
1. Add `src/app/api/pilot/route.ts` (POST only). It validates the body with the same rules as the RLS policy in `supabase/migrations/20260726002712_advisor_hardening.sql` (email 3–200 chars, `source` fixed to `https://radar.wescalestartups.com/#pilot`, fingerprint `^[0-9a-f]{64}$`), verifies a Cloudflare Turnstile token server-side against `https://challenges.cloudflare.com/turnstile/v0/siteverify` using `TURNSTILE_SECRET_KEY`, then inserts with the **secret** key (`SUPABASE_SECRET_KEY`, never exposed to the browser). Return 429 with the existing "already applied" message when Postgres raises `P0001`, 400 for validation, 503 if secrets are missing.
2. Change `PilotForm` to POST JSON to `/api/pilot` instead of calling Supabase. Load the Turnstile widget with `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer>` and add `https://challenges.cloudflare.com` to `script-src`, `frame-src` and `connect-src` in the CSP in `next.config.ts`. Remove `productConfig.supabaseUrl` from `connect-src` once nothing in the browser calls Supabase.
3. Keep the honeypot and the analytics `track()` calls exactly as they are.
4. In Vercel, add a WAF rate-limit rule on `POST /api/pilot` (for example 5 requests per IP per 10 minutes). Document it in `README.md` under Deployment.
5. Add a Postgres CHECK constraint on `pilot_requests.email` (`email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'`) as a new migration, and drop the unused `grant insert on public.product_events to anon` and its policy `"public pilot event insert"` unless Task 1 starts using it.
6. Update `/privacy` and `/security` copy: the form now goes through our server and Cloudflare Turnstile (add Cloudflare to the sub-processor list in `docs/pilot-privacy-pack/subprocessors-and-transfers.md`).

**Acceptance.** Submitting the form on a preview deployment creates a row; a second submission with the same email within 24 hours shows the "already applied" message; a request without a valid Turnstile token is rejected with 400; `npm run verify` and `npm run test:a11y` pass; the CSP still blocks every other third party.

---

## Task 3 — Guided path through the demo

**Context.** Navattic's 2026 data: interactive demos complete best at 1–6 steps with 2–4 "aha" moments; only 52% are mobile-optimised. Radar's demo is ungated and looks real but drops the visitor on a 12-row table with no suggested path. #27 already gives dead buttons a "demo only" toast; this task adds the path.

**Do.**
1. Add `?tour=1` support to `/demo`. When present (the homepage's "Explore the demo" and "Open the full demo" links should carry it), show a small, dismissible guide card pinned bottom-right (bottom-centre on phones) with four stops: (1) Today: "Start with what needs attention" → highlights the BrightPath row; (2) `/demo/clients/brightpath`: "See the whole relationship" → highlights the action banner; (3) same page, `#evidence`: "Every finding has receipts"; (4) `/demo/clients/brightpath/insight`: "Radar drafts the next move" → highlights the outreach card and ends with "Apply for the pilot" → `/#pilot`.
2. Persist progress in `sessionStorage` so refreshing does not restart the tour; store dismissal in `localStorage` so it never shows again once closed. Wrap every storage access in try/catch.
3. Copy lives in `src/lib/demo-content.ts` (a `tour` export) so it is tested by `demo-content.test.ts`: assert every stop's `href` resolves to a route that `generateStaticParams` produces.
4. The guide must be keyboard-operable (`Next`, `Back`, `Skip` buttons; Escape dismisses), announced via `aria-live="polite"`, and must not cover the element it highlights on a 390 px viewport. Highlighting is a 2 px accent outline with `scroll-margin-top`, never a modal overlay.
5. Track `demo_tour_started`, `demo_tour_step` (with `step`), `demo_tour_completed`, `demo_tour_dismissed` with `track()` from `@vercel/analytics`.

**Acceptance.** A first-time visitor from the homepage sees the guide, can complete it in four clicks on a phone, ends at the pilot form, and never sees it again after dismissing. `npm run test:a11y` still passes on all demo routes.

---

## Task 4 — Homepage hydration cost

**Context.** Lighthouse mobile LCP on `/` is ~3 s, of which ~1.2 s is element render delay: the H1 waits for React to hydrate the whole marketing tree. Only `PilotForm` needs to be a client component, but `marketing-sections.tsx` imports `HeroProductMock`, which imports `demo-content.ts` (1,500 lines) and lucide icons into the homepage chunk graph.

**Do.**
1. Run `ANALYZE=true npm run build` after adding `@next/bundle-analyzer` as a dev dependency behind `process.env.ANALYZE`, and record the homepage's first-load JS before and after in the PR description.
2. Split `demo-content.ts` so the marketing site imports only what it renders: move `spotlight`, `brightpath`, `brightpathFinding`, `brightpathRenewalWeeks`, `todayStats`, `kindMeta`, `findings` metadata and `demoMeta` into `src/lib/demo-summary.ts` (derived from the same objects, so the consistency tests keep passing), and import that from `hero-product-mock.tsx`, `marketing-sections.tsx` and `demo-topbar.tsx`. `demo-content.ts` re-exports it so the demo is unchanged.
3. Confirm `PilotForm` is the only `"use client"` component reachable from `src/app/page.tsx` (`grep -l "use client"` across its import graph).
4. Do not enable `reactCompiler` or `cacheComponents`; neither helps a static page and both add build risk.

**Acceptance.** Homepage first-load JS drops by at least 25%; Lighthouse mobile performance on `/` (local production build) rises from 95 to 98+; all tests pass; the demo pages are visually unchanged.

---

## Task 5 — Infrastructure checks (no code, ~30 minutes)

1. **Supabase tier.** Open the project `eoddphapxcuwgwihyjmb` and confirm it is on Pro. If it is Free, upgrade or accept that it pauses after 7 idle days, which makes every pilot application fail with the generic error.
2. **`access-control-allow-origin: *`.** Every response from `radar.wescalestartups.com` carries this header, and it is not set in `next.config.ts` or `vercel.json`. Find where it is set in the Vercel project (Settings → Headers, or a Vercel integration) and remove it unless there is a reason; it must not be present once `/app` and `/api/*` exist.
3. **HSTS preload.** The header declares `preload`, which only takes effect if the apex `wescalestartups.com` is submitted at hstspreload.org and serves the same header on the apex and all subdomains. Check the status there; if not submitted, either submit (and confirm every `*.wescalestartups.com` host serves HTTPS) or drop `preload` from the header.
4. **Vercel Web Analytics.** Enable it on the project, then set `NEXT_PUBLIC_ENABLE_ANALYTICS=1` in the Production environment and redeploy. Check `/_vercel/insights/script.js` returns 200 afterwards.
5. **Supabase advisors.** Run the security and performance advisors in the dashboard and file anything they raise as an issue.
6. **Branches and PRs.** Close PRs #11, #17 and #20 (superseded homepage redesigns) and delete every `agent/*`, `claude/*`, `fix/*`, `homepage-*`, `preview/*` and `redesign/*` branch whose PR is merged or closed. Keep `claude/mvp-audit-plan-65ngr4` until Task 1 lands.

---

## Task 6 — Pilot pricing on the site (needs Daniel's decision)

The onboarding checklist in `docs/pilot-privacy-pack/onboarding-authority-checklist.md` prices the founding pilot at £750 (first invoice). The homepage removed pricing on 7 August. If the price stands, add one line under the pilot form heading in `src/components/marketing/marketing-sections.tsx` (`ClosingCta`): "Founding pilot: £750 for 45 days, invoiced once, cancel any time" and mirror it in `src/lib/messaging.ts`. If it does not, delete the figure from the checklist so the two documents cannot disagree.

---

## Prompt template for a cheaper model

> You are working in the `DanielJohnsonXYZ/client-health-radar` repository (Next.js 16, App Router, Tailwind v4, Supabase, Vercel). Read `README.md` and `docs/radar-design-notes.md` first. Implement **Task N** from the brief below exactly as written, in a branch named `task-N-<slug>`. Do not change anything the task does not mention. Before opening a PR, run `npm run verify` and, after a build, `npm run test:a11y`, and paste both outputs into the PR description. If an acceptance criterion cannot be met, stop and explain why instead of loosening it.
>
> [paste the task block]
