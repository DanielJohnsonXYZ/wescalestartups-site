# Durable lead capture deployment

The four structured site forms post JSON to the same-origin Cloudflare Pages Function at `/api/enquiry`. The function acknowledges success only after the complete validated payload has been stored.

## Required binding

Create a Cloudflare KV namespace and bind it to the Pages project as `LEADS` in preview and production. Do not deploy the form changes without this binding: the endpoint intentionally returns HTTP 503 when storage is unavailable, and the UI presents an email fallback without claiming the enquiry was sent.

Stored keys expire after 90 days by default. Set `LEAD_RETENTION_DAYS` to an integer from 1–365 only after privacy review.

## Optional delivery integrations

These variables send an operator notification through Resend after the durable write:

- `RESEND_API_KEY`
- `LEAD_NOTIFICATION_TO`
- `LEAD_NOTIFICATION_FROM` (must be a verified sender)

Current non-secret configuration sends from `notifications@wescalestartups.com` to `daniel@wescalestartups.com`. The Resend key remains an encrypted Cloudflare secret in both environments and must never be committed.

The Function reuses the existing `PUBLIC_MAUTIC_BASE_URL` and `PUBLIC_MAUTIC_NEWSLETTER_FORM_ID` bindings to forward the submitter's email and source metadata. `MAUTIC_FORM_URL` and `MAUTIC_FORM_ID` remain supported as explicit overrides.

- `MAUTIC_FORM_URL`
- `MAUTIC_FORM_ID`

Notification and Mautic delivery are asynchronous. Their failure does not erase or duplicate the stored lead.

## Release checklist

1. Create/bind `LEADS` in preview.
2. Configure preview notification variables and a clearly labelled test recipient.
3. Deploy preview and test invalid, valid, duplicate-retry, storage-unavailable, and notification-failure states.
4. Confirm the KV record contains the full form context and expires at the approved interval.
5. Confirm the browser emits `form_submit` only after HTTP 202 and `form_error` on failure, with no PII in the data layer.
6. Repeat with one approved production audit submission, remove the record, and redact evidence.

Never expose KV IDs, API keys, notification addresses, or form payloads in client code or analytics.
