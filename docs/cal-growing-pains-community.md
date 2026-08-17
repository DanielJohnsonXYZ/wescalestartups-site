# Cal.com: Growing Pains community copy

Paste-ready copy for the self-hosted Cal at `https://cal.wescalestartups.com`.

**Intent:** mention Growing Pains on the Growth Audit event (booking page / calendar invite) and in attendee reminder + follow-up emails.

**Join path:** WhatsApp group (live invite). Slack was named as “Growing Pains Marketing Slack” but no Slack invite URL was provided — do not invent one.

| Field | Value |
| --- | --- |
| Name | Growing Pains |
| What it is | A community for founders to discuss actionable growth |
| WhatsApp | https://chat.whatsapp.com/EcodIBMP93TCl82pTHjEbn |

Site source of truth: `siteConfig.growingPains` in `src/site.ts`. Post-booking page: `/book/thanks`.

If the Growth Audit event type still has **Requires Confirmation** on, the
calendar invite body (and Meet link) are created only after the host accepts.
Pending guests should not be told the call is already on the calendar.

## 1. Event type description (append)

Event types: `Growth Audit` (`/daniel/20min`) and `Growth Audit (1 hour)` (`/daniel/60min`) if present.

In Cal → Event Types → [event] → Description, keep existing copy and append:

```
Growing Pains is a community for founders to discuss actionable growth. Join the WhatsApp group: https://chat.whatsapp.com/EcodIBMP93TCl82pTHjEbn
```

This text also lands on the calendar invite body.

## 2. Reminder emails (append)

Workflows → attendee reminders (24h before and 1h before). Keep existing copy. Before the sign-off, append:

```
If you want a founder community to keep discussing actionable growth after the call, join Growing Pains on WhatsApp: https://chat.whatsapp.com/EcodIBMP93TCl82pTHjEbn
```

Example 24h body after the append:

```
Hi {ATTENDEE_NAME},

Quick reminder: your Growth Audit with Daniel is tomorrow.

When: {EVENT_DATE} at {EVENT_TIME} ({TIMEZONE})
Join: {MEETING_URL}

Before the call, jot the bottleneck you want named — positioning, acquisition, conversion, reporting, or team ownership.

If you want a founder community to keep discussing actionable growth after the call, join Growing Pains on WhatsApp: https://chat.whatsapp.com/EcodIBMP93TCl82pTHjEbn

Reschedule: {RESCHEDULE_URL}
Cancel: {CANCEL_URL}

See you soon,
Daniel
We Scale Startups
```

## 3. Follow-up email (create if missing)

Cal → Workflows → New:

| Field | Value |
| --- | --- |
| Name | Attendee follow-up: Growing Pains |
| Trigger | After event (1 hour is enough; 1 day is fine) |
| Action | Email attendee |
| Template | Custom |
| Attach to | Growth Audit event type(s) |

Subject:

```
After your Growth Audit — Growing Pains founder community
```

Body:

```
Hi {ATTENDEE_NAME},

Thanks for the Growth Audit.

If you want a place to keep discussing actionable growth with other founders, join Growing Pains — a WhatsApp community: https://chat.whatsapp.com/EcodIBMP93TCl82pTHjEbn

Daniel
We Scale Startups
```

## Admin note

Live Cal admin login from this cloud environment is blocked: Cloudflare Bot Fight challenges `POST /api/auth/*` (and often `/event-types`) even when the public login page loads. Apply the copy in the Cal UI from a trusted browser, or via the Cal Postgres `EventType.description` / `WorkflowStep.reminderBody` rows on the Hetzner host.
