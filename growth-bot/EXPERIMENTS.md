# Experiments — the lock register

One row per shipped change. A page in an OPEN row is locked for both bots until the review date.

| Date | Run | Page(s) | Hypothesis | Constraint | Metric | Baseline | Review date | Status | Lesson |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-09-21 | 6 | `StickyBookCta.astro` (shared — renders sitewide) | The sticky bar's two secondary offers (newsletter, WhatsApp) sat at equal visual weight to the booking button and made the bar 264px tall on a 375x812 phone, covering the price tiers on `/pricing`. Demoting them to one compact line of links makes booking unambiguously primary and returns a third of the phone viewport to the page. | Booking CTA click rate falling while impressions rise: 9.8% → 8.4% of bar impressions across the last two 28-day windows. | **`book_call` clicks**, and `book_call` ÷ `sticky_book_cta_shown` | 30 clicks / 357 impressions = **8.4%** sitewide (28d, 2026-08-24 → 2026-09-20). Sticky-bar-only: ~20 clicks / 357 = 5.6% (the 10 `book_call` on `/book` are in-page anchors; the bar is disabled there). Prior 28d: 32 / 326 = 9.8%. Mobile bar height 264px → 189px; desktop 169px → 153px. | **2026-10-19** | OPEN | — |
