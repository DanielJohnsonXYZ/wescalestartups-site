# Growth-bot playbook

State for the scheduled Growth/CRO operator (daily, 07:00 London). The SEO/GEO operator's state is in `seo-bot/`; locks are shared both ways. Prompt of record is the scheduled task "WSS Growth Operator (CRO, daily)".

## Access notes

- GA4 property ID: not yet recorded. Record on first successful read, with conversion event names.
- Booking source of truth: Gmail, `from:noreply@wescalestartups.com` (self-hosted Cal.com at cal.wescalestartups.com, subjects `Growth Audit | <name> × We Scale Startups`). Legacy Calendly notifications from `notifications@calendly.com` still arrive for old event types. Count by invitee + final event time.
- Clarity: connector read-only, or clarity.microsoft.com in Chrome.

## Funnel model

Organic / AI / referral / direct → landing page → money page (`/pricing`, `/services/*`, `/contact`) → `/book` (Cal.com embed) → booking → qualified?

## Ranked backlog

1. Establish the baseline: 28-day sessions, money-page sessions, `/book` reach, bookings, qualified bookings, and the landing page behind each qualified booking. Nothing ships until this exists.
2. Money-page mobile render and CTA position (Chrome screenshot, PageSpeed mobile).
3. Clarity read on `/pricing`, `/services/*`, `/book`: dead clicks, quick backs, scroll to CTA.

## Settled findings

(none yet)

## Proposed to Daniel

(none yet)
