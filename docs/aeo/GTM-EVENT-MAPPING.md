# GTM mapping — AEO events (We Scale Startups)

Container: `GTM-TV6C7GS` (siteConfig.gtmId)  
GA4 property: `259840282`

## Events already pushed from the site

| dataLayer event | When | Suggested GA4 event name | Key event? |
| --- | --- | --- | --- |
| `ai_referral` | Page load when `ai_source` detected (referrer/utm) | `ai_referral` | No — audience / exploration |
| `book_call` | Click to `/book` or Calendly (incl. sticky CTA) | `book_call` | **Yes** |
| `sticky_cta_shown` | Sticky bar becomes visible | `sticky_cta_shown` | No |
| `booking_completed` | Calendly booking complete (existing) | `booking_completed` | **Yes** (already recommended) |

Params to capture as Event Parameters / Data Layer Variables:

- `ai_source` (chatgpt | perplexity | gemini | copilot | claude | google_ai)
- `ai_referral` (boolean)
- `cta_label`, `cta_href`, `page_path`

## GTM setup steps (Tag Manager UI)

1. Open https://tagmanager.google.com → container `GTM-TV6C7GS`
2. **Variables** → New → Data Layer Variable for each: `ai_source`, `ai_referral`, `cta_label`, `cta_href`, `page_path`
3. **Triggers** → Custom Event:
   - `ce_ai_referral` → Event name `ai_referral`
   - `ce_book_call` → Event name `book_call`
   - `ce_sticky_cta_shown` → Event name `sticky_cta_shown`
4. **Tags** → GA4 Event tags (Config tag already on container):
   - Tag `GA4 - ai_referral` → Event name `ai_referral` → params `ai_source`, `page_path` → trigger `ce_ai_referral`
   - Tag `GA4 - book_call` → Event name `book_call` → params `cta_label`, `cta_href`, `page_path`, `ai_source` → trigger `ce_book_call`
   - Tag `GA4 - sticky_cta_shown` → Event name `sticky_cta_shown` → params `page_path`, `ai_referral` → trigger `ce_sticky_cta_shown`
5. Preview → load site with `?utm_source=chatgpt` → confirm `ai_referral` + sticky show + click sticky fires `book_call`
6. Submit container version: “AEO: AI referral + book_call + sticky CTA events”
7. In GA4 Admin → Events → mark `book_call` and `booking_completed` as key events

## Note

There is no GTM Admin API connected in this Cursor environment. Mapping must be completed in the GTM UI (or via gcloud/gtm API with a service account). This file is the exact spec to implement in one pass.
