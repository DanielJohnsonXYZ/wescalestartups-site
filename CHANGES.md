# WSS site — 2026-04-24 audit rewrite

**Branch suggestion:** `copy/audit-rewrite-2026-04-24`
**Scope:** Full homepage + global layout rewrite per the 20-item audit, plus SEO + GEO pass.
**Deploy path:** Once merged, Coolify will auto-build and redeploy from GitHub.

---

## Files in this changeset

### Modified

| File | What changed | Audit items |
|---|---|---|
| `src/site.ts` | Central config expanded: sharper title/description/tagline, tightened ICP (B2B SaaS + AI, £1M–£10M ARR), new `trustStripItems`, `painSignals`, `objections`, `pricingGuide`, `videoUrl`, `founderRole`. | #1, #3, #5, #7, #12, #13, #14, #20 |
| `src/pages/index.astro` | Full homepage rewrite: sharper hero headline, credibility trust strip, simpler founder-to-founder pain language, pricing guidance, objections FAQ, founder video, lead-magnet form, stronger case-study section, sticky CTA. | #1, #2, #3, #4, #5, #6, #7, #12, #13, #14, #18, #20 |
| `src/components/SiteFooter.astro` | Footer rework: newsletter signup band, positioning statement, LinkedIn (founder + company), X, stronger CTA, added Resources link. | #17 |
| `src/layouts/BaseLayout.astro` | Mounts the new `<StickyCTA />`. Adds `preconnect` for Calendly (perf). Added `og:locale`. `en-GB` language flag for web-site schema. | #18 |
| `src/lib/schema.ts` | Added `buildPersonSchema`, `buildProfessionalServiceSchema`, `buildFAQSchema`, `buildBreadcrumbSchema`, `buildCaseStudySchema`. Organization schema now includes `areaServed` + `description`. | SEO, GEO |
| `src/pages/llms.txt.ts` | Richer GEO content: ICP definition, core offers with pricing, objections as Q&A, "when to hire fractional vs full-time CMO", canonical entities block. Much more citeable by LLM retrieval. | GEO |
| `src/pages/robots.txt.ts` | Explicit allow-list for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, and a dozen more AI crawlers. Keeps `User-agent: *` permissive. | GEO |
| `src/pages/sitemap.xml.ts` | Adds `<lastmod>`, `<changefreq>`, `<priority>` per URL. Better crawl hints for Google. | SEO |

### Created

| File | Purpose | Audit items |
|---|---|---|
| `src/components/TrustStrip.astro` | Bold credibility strip under the hero (Google for Startups, £10M+ budgets, £1M→£10M ARR, trusted by SaaS/AI/Fintech). | #2, #15 |
| `src/components/StickyCTA.astro` | Fixed-position "Book a Growth Audit" chip that appears after 600px scroll. Mobile-optimised. | #18 |
| `src/components/ObjectionsFAQ.astro` | Six founder objections as `<details>` cards. First one open by default. Emits FAQPage schema via BaseLayout. | #7, GEO |
| `src/components/PricingGuide.astro` | Three engagement ranges with "most common" highlight card. Qualifies leads before they book. | #20, #10 |
| `src/components/FounderVideo.astro` | 60-second Daniel video section. Renders an embed if `siteConfig.videoUrl` is set, otherwise a placeholder block. | #16 |
| `src/components/LeadMagnetForm.astro` | Email-capture block for the Growth Bottleneck Scorecard + 5 mistakes. Captures email, first name, stage. Currently wired to Formspree — swap for ConvertKit/MailerLite/Beehiiv endpoint. | #5 |
| `src/styles/additions.css` | All new CSS for the above components, plus darker `--muted`/`--dim` for WCAG-AA body contrast, card-variance utilities (`.is-tinted`, `.is-acid`), tighter section padding, mobile CRO pass. | #8, #9, #10, #11 |
| `src/styles/global.css.append.md` | One-liner instructions for importing additions.css into global.css. | — |
| `docs/case-study-template.md` | Extension plan for case-study pages. Schema additions + copy framework. Leave for a follow-up commit with Daniel's inputs. | #6 |
| `docs/founder-video-script.md` | 45–60s script + shot notes for Daniel to record. | #16 |

---

## Audit coverage map

| # | Audit item | Status |
|---|---|---|
| 1 | Hero headline clarity | ✅ "Build predictable pipeline *before* you hire a £150k CMO." |
| 2 | Trust strip under hero | ✅ New `TrustStrip` component |
| 3 | CTA language | ✅ Primary CTA = "Book a Growth Audit". Scorecard as secondary. Sticky CTA reinforces. |
| 4 | Simpler founder language | ✅ "Leads come in, but growth feels random" / "Dashboards, but no clear answers" / "Paid ads burn money" etc |
| 5 | Lead capture beyond booking | ✅ LeadMagnetForm + footer newsletter |
| 6 | Case-study depth | 🟡 Template delivered (`docs/case-study-template.md`). Content pass needed with Daniel. |
| 7 | Founder objections | ✅ ObjectionsFAQ with 6 questions, FAQPage schema |
| 8 | Tighten whitespace | ✅ Section padding 6rem → 5rem desktop, 3.5rem mobile |
| 9 | Body contrast | ✅ `--muted` / `--dim` darkened. Card p text forced to `--ink-2`. |
| 10 | Card hierarchy | ✅ `.is-tinted` / `.is-acid` / pricing highlight card / objection open-state glow |
| 11 | Mobile review | ✅ StickyCTA / FAQ / pricing / lead-magnet all have mobile breakpoints |
| 12 | Niche into one ICP | ✅ Homepage leads B2B SaaS + AI, £1M–£10M ARR. Fintech/HealthTech mentioned lower. |
| 13 | "We Scale Startups" vs founder brand | ✅ "Led by Daniel Johnson · You work directly with Daniel" in hero + footer |
| 14 | Stronger pain language | ✅ See item #4 |
| 15 | Logo + proof prominence | 🟡 Logos kept as-is in ProofLogos. Suggest adding founder testimonials block in a follow-up. |
| 16 | Founder video | ✅ Section placeholder + script. Set `siteConfig.videoUrl` once recorded. |
| 17 | Footer rework | ✅ Newsletter band, LinkedIn, X, positioning statement, stronger hierarchy |
| 18 | Sticky CTA | ✅ StickyCTA mounted site-wide via BaseLayout |
| 19 | Results nav | ✅ Already live in `site.ts` (`/case-studies` → "Results") |
| 20 | Pricing guidance | ✅ PricingGuide with three engagement ranges |

---

## SEO pass

- Homepage title tightened: "Fractional CMO for B2B SaaS & AI Startups | We Scale Startups" (primary keyword first, under 60 chars).
- Homepage description rewritten for CTR: "Fractional CMO and growth systems for post-PMF B2B SaaS and AI startups (£1M–£10M ARR). Build predictable pipeline before you hire a £150k full-time CMO."
- JSON-LD added: Person (Daniel), ProfessionalService, FAQPage (from objections). Organization schema gains `areaServed` + `description`.
- Sitemap gains lastmod + priority + changefreq per URL.
- `preconnect` + `dns-prefetch` for Calendly.
- `og:locale` set to `en_GB`. WebSite schema `inLanguage` set to `en-GB`.
- Suggested primary keywords targeted on copy: *fractional CMO*, *B2B SaaS fractional CMO*, *AI startup growth*, *post-PMF growth*, *growth audit UK*, *startup growth consultancy London*. These appear naturally in H1, H2s, hero copy, and schema.

## GEO pass (LLM answerability)

- `llms.txt` rewritten as an entity-rich, Q&A-structured summary that LLM retrieval pipelines prefer. Includes: one-line positioning, ICP, core offers with pricing, proof signals, founder FAQ, "when to hire fractional vs full-time" block, canonical entities.
- `robots.txt` now explicitly welcomes GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc. instead of relying on the global wildcard.
- Objections surface as FAQPage JSON-LD (Google AI Overviews + Perplexity favour this).
- Person schema for Daniel increases author E-E-A-T for generative answers.
- `knowsAbout` array on Person schema seeds the topical authority graph LLMs use.
- Homepage copy uses plain definitional sentences ("A fractional CMO is…", "Hire a fractional CMO when…") that are highly quotable by LLMs.

---

## Follow-up items (not in this PR)

1. **Case-study depth** — apply the template in `docs/case-study-template.md` to each of the 4 cases. Needs 90 min with Daniel.
2. **Founder video** — record per `docs/founder-video-script.md`, then set `siteConfig.videoUrl`.
3. **Newsletter backend** — replace the `REPLACE_ME` formspree endpoint in `SiteFooter.astro` and `LeadMagnetForm.astro` with the real ESP (ConvertKit / MailerLite / Beehiiv / Resend).
4. **Founder testimonials** — add a short testimonial block (audit item #15). 3–5 one-liner quotes from named founders lifted from LinkedIn.
5. **Sub-page copy pass** — same tightening applied to `/services/*`, `/industries/*`, `/about`, `/resources`. Copy follows the same tone established on the homepage.
6. **Scorecard actual tool** — `/resources#growth-bottleneck-scorecard` currently links to a section, not an interactive scorecard. Build the 10-question scored form as a follow-up (React island or plain form with server scoring).

---

## How to apply

Because the GitHub integration was read-only this pass, files were written to the workspace rather than pushed directly. To apply:

```bash
cd /path/to/wescalestartups-site
git checkout -b copy/audit-rewrite-2026-04-24

# Copy the contents of this changeset over the matching paths, then:
git add -A
git commit -m "copy: audit rewrite — homepage, components, SEO/GEO"
git push -u origin copy/audit-rewrite-2026-04-24
```

Then open a PR against `main`. Coolify will deploy main once merged.
