# Case study expansion — template

Current case studies are elegant but shallow (audit item #6). The homepage already surfaces Before / Work done / Result, but the **individual case-study pages** need to become proper sales assets.

Use this template to expand each of:

- `src/content/cases/ned.json`
- `src/content/cases/equoo.json`
- `src/content/cases/lessonsup.json`
- `src/content/cases/nevly.json`

The content-collection schema in `src/content.config.ts` already supports the fields below. Only `challenge`, `work`, `results`, `summary`, `sector`, `client`, `title`, and `services` are required today. To add the extra depth from the audit you'll want to extend the schema in one of two ways:

1. **Light touch** — keep the existing schema and add richer copy into `challenge` (a 3–5 sentence story) and expand `work` / `results` to 6–10 bullets each. Low dev cost.
2. **Proper extension** — add the fields below to the case-study Zod schema and template so every case study has full depth.

## Recommended extended fields

Add to `content.config.ts` under the `cases` collection:

```ts
stage: z.string().optional(),           // e.g. "Seed", "Post-Series A", "£2M ARR"
engagement: z.string().optional(),       // e.g. "Fractional CMO, 6 months"
timeline: z.string().optional(),         // e.g. "Q2 2024 – Q4 2024"
before: z.array(z.string()).optional(),  // bullet list of the state before
after: z.array(z.string()).optional(),   // bullet list of the state after
metrics: z.array(z.object({
  label: z.string(),
  before: z.string(),
  after: z.string()
})).optional(),
whyItWorked: z.string().optional(),      // 2–4 sentence explanation
screenshots: z.array(z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional()
})).optional(),
```

## Copy framework per case study

1. **Client stage** — size, stage, ARR band, team count.
2. **The problem** — 3–5 sentence narrative of the commercial pain.
3. **What we changed** — the specific interventions (not tactics: the system shifts).
4. **Timeline** — start → end, with phase gates.
5. **Metrics before/after** — side-by-side table, not just end-state numbers.
6. **Screenshots** — redacted dashboards, creative samples, landing pages, funnel charts.
7. **Why it worked** — an honest paragraph on the lever that mattered.

## Next step

Would be good to fill these out over a single 90-minute session with Daniel, going case by case. Until then, this template doc and schema extension unblock the dev work without waiting on Daniel's input.
