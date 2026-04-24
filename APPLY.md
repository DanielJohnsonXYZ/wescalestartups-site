# Apply the unified branch

This folder is a drop-in replacement for a subset of files in `wescalestartups-site`. It reconciles PR #1 (site overhaul) + PR #3 (copy audit) + PR #2 (Docker cleanup) into one coherent branch.

## One-shot script

Run from inside your local `wescalestartups-site` clone (assumes you're on `main` with no uncommitted changes):

```bash
# 1. Clean start from latest main
git fetch origin
git checkout main
git pull --ff-only

# 2. Create the unified branch
git checkout -b ship/unified-2026-04-24

# 3. Remove files that no longer belong (legacy services + Docker stack)
git rm -f \
  src/content/services/90-day-growth-sprint.json \
  src/content/services/acquisition-system-build.json \
  src/content/services/growth-diagnosis.json \
  Dockerfile \
  compose.production.yml \
  nginx.conf \
  .dockerignore

# Remove the PR #3 component that the unified branch retires
git rm -f src/components/PricingGuide.astro 2>/dev/null || true

# 4. Unzip the unified changeset over the working tree (replace PATH with where you saved the zip)
unzip -o "/Users/clive/Library/Application Support/Claude/local-agent-mode-sessions/165cbd37-2c55-4225-a778-d32b1f4ca0be/0cfb170d-d3d2-4904-ac1f-966358c4b6a5/local_6cbbadfd-f5b7-4413-b496-d2dd1643e92f/outputs/wss-unified.zip" -d .

# 5. Wire additions.css into global.css if not already
if ! grep -q '@import "./additions.css"' src/styles/global.css; then
  echo '@import "./additions.css";' >> src/styles/global.css
fi

# 6. Sanity check
npm install
npm run build

# 7. Commit + push
git add -A
git commit -m "ship: unified site (phases, conversion layer, SEO/GEO, guardrails)

Merges PR #1 (site overhaul, 3-phase services) + PR #3 (copy audit, conversion
components, richer schema/GEO) + PR #2 (remove Docker stack). Supersedes all
three open PRs.

- Services restructured into Research / Acquisition / Operating Cadence + Fractional CMO
- Homepage: new hero, trust strip, who-for/not-for, 3-phase engine, operators-install statement,
  featured case, founder video placeholder, FAQ (FAQPage schema), lead magnet, CTA band
- Footer: newsletter signup, positioning statement, LinkedIn + X
- Sticky CTA site-wide
- Richer Person / ProfessionalService / FAQPage / BreadcrumbList / CaseStudy schema
- llms.txt rewritten for LLM retrieval (entity-rich Q&A, pricing, canonical entities)
- robots.txt allow-lists 17 AI crawlers
- Sitemap gains lastmod/priority/changefreq
- Legacy service slugs 301-redirected in _redirects
- WCAG-AA body contrast, mobile CRO pass
- Removed Dockerfile/compose.production.yml/nginx.conf/.dockerignore (Cloudflare Pages now)
- Added AGENTS.md + PR template to prevent duplicate divergent PRs in future"

git push -u origin ship/unified-2026-04-24

# 8. Open PR
gh pr create --fill --base main || echo "Visit: https://github.com/DanielJohnsonXYZ/wescalestartups-site/compare/main...ship/unified-2026-04-24"
```

## Close the superseded PRs

Once the unified PR is open, close the three older PRs with comments pointing to it:

```bash
gh pr close 1 --comment "Superseded by ship/unified-2026-04-24 — that branch includes the 3-phase service restructure, About rewrite, receipts, pricing band, FAQ, and schema/GEO work from this PR, plus the PR #3 conversion components."

gh pr close 3 --comment "Superseded by ship/unified-2026-04-24 — that branch keeps the TrustStrip, StickyCTA, ObjectionsFAQ, FounderVideo, LeadMagnetForm, footer newsletter, and schema/GEO additions from this PR, and merges them onto PR #1's 3-phase service structure."

gh pr close 2 --comment "Rolled into ship/unified-2026-04-24 (Dockerfile/compose.production.yml/nginx.conf/.dockerignore removed there)."
```

## Manual steps after merge

1. Replace `https://formspree.io/f/REPLACE_ME` in `src/components/SiteFooter.astro` and `src/components/LeadMagnetForm.astro` with the real ESP endpoint (ConvertKit / MailerLite / Beehiiv / Resend).
2. Once Daniel records the 60-second founder video, paste the embed URL into `siteConfig.videoUrl` in `src/site.ts`.
3. Cloudflare Pages will auto-build and deploy `main` — monitor the build on [dash.cloudflare.com/pages](https://dash.cloudflare.com/?to=/:account/pages).
4. Request reindex in Google Search Console after deploy (sitemap at `/sitemap.xml`).

## What this branch produces

See `CHANGES.md` in this folder for the full file-by-file change map.
