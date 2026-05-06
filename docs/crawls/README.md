# Crawl export workflow

This repo does not run a full-site crawler in CI. Instead, export crawl results from a dedicated tool (Screaming Frog, Ahrefs, etc.) and commit the latest CSV for validation.

## Steps

1. Run the crawl externally against `https://wescalestartups.com`.
2. Export a CSV that includes at least:
   - `Address`
   - `Status Code`
   - `Redirect URL` (or `Final Address`)
3. Save the file as `docs/crawls/latest.csv`.
4. Run:

```bash
npm run check:links:crawl
```

The checker fails on:
- Internal broken URLs (`4xx`/`5xx`)
- Internal multi-hop redirects (redirect target is also redirecting)

Fix redirects in `public/_redirects` and `functions/_middleware.js`, then re-run the checker.
