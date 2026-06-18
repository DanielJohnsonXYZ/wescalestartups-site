# Refer-a-friend — options & recommendation

Date: 2026-06-18 · Backlog item: "Refer a friend functionality."

## Constraint
The site is **static** (Astro → Cloudflare Pages). There's no application backend, but there **is Mautic** (see `mautic-welcome-sequences.md` and `EmailSignup.astro`) for marketing automation, and Cal.com for booking. So "referral" splits into two problems:

1. **Sharing** — making it easy for someone to refer WSS. *(No backend needed.)*
2. **Tracking + rewarding** — attributing who referred whom and fulfilling a reward. *(Needs a mechanism.)*

## What's shipped now (this PR)
A no-backend **`/refer`** page that solves (1):
- **Direct warm intro** path (mailto to Daniel with a prefilled template) — the highest-value referral.
- **Share the diagnostic** — prefilled LinkedIn / X / WhatsApp / Email / copy-link buttons, all pointing at the Learning Latency Score with `utm_source=referral&utm_medium=share&utm_campaign=refer-a-friend` so referred traffic is measurable in analytics.

This is deliberately reward-free and honest — no promised incentive we can't yet fulfil. It captures the 80/20 of referral value (warm intros + easy sharing) immediately.

## Options for tracked + rewarded referrals (your decision)

| Option | How it works | Effort | Best for | Notes |
|---|---|---|---|---|
| **A. Mautic + `?ref=` attribution** | Add an optional referrer field; append `?ref=<id>` to share links; capture it into the Mautic form hidden fields already in `EmailSignup.astro`. Reward fulfilled manually. | Low | Light attribution without new tools | Reuses existing stack. No automated rewards, but you'd *know* who referred. |
| **B. SparkLoop (or similar)** | Newsletter-native referral program — subscribers get a unique link, rewards (e.g. resource unlocks) auto-fulfil at milestones. | Low–Med | Growing **The Growth Bottleneck** newsletter | Purpose-built for newsletter referral; integrates with most ESPs. Monthly cost. |
| **C. Rewardful / PartnerStack / Tolt** | Affiliate/referral SaaS — unique links, dashboards, cash/credit rewards, payouts. | Med | **Client/partner** referrals with monetary reward | Overkill unless you want a real affiliate program; needs a reward budget + terms. |
| **D. Custom (Cloudflare Worker + KV/D1)** | A Worker issues referral codes and tracks conversions; store in KV/D1. | High | Full control, no per-seat SaaS | Most build/maintenance; only worth it at volume. |

## Recommendation
- **Now:** ship `/refer` (this PR) — warm intros + share links. Link it from the footer and from scorecard result pages.
- **Next (cheap win):** Option **A** — wire `?ref=` through the existing Mautic fields so referrals are attributable, fulfilled with a manual thank-you.
- **If newsletter growth is a priority:** add Option **B** (SparkLoop) for automated, milestone-based rewards.
- **Defer** C/D until there's a clear reward budget and referral volume to justify them.

## Open questions for Daniel
1. Is the referral reward **monetary** (affiliate/cash) or **goodwill/resource** (intros, free assets, recognition)? This decides B vs C.
2. Who's the referrer — **clients**, **newsletter subscribers**, or **both**? (Different tools.)
3. Should `/refer` be linked from the **footer / nav**, or stay an unlinked page used in 1:1 asks for now?
