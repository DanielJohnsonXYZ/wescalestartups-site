# WSS Infrastructure — Operations Runbook

Version-controlled companion to the Notion "WSS Infrastructure — Hetzner /
Dokploy Operational Reference" page. Keep this file as the source of truth for
**procedures**; the Notion page is fine for live inventory but tends to drift.

> Scope: the single Hetzner box (`dokploy-wss`, `65.109.232.75`, Finland)
> running Dokploy + Docker Swarm. These steps require SSH/console access that
> CI agents do not have — run them from an operator machine.

---

## 1. Firewall lockdown (do this first)

The box was observed listening on Docker Swarm ports `2377/tcp`, `7946/tcp+udp`
(and overlay `4789/udp`). These are **cluster-internal** and must never be
reachable from the public internet — `4789` (VXLAN) has no authentication and
`2377` is the swarm control plane. On a single-node swarm they need no public
exposure at all.

Preferred: a **Hetzner Cloud Firewall** (applied at the network edge, outside
the VM) allowing inbound only:

| Port | Proto | Source | Purpose |
|------|-------|--------|---------|
| 22   | TCP   | your IPs / Tailscale only | SSH |
| 80   | TCP   | anywhere | HTTP (redirects to 443) |
| 443  | TCP   | anywhere | HTTPS |

Everything else (2377, 7946, 4789, 3000, DB ports, etc.) = denied inbound.

Host-level backstop with `ufw` (verify it is installed/enabled — section 9 of
the Notion page lists this as unknown):

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp        # tighten to your IP / Tailscale CIDR if possible
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow in on tailscale0   # keep Tailscale admin path
ufw enable
ufw status verbose
```

> Note: Docker can bypass `ufw` via iptables for *published* container ports.
> The Hetzner Cloud Firewall is the reliable control; `ufw` is defense-in-depth.

---

## 2. Backups → Cloudflare R2

Current state as of 2026-06-18:

- R2 bucket: `wss-backups`
- Dokploy destination: `Cloudflare R2 - wss-backups`
- Endpoint: `https://2f53f880d2dd5bf1dc904eabb154f2a7.r2.cloudflarestorage.com`
- Region: `auto`
- Schedule: root crontab runs `/opt/backup.sh` daily at `02:00 UTC`
- Retention: delete R2 objects older than 14 days
- Log: `/var/log/wss-backup.log`
- Previous script backup: `/opt/backup.sh.bak-codex-20260618-001245`

The native Dokploy `backup` and `volume_backup` schedule tables are currently
empty. All live services are Dokploy compose stacks, so the working backup
mechanism is the host cron script plus a Dokploy S3 destination row for
operator visibility.

The script creates database dumps and volume archives before uploading to R2.
The first full run on 2026-06-18 wrote `r2:wss-backups/2026-06-18/` with 32
objects totaling about 3.19 GiB.

Covered database dumps:

- Dokploy Postgres
- Cal.com Postgres
- PingCRM Postgres
- Postiz Postgres
- Postiz Temporal Postgres
- CAP Media MySQL
- Mautic MySQL

Covered volumes:

- Dokploy Postgres/Redis
- n8n
- Uptime Kuma
- PingCRM Postgres, avatars, WhatsApp sessions
- Postiz config, Postgres, Redis, uploads, Temporal Postgres
- Cal.com Postgres
- CAP Media MinIO and MySQL
- Mautic MySQL, config, media files/images
- Hermes data
- OpenOutreach data
- ApplyPilot workspace, home, browser data

### Restore test

An untested backup is not a backup. Monthly, restore the newest backup into a
throwaway location/container and sanity-check at least one database table or
application data directory. Do not restore over production during the test.

Read-only verification:

```bash
rclone lsf r2:wss-backups/2026-06-18 --recursive
rclone size r2:wss-backups/2026-06-18
```

Dry restore pattern:

```bash
mkdir -p /tmp/wss-restore-check
rclone copy r2:wss-backups/2026-06-18/databases/dokploy-postgres-2026-06-18.sql.gz /tmp/wss-restore-check/
gzip -t /tmp/wss-restore-check/dokploy-postgres-2026-06-18.sql.gz
gzip -cd /tmp/wss-restore-check/dokploy-postgres-2026-06-18.sql.gz | sed -n '1,20p'
```

Also enable **provider-level daily snapshots** in the Hetzner console for a
cheap whole-box rollback, independent of app backups.

---

## 3. Decommission / removal checklist

Verify before each deletion; these are destructive.

- [ ] **`wescalestartups-static` Dokploy stack** — remove after the Pages DNS
      cutover has stayed stable long enough to no longer need a Hetzner fallback.
- [ ] **`Cap` stack** (cap.wescalestartups.com, 500 since creation) — see §4.
- [ ] **`calcom-calcom-migrate-1`** — exited one-shot migration container.
- [ ] **Dokploy API keys** — live enabled keys were `claudecowork`,
      `Claude Cowork`, and `Claude` on 2026-06-17. Keep only keys with a
      current owner/use case and add expiry where practical.
- [ ] **Unused Docker volumes / non-dangling images** — prune with care
      (`docker volume ls`, confirm no stack references each one).
- [ ] **Floating `:latest` image tags** — pin to a version/digest on cap-web,
      cap-media-server, minio, uptime-kuma, openoutreach, code-server.
      Cal.com is already digest-pinned in Dokploy compose `solaRKyqDbTFdedKF69nj`.

---

## 4. Screen recording (Cap decision)

The self-hosted `Cap` web stack is currently a known `500`: it is only a bare
`cap-web` image without complete env/DB/storage wiring. CAP Media/MinIO routes
are separate and currently serve the media endpoints. Do not redeploy or remove
Cap until the owner chooses one of these paths:

- **Cap hosted free tier / desktop app** (cap.so) — same product you chose,
  no server to run. Easiest migration: keep the tool, drop the infra.
- **Screenity** — free, open-source browser extension, unlimited local
  recordings, no account, no backend.

- Leave it deferred and documented as broken.
- Properly repair the stack after backups exist.
- Delete the self-hosted Cap pieces and use Cap hosted or Screenity instead.

---

## 5. Cal.com booking (self-hosted)

- Public URL: `https://cal.wescalestartups.com/daniel/20min`
- Site embed + CTAs use `siteConfig.calLink` / `calUrl` in `src/site.ts`
- Success redirect: `https://wescalestartups.com/book/thanks` (append `?status=pending` while Requires Confirmation is on)
- Stack: `calcom` + Postgres 16 + **Redis 7** (`calcom-redis`, AOF, 128MB cap,
  `REDIS_URL=redis://calcom-redis:6379`) for cache/queues/rate limits
- Old username path `/daniel-wescalestartups.com/*` is redirected by Traefik
  file middleware: `/etc/dokploy/traefik/dynamic/cal-olduser-redirect.yml`
- Availability: Tue/Thu 10:00–18:00 Europe/London (event schedule `20min - Tue/Thu UK`)
- Google Calendar + Google Meet are required for invites; OAuth consent screen
  must stay published (or keep test users) or Meet/calendar sync breaks for
  new bookers outside the test list.
- **Requires Confirmation** on `daniel/20min` holds bookings as pending until
  Daniel accepts. Pending bookings do **not** write Google Calendar or Meet.
  See §5e.
- Pause Calendly (`calendly.com/wescalestartups` and `/20min`) once Cal.com is
  the only public booking surface so Slack/old links cannot create orphan bookings.
- Signup spam accounts on the Cal.com instance were removed (empty locked users
  with no bookings/credentials). Keep `NEXT_PUBLIC_DISABLE_SIGNUP=true`.
- Growing Pains founder community (WhatsApp) belongs on the Growth Audit event
  description plus attendee reminder/follow-up workflows. Paste-ready copy:
  `docs/cal-growing-pains-community.md`. Site mirror after booking: `/book/thanks`.

### 5e. Requires Confirmation blocks Google Calendar until the host accepts

Cal.com’s **Requires Confirmation** (opt-in) setting on the Growth Audit event
type (`daniel/20min`) is why a guest can see **Afspraak Verzonden** / “Daniel
Johnson still needs to confirm or decline” and **not** see the slot on Google
Calendar. Pending bookings do not create calendar events or Meet links. After
the host accepts, Cal writes Google Calendar + Meet and emails the invite.

The marketing site never writes calendar events. `/book/thanks` must not claim
the call is on the calendar while the booking is still `PENDING`. Keep
`siteConfig.bookingRequiresHostConfirmation` in `src/site.ts` aligned with the
Cal event-type toggle. While confirmation is on, set the Cal success redirect
to `https://wescalestartups.com/book/thanks?status=pending`.

Live Cal admin login from untrusted IPs is blocked by Cloudflare Bot Fight on
`POST /api/auth/*`. Do the steps below from a trusted browser, not this cloud
environment.

**Confirm a pending booking (do this for the live request)**

1. Open `https://cal.wescalestartups.com` → Bookings → **Unconfirmed**.
2. Confirm (or decline) the row. You can also use the confirm link in the host
   email Cal sent when the request arrived.
3. Check the host Google Calendar and the guest inbox for the invite + Meet link.

Specific request that was missing from calendars:

| Field | Value |
| --- | --- |
| Title | Growth Audit \| Jordy Hartendorp × We Scale Startups |
| When | Tuesday 18 August 2026, 12:00–12:20 Europe/London |
| Guest | Jordy Hartendorp `<j.hartendorp@gmail.com>` |
| Organizer | Daniel Johnson |
| Status when reported | Sent / awaiting organizer |

If the event is still missing **after** confirm, check §5a (OAuth Audience must
be **Published**; Testing mode breaks invites for non-test Gmail), the Google
Calendar app connection, and the destination calendar on the Cal host.

**Turn off Requires Confirmation (instant calendar writes)**

Use this if new Growth Audits should appear on Google Calendar immediately:

1. Cal → Event Types → Growth Audit (`daniel/20min`) → **Advanced**.
2. Turn **Requires Confirmation** off. Repeat for `daniel/60min` if that event
   type exists and should auto-confirm.
3. Set the success redirect to `https://wescalestartups.com/book/thanks`.
4. Set `bookingRequiresHostConfirmation: false` in `src/site.ts` so `/book/thanks`
   defaults to confirmed copy.

### 5d. Cloudflare must not cache or bot-challenge Cal

`NEXTAUTH_URL` / `NEXT_PUBLIC_WEBAPP_URL` are already `https://cal.wescalestartups.com`.
Hitting the origin (`65.109.232.75`) returns HTTP 200 with no 503s. The login /
`/event-types` redirect loop is at the Cloudflare edge, not the Cal container.

A leftover WordPress Page Rule matches **all** hosts:

| Rule | Actions |
| --- | --- |
| `*wescalestartups.com/*` | Cache Everything, edge TTL 7200s |
| `*wescalestartups.com/wp-admin/*` | Bypass cache |
| `*wescalestartups.com/wp-login.php*` | Bypass cache |

That first rule also matches `cal.wescalestartups.com/*`, so Next.js HTML, RSC
payloads, and auth pages get cached. Combined with Bot Fight on `/api/auth/*`,
the app hydrates mismatched HTML, `/api/auth/session` never sticks, and the
client bounces `/event-types` → `/auth/login` in a loop (RSC retries + 503s).

Fix in Cloudflare (then purge `cal.wescalestartups.com`):

1. Narrow Cache Everything to `wescalestartups.com/*` and `www.wescalestartups.com/*` only.
2. Add a higher-priority Page Rule: `cal.wescalestartups.com/*` → Cache Level **Bypass**, Security Level **Essentially Off** (or skip Bot Fight for that hostname).
3. Confirm Bot Fight / Super Bot Fight is not challenging `/api/auth/*` or `/_next/*` on Cal.

### 5a. Publish Google OAuth consent (required for Meet invites)

Google rejected `https://cal.wescalestartups.com/` as the OAuth homepage because it
redirects to login and does not describe the app. Use the public app page instead:

| Consent screen field | Value |
| --- | --- |
| App name | `WSS Calendar` |
| Application home page | `https://cal.wescalestartups.com/wss-calendar` |
| Privacy policy | `https://wescalestartups.com/privacy` |
| Terms of Service | `https://wescalestartups.com/terms` |
| Authorised domains | `wescalestartups.com` |
| Logo | omit unless you want branding verification |

Do **not** use `https://cal.wescalestartups.com/` (that redirects to login). Use the
`/wss-calendar` path. That page is served as a public static HTML document on the
Cal host (`/etc/dokploy/compose/cal-oauth-home`) and must show **WSS Calendar**
as the main heading with no login wall. The marketing site mirror is
`https://wescalestartups.com/wss-calendar` after PR merge.

Google Cloud Console → the project whose OAuth client is in
`GOOGLE_API_CREDENTIALS` on the Cal.com stack:

1. Open `https://cal.wescalestartups.com/wss-calendar` in an incognito window —
   confirm no login and the H1 is **WSS Calendar**.
2. Open [Google Auth Platform → Branding](https://console.cloud.google.com/auth/branding)
   and set the fields in the table above. Save.
3. Open [Audience](https://console.cloud.google.com/auth/audience). User type **External**.
   If status is **Testing**, click **Publish app** (or resubmit verification).
4. Confirm scopes still include Calendar + Meet for the Cal.com host connection.
5. Book a test slot from a non-test Gmail and confirm the calendar invite + Meet link arrive.

### 5b. Booking URL uptime monitor

**Cloudflare Health Checks require Pro+.** On the Free plan the API returns
`health checks disabled for zone`. Upgrade `wescalestartups.com` to Pro, then
create a check (or run `scripts/create-cal-cloudflare-healthcheck.sh` with a
token that has Zone → Health Checks → Edit).

Until then, a host cron monitor runs on the Hetzner box:

- Script: `/opt/wss-monitors/cal-booking-check.sh`
- Cron: `/etc/cron.d/wss-cal-booking-monitor` (every 2 minutes)
- Alert: Dokploy Slack webhook (`WSS Alerts`) on down / recovery
- Target: `https://cal.wescalestartups.com/daniel/20min` (expects HTTP 200)

### 5c. Lead-capture health probe

HTTP 200 on `/api/forms` is not a success signal — the abuse guard soft-rejects
with `{"ok":true}` and a broken Customer.io write can look identical in the
browser. The probe POSTs the synthetic profile and requires `"form_id"` in the
JSON body.

- Script (repo): `scripts/lead-capture-check.sh` (v2)
- Install on Hetzner: copy to `/opt/wss-monitors/lead-capture-check.sh`.
  Set `SLACK_WEBHOOK` **inside the cron line** — cron does not inherit shell
  env, and v1 aborted before probing when it was unset. v2 treats the webhook
  as optional (failures still go to the logfile + cron mail).

```cron
# /etc/cron.d/wss-cal-booking-monitor — keep existing interval; append lead capture
*/2 * * * * root SLACK_WEBHOOK='…' /opt/wss-monitors/cal-booking-check.sh
*/5 * * * * root SLACK_WEBHOOK='…' /opt/wss-monitors/lead-capture-check.sh
```

- Logfile: `/var/log/wss-lead-capture.log` (falls back to `/tmp/…` if
  unwritable). Every run writes an `OK` or `ALERT` line — use this (or the
  synthetic profile’s `source_page` stamp in Customer.io) to confirm cron is
  live.
- Synthetic email: `monitor+run@wescalestartups.com` (Customer.io `cio_id`
  `b6f30d00e205e305`) — permanently unsubscribed, `monitor=true`, marked
  “Never a lead”. Do not swap in a real address.
- Targets: `POST /api/forms` and `POST /api/booked` on `wescalestartups.com`
- Pass: response body contains `"form_id"` (Customer.io accepted the write)
- Fail (Slack / stderr / logfile): bare `{"ok":true}` (abuse guard), CIO
  rejection, HTML/502 edge crash, empty body, or Cloudflare Bot Fight
  challenge page
- Leave `TURNSTILE_ENFORCE` off until every form ships a widget. When you turn
  it on: set `FORM_MONITOR_SECRET` on Cloudflare Pages (Production) and in the
  cron env; the probe sends `X-WSS-Monitor`. Turnstile is skipped only for
  that secret + the synthetic email.
- Allowlist the Hetzner egress IP (or skip Bot Fight) for those two POSTs so
  the probe is not challenged with a managed interstitial.

Dashboard path after Pro upgrade: Cloudflare → **Traffic → Health Checks** →
**Create**:

| Field | Value |
| --- | --- |
| Name | `cal-growth-audit` |
| Address | `cal.wescalestartups.com` |
| Protocol | HTTPS |
| Path | `/daniel/20min` |
| Port | 443 |
| Expected codes | `200` |
| Interval | 60s (or plan minimum) |
| Retries | 2 |
| Follow redirects | on |
| Notification | email `daniel@wescalestartups.com` and/or existing Slack webhook |

API equivalent (needs a token with `Health Checks:Edit` + zone read):

```bash
export CLOUDFLARE_API_TOKEN=...   # create at dash.cloudflare.com/profile/api-tokens
ZONE_ID=$(curl -s -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/zones?name=wescalestartups.com" \
  | python3 -c "import sys,json; print(json.load(sys.stdin)['result'][0]['id'])")

curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/healthchecks" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "cal-growth-audit",
    "address": "cal.wescalestartups.com",
    "type": "HTTPS",
    "check_regions": ["WEU", "EEU"],
    "http_config": {
      "path": "/daniel/20min",
      "port": 443,
      "method": "GET",
      "expected_codes": ["200"],
      "follow_redirects": true,
      "allow_insecure": false
    },
    "interval": 60,
    "retries": 2,
    "timeout": 10,
    "suspended": false
  }'
```

Then add a Notification policy for Health Check status in
**Notifications → Add → Health Checks status notification**.

## 6. Other standing recommendations

- **Mautic** caused a prior disk-fill outage (MySQL binlogs) and is heavy. The
  disk guard runs every 30 minutes from `/etc/cron.d/wss-disk-guard` and should
  target live container `mautic-stack-db-1`; keep an eye on disk usage and
  binlog growth.
- **Dokploy update** is complete as of 2026-06-17: live image
  `dokploy/dokploy:v0.29.8`.
- **Document owners + acceptable downtime per app**, SSH key ownership, and
  DNS/Cloudflare proxy state — the gaps in Notion §9 are where 3am incidents go
  wrong.
