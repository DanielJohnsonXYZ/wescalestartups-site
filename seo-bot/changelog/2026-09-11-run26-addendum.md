# Run 26 addendum — 2026-09-11

**One correction to my own file, written minutes after it, because the evidence arrived after the write-up.**

`changelog/2026-09-11-run26.md` §2 hedged the sitemap fix with *"`/mentoring` is in the sitewide nav, so Google would have found it anyway."* That was reasoning from how crawling works rather than from a measurement, and the measurement was one call away.

**`inspection_inspect` on `https://wescalestartups.com/mentoring`, taken after the deploy:**

- **`coverageState`: "URL is unknown to Google"**
- `verdict`: NEUTRAL, every other field unspecified

**The page had been live, `index,follow`, self-canonical, and linked from the main nav and the footer for roughly fourteen hours, and Google had not discovered it.** The hedge stands as a statement about the eventual outcome and is wrong as a statement about the margin: **the sitemap entry is the discovery route, not a redundant signal on top of one.**

**This is `inspection_inspect`'s known-good direction.** The playbook records it as working-but-partial — *a success is trustworthy; a failure is not evidence about the URL.* This is a success, on a URL the property definitely owns, and it agrees with the sitemap evidence rather than contradicting it.

**Method note worth keeping:** this cost one call and it was available before the write-up was drafted. **When a run ships a discoverability fix, inspect the URL before describing the size of the win, not after.**

**Bing:** `submit_url` for the same URL returned `{"result": null}` — no error, no confirmation. **Ambiguous, not chased** (prohibition 20, and the standing instruction not to spend a run on connector archaeology). Treat Bing submission as unconfirmed for this URL. Bing is a diagnostic mirror, not a channel, so nothing turns on it.

**No other claim in the main entry is affected.** The build verification, the blob-SHA checks, the live sitemap count and the API-repair finding are all unchanged.
