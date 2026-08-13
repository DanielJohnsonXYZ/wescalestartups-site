# Cal.com: Luck Doesn't Scale — 60-minute podcast invite

Paste-ready event type for the self-hosted Cal at
`https://cal.wescalestartups.com` (user `daniel`).

**Status:** Copy and settings ready. Creating the live event type requires Cal
admin login (email/password). Public URL once published:
`https://cal.wescalestartups.com/daniel/podcast`

## Event type settings

| Field | Value |
| --- | --- |
| Title | `Luck Doesn't Scale — Podcast Recording` |
| URL slug | `podcast` |
| Duration | `60` minutes |
| Location | Google Meet (same integration as `20min`) |
| Schedule | Reuse `20min - Tue/Thu UK` (Tue/Thu 10:00–18:00 Europe/London), or a wider recording schedule if preferred |
| Hidden / private | Optional — hide from `/daniel` profile if this link is invite-only for accepted guests |
| Success redirect | Leave default, or `https://wescalestartups.com/podcast` |

## Description (paste into Cal)

```text
This is a 60-minute recording session for Luck Doesn't Scale, the We Scale Startups podcast hosted by Daniel Johnson.

What we talk about
AI is rewriting the startup growth playbook. On the show we explore what that means in practice: which old growth assumptions are breaking, what AI makes possible, what remains uniquely human, and what founders and operators should do differently.

Who this is for
Confirmed guests (founders, marketers, investors, and operators) who have already been invited to record, or who have been accepted via the guest application.

What to expect
• ~5 min — settle in, tech check, and context
• ~45–50 min — recorded conversation
• ~5 min — wrap, next steps, and any assets you want linked

Please bring
• A quiet space and stable internet
• Headphones if possible
• 1–2 concrete stories or examples (numbers welcome)
• Any links you want us to include (product, LinkedIn, press)

This is not a sales call. It is a podcast recording for Luck Doesn't Scale.

Guest applications (if you have not been invited yet): https://wescalestartups.com/podcast-guest-application
YouTube: https://www.youtube.com/@wescalestartups
```

## Booking questions (recommended)

1. **Company** — short text, required  
2. **LinkedIn or website** — short text, required  
3. **What story or lesson should we cover?** — long text, required  
4. **Anything we should avoid / off the record?** — long text, optional  

## After create checklist

1. Open `https://cal.wescalestartups.com/daniel/podcast` in an incognito window — expect HTTP 200 and the description above.
2. Book a test slot from a non-test Gmail and confirm Google Calendar + Meet arrive.
3. Wire the site when ready: `siteConfig.podcastCalUrl` / `podcastCalLink` in `src/site.ts` (see runbook §5).
4. Optionally add the path to the Cal uptime monitor (alongside `/daniel/20min`).

## Admin access note

Cloud agents can reach the Cal login UI but cannot create event types without the
`daniel@wescalestartups.com` Cal password or an API key. SSO is not enabled on
this instance (`NEXT_PUBLIC_DISABLE_SIGNUP=true`).
