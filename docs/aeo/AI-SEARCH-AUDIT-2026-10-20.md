# AI-search factual-consistency audit, 20 October 2026

## Scope and known evidence

This is a focused follow-up to Ahrefs' AI-search advice, not a new SEO strategy or a fresh measured AI-search panel.

- **AI visibility is already monitored.** The canonical panel is `seo-bot/AI-VISIBILITY.md`, with 10 fixed commercial discovery prompts. Its latest complete Google AI Mode reading, #13 on 6 October, recorded WSS mentioned and cited on **2/10** prompts. Do not reclassify this as zero or extrapolate it to ChatGPT.
- **Site accessibility looks healthy on a normal residential UK connection.** From Daniel's Mac on 20 October, GET requests for `/`, `/robots.txt` and `/sitemap.xml` returned 200, including Googlebot, OAI-SearchBot and ClaudeBot user-agent strings. `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot and PerplexityBot.
- **Cloudflare challenge is network-dependent.** The same checks from the `dokploy-wss` data-centre IP returned a 403 Cloudflare challenge for `/` and `/sitemap.xml`, but `/robots.txt` returned 200. This is evidence of an IP-dependent challenge, *not* proof that verified Google/OpenAI crawlers are blocked. User-agent spoofing does not replicate a crawler's verified IP. Check Cloudflare WAF/Security Events for real verified bots before considering any security-rule change.
- **Third-party proof differs from the platform-specific page.** GrowthMentor showed **4.94/5, 228 reviews and 409 sessions** on 20 October. WSS's broader **4.97/5 across 479+ sessions** is claimed as a multi-programme aggregate (Google for Startups, Techstars, GrowthMentor and MentorCruise). Do not present it as GrowthMentor's own rating or count. Cross-programme numbers remain self-reported until independently reconciled.

## Targeted corrections prepared in this branch

1. Homepage scorecard: change outdated 10-question / 5-minute description to **12 questions / about four minutes**, and describe its actual founder-dependency focus. This page has a separately registered booking-CTA experiment lock through 28 October, so review that timing before merging.
2. AI Growth Audit proof: make revenue influenced explicitly aggregate across client and operator-side engagements; describe **479+ founder sessions**, not 479 distinct founders; display GrowthMentor's current **4.94/5** platform-specific figure rather than WSS's 4.97 cross-programme average, with a dated source label and the existing external review link.
3. Shared logo proof label: remove the misleading implication that GrowthMentor itself accounts for all 479+ sessions.
4. Positioning tool example: bring its historical £6M acquisition-spend example into line with the canonical £10M+ paid-acquisition-spend claim.

## Open items that require external access or evidence

- **Independent verification:** reconcile the programme-level session counts/rating methodology and date, then decide whether the aggregate homepage 479+/4.97 values need adjustment. Do not derive an aggregate by simply averaging platform ratings.
- **Off-site profile corrections:** claim/update the existing DesignRush listing (old 2019 founding date, agency services and $99 hourly pricing) using `seo-bot/outreach/2026-10-10-run31.md`. This requires account ownership, so the repo work does not edit the third-party listing.
- **AI visibility measurement:** run the next Google AI Mode + ChatGPT panel following `seo-bot/PLAYBOOK.md`, recording signed-in state, citations, competitor mentions and accuracy. Avoid adding ad-hoc prompts to the fixed trend series.
- **Original research:** the site *already has* an original analysis of 226 public mentoring reviews at `/insights/what-226-founder-reviews-reveal`. Amplify/link to that before commissioning generic new GEO articles. Avoid duplicate AI content.
- **Client evidence:** obtain permission and time-bound outcomes for two or three existing studies before adding new metrics. `docs/PROOF-TODO.md` prohibits invented or unapproved evidence.

## Interpretation

The existing bot's evidence indicates an **authority/discovery constraint** more than an on-page extraction problem. Prioritise genuinely independent third-party references and proof. A documentation or snippet change may improve accuracy; it is not evidence of an increased AI citation share until the fixed panel measures a change.
