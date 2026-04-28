# Proof TODO — post-launch proof upgrades

The site overhaul now launches with short public MentorCruise review excerpts and approved pricing. The items below are follow-up upgrades, not blockers for this release.

## 1. Testimonials (launched with public snippets)

The first launch version uses short public MentorCruise review excerpts for Kenneth, Ab, and Dominic so the site does not ship placeholder testimonials.

Next upgrade: pull 3–5 fuller permissioned quotes following the brief that was already drafted in Notion:

- Reviewer name
- Role / company (with permission)
- 2–4 sentence quote
- One specific result they'd attribute to the work

**Sources to pull from:**
- [ ] [MentorCruise reviews](https://mentorcruise.com/mentor/danieljohnson/) — 30+ reviews, 5.0/5
- [ ] GrowthMentor reviews
- [ ] LinkedIn recommendations
- [ ] Past client emails — search Gmail for "thank you" / "great work" from clients
- [ ] Conference feedback / post-event surveys

**Where they go:** Edit the `testimonials` array in `src/site.ts`.

```ts
{
  quote: "Daniel rebuilt our acquisition motion in 8 weeks. Pipeline is now predictable for the first time.",
  name: "Jane Doe",
  role: "CEO",
  company: "Acme",
  result: "Cut CAC by 35% in 8 weeks"
}
```

Aim for: at least one Series A founder, one healthtech/fintech reference, one "system over heroics" angle.

## 2. Pricing tiers

Pricing in `src/site.ts` is approved for launch:

- Growth Diagnosis — `from £4,000` (1 week)
- 90-Day Growth Sprint — `from £15,000` (12 weeks)
- Acquisition System Build — `from £30,000` (8–12 weeks)
- Fractional CMO — `from £8,000 / month` (3-month minimum)

These can be revisited later if offer packaging changes.

## 3. Logos

Current `trustLogos` in `site.ts`: Ned, eQuoo, LessonsUp, Nevly, Diadia Health.
- [ ] Add Diadia Health logo file to `/public/images/logos/diadia.webp` (or similar)
- [ ] Update `ProofLogos.astro` if you want actual logo images instead of text labels (the component already supports `src` + `alt` if you swap the data)

## 4. Hero photo (already in place)

Daniel's headshot is already wired into the hero (`/images/daniel-headshot-960.webp`) and the new `DanielStory.astro` section. No action needed unless you want a different photo.

## 5. Sitemap

Done for this release: `src/pages/sitemap.xml.ts` includes the five new pages:
- `/start-here`
- `/how-it-works`
- `/first-30-days`
- `/pricing`
- `/proof`

Keep this list in sync if new hardcoded top-level routes are added later.

## 6. Real case study upgrade (optional but high-impact)

The Notion `Case Studies` page has three full case studies that aren't on the site yet:

1. **Diadia Health** — added in this overhaul as `src/content/cases/diadia-health.json`
2. **eCommerce automation platform (anonymised)** — 18-month fractional CMO engagement, multi-channel rebuild
3. **FRONTLINE / Boehringer-Ingelheim (via Hustle & Hive)** — performance audit that flagged a ₱1.1M annual misallocation

Cases 2 and 3 would substantially upgrade the proof hub. To add them, mirror the JSON shape of `diadia-health.json` and drop in `src/content/cases/`. The `/case-studies/[id].astro` dynamic route will pick them up automatically.
