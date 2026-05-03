# Cross-site technical QA checklist — WSS · DJ.xyz · HAA

**Status:** Active reference doc · Created 2026-04-29 · Maintainer: Daniel
**Notion source:** [Cross-site: WSS + DJ.xyz + HAA](https://www.notion.so/354f99a79fdb81f782e5f3ee6904d4d2)

A shared technical QA checklist for the three Daniel-adjacent sites. Run it before merging anything that touches a layout, schema, tracking, or accessibility surface. Priority order: **WSS first, DJ.xyz second, HAA third** — WSS and DJ.xyz are the higher-priority commercial and authority assets.

## Pre-merge checklist (run on every PR)

### Build
- [ ] `npm run build` succeeds with no warnings beyond the known Astro vite "matchHostname" message
- [ ] Page count matches expectation (no pages silently dropped by content collection schema)
- [ ] No TypeScript errors in `npm run check` (where the script exists)

### Mobile responsiveness
- [ ] Hero renders on a 375×667 viewport without horizontal scroll
- [ ] Buying ladder / service cards stack cleanly under 768px
- [ ] Nav dropdown collapses to mobile menu under 1024px
- [ ] Tap targets ≥44×44px on all primary CTAs and nav items
- [ ] Sticky CTAs do not overlap final page CTA on mobile

### Performance
- [ ] No new images > 200KB without webp/avif fallback
- [ ] Hero headshot uses `loading="eager"` and `fetchpriority="high"`; everything else `loading="lazy"`
- [ ] No render-blocking external CSS or JS in `<head>`
- [ ] Lighthouse score (mobile) on the modified page: Performance ≥85, Accessibility ≥95, Best Practices ≥90, SEO ≥95

### Schema / structured data
- [ ] Page has at least one schema block (Person, Organization, WebSite, Service, FAQPage, Article, BreadcrumbList, etc.)
- [ ] Run [Google Rich Results Test](https://search.google.com/test/rich-results) on the modified URL after deploy
- [ ] Run [Schema.org validator](https://validator.schema.org/) on any new schema type
- [ ] AggregateRating numbers match what's shown in the hero proof bar (no drift between visual and structured data)

### Metadata
- [ ] Title tag ≤60 characters
- [ ] Meta description 140–155 characters, page-specific, benefit-led
- [ ] Canonical link present and points to the trailing-slash form
- [ ] OG image present and renders at 1200×630
- [ ] Twitter card uses `summary_large_image`

### Accessibility
- [ ] Every `<img>` has a meaningful `alt` (or `alt=""` if decorative)
- [ ] Headings increase by one (no h1 → h3 jumps)
- [ ] Focus states visible on all interactive elements
- [ ] Colour contrast ≥4.5:1 for body text, ≥3:1 for large text
- [ ] Form fields have associated `<label>` (or `aria-label`)

### Forms / lead capture
- [ ] Mailto links use `encodeURIComponent` for subject/body
- [ ] No client-side form posts to third-party endpoints without explicit opt-in
- [ ] Newsletter signup honours email validation
- [ ] Calendly embeds load with `loading="lazy"`

### GTM / GA4 events
- [ ] All CTAs have `data-cta="..."` for click tracking
- [ ] GTM container ID matches the site (DJ.xyz: GTM-5S892HK; WSS: GTM-TV6C7GS)
- [ ] No duplicate GTM container snippets in HTML
- [ ] Conversion events (booking completed, form submitted, magnet requested) fire in GTM Preview

### Broken links
- [ ] All internal links use the trailing-slash form (no redirect chain)
- [ ] No 404s on the modified page (run a quick crawl with linkinator or Screaming Frog)
- [ ] External links open in `_blank` with `rel="noreferrer"`

### Sitemap / robots
- [ ] New pages added to `src/pages/sitemap.xml.ts` if not auto-discovered
- [ ] No new disallow rules in `robots.txt` that affect public pages
- [ ] No noindex meta on a page that should be indexed

## Site-specific tracking IDs

| Site | GTM container | GA4 property |
|---|---|---|
| WSS (wescalestartups.com) | `GTM-TV6C7GS` | (link from GTM) |
| DJ.xyz (danieljohnson.xyz) | `GTM-5S892HK` | (link from GTM) |
| HAA (humanapprovedai.com) | TBD — populate when configured | TBD |

## Site-specific Calendly slugs

| Site | Calendly slug |
|---|---|
| WSS | `calendly.com/wescalestartups` |
| DJ.xyz | `calendly.com/danieljohnson` (or DJ-branded equivalent) |
| HAA | TBD |

Different slugs per site means attribution stays clean — you can see in Calendly which site originated the booking.

## Quarterly checks (in addition to per-PR)

- [ ] Run a full Lighthouse pass on home + each major commercial page on each site
- [ ] Verify GSC coverage: no new spike in Crawled-not-indexed or Discovered-not-indexed
- [ ] Verify Bing Webmaster: same check
- [ ] Update structured-data review-count and rating values if numbers have moved
- [ ] Test the booking flow end-to-end on each site: book → confirmation → calendar invite → reminder
- [ ] Re-run a broken-link crawl across the full sitemap

## When this doc applies

This checklist is a SHARED standard. Implementation order is **WSS → DJ.xyz → HAA**, but the standard is the same regardless of which site is the immediate target.

When in doubt: ship to WSS first, validate, then mirror to DJ.xyz with framing adjustments per the [cross-site proof hierarchy doc](./cross-site-proof-hierarchy-2026-04-29.md). HAA inherits whatever pattern the first two sites converge on.

This doc should be reviewed quarterly. Update when site infrastructure changes (e.g., GTM container migration, schema spec updates, new accessibility WCAG version).
