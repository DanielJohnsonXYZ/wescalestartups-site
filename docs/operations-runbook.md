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
- Success redirect: `https://wescalestartups.com/book/thanks`
- Stack: `calcom` + Postgres 16 + **Redis 7** (`calcom-redis`, AOF, 128MB cap,
  `REDIS_URL=redis://calcom-redis:6379`) for cache/queues/rate limits
- Old username path `/daniel-wescalestartups.com/*` is redirected by Traefik
  file middleware: `/etc/dokploy/traefik/dynamic/cal-olduser-redirect.yml`
- Availability: Tue/Thu 10:00–18:00 Europe/London (event schedule `20min - Tue/Thu UK`)
- Google Calendar + Google Meet are required for invites; OAuth consent screen
  must stay published (or keep test users) or Meet/calendar sync breaks for
  new bookers outside the test list.
- Pause Calendly (`calendly.com/wescalestartups` and `/20min`) once Cal.com is
  the only public booking surface so Slack/old links cannot create orphan bookings.
- Signup spam accounts on the Cal.com instance were removed (empty locked users
  with no bookings/credentials). Keep `NEXT_PUBLIC_DISABLE_SIGNUP=true`.
- Growing Pains founder community (WhatsApp) belongs on the Growth Audit event
  description plus attendee reminder/follow-up workflows. Paste-ready copy:
  `docs/cal-growing-pains-community.md`. Site mirror after booking: `/book/thanks`.

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

## 6. Postiz (self-hosted social scheduling)

`https://postiz.wescalestartups.com` — Next.js frontend + NestJS backend on the
same origin, on the Hetzner box. Running **v2.21.7** from a locally built
custom image (see 6e); latest upstream is **v2.23.0** (2026-08-04). Reviewed
2026-08-13 → 2026-08-18 from the public internet, Daniel's logged-in session,
and the stack definition in `wss-infra`. 6a is fixed; 6b, 6d and 6e are open.

> **Setup is incomplete, and that matters more than anything below.** As of
> 2026-08-13 the Channels list is empty and the calendar has no scheduled
> posts — no social accounts have been connected, so Postiz cannot publish
> anything yet. The server side is healthy; the app is simply unused. Connect
> one channel and schedule a throwaway post before trusting any of it.

### What is healthy

- Frontend and backend both up. `GET /api/` returns `App is running!`;
  HTTP `:80` 301s to HTTPS.
- Single-origin config is coherent — `backendUrl` and `frontEndUrl` both point
  at `postiz.wescalestartups.com`, so the session cookie is first-party.
- `isSecured: true` (i.e. `NOT_SECURED` is **not** set) → cookies carry
  `Secure`. Correct for production.
- Auth is enforced: `/settings` 307s to `/auth`, `/api/user/self` → 401, and
  `/api/public/v1/posts` → `{"msg":"No API Key found"}`.
- Uploads are served from `/uploads/` with autoindex off (directory → 403,
  missing file → 404).
- `billingEnabled: false` — right for a self-host.
- Only `80` and `443` answer on `65.109.232.75`; `5432`, `6379`, `3306`,
  `3000`, `8080`, `9000` are all closed from outside, consistent with the
  section 1 firewall. Re-verify from an unrestricted host — an egress-filtered
  probe can't distinguish "closed" from "blocked on my side".

### 6a. Registration was open to the internet — FIXED 2026-08-18

`/api/auth/can-register` returned `{"register":true}` and `/auth` served a
complete **Sign Up** form with a live *Create Account* button, so anyone who
reached the host could create an account and their own org.

Fixed in `wss-infra` ([PR #1][postiz-pr1]) by flipping the literal in
`compose/wss-postiz/docker-compose.yml`. Now verified:

```bash
curl -s https://postiz.wescalestartups.com/api/auth/can-register
# {"register":false}
```

`/auth` now renders "Registration is disabled" with a login link;
`/auth/login` still works.

[postiz-pr1]: https://github.com/DanielJohnsonXYZ/wss-infra/pull/1

> **Setting this in Dokploy → Environment does nothing.** The compose file
> hardcoded `DISABLE_REGISTRATION=false` in the service's `environment:`
> block, and a literal there wins over the Dokploy Environment tab. Adding the
> variable in the UI and redeploying ran cleanly and silently re-applied
> `false`. **This trap applies to every variable in that compose file** — to
> change any of them, edit `wss-infra` and let the git push deploy it. A push
> to `wss-infra` `main` auto-deploys via the Dokploy webhook; the flip above
> was live 17 seconds after merge, with no manual redeploy.

Two things that were true at once and are easy to conflate: `register: true`
described the signup form being open to the public, and said nothing about
whether an account existed. Daniel's account existed throughout. That mattered
only because `DISABLE_REGISTRATION` permits signup while the instance has zero
organizations — so the flag is a lock-out risk **only** on an instance nobody
has registered on yet.

### 6b. Indexable by search engines, and missed by the noindex Worker

`/robots.txt` returns the Next.js 404 page, there is no `X-Robots-Tag`, and
neither `/auth` nor `/auth/login` carries a `<meta name="robots">`. The page
title is literally `Postiz Register`. The host is also absent from
`docs/deindex-internal-subdomains.md` (now added).

`postiz` is **DNS-only** (A → `65.109.232.75`), unlike `cal` and the apex which
resolve to Cloudflare. The `wss-noindex-subdomains` Worker only binds routes on
orange-clouded hosts, so it cannot cover Postiz as-is. Either:

1. Orange-cloud `postiz` in Cloudflare DNS, then uncomment/add its route in
   `infra/wss-noindex-subdomains/wrangler.toml` and redeploy — **but read 5d
   first**; or
2. Serve the headers at the origin: add `X-Robots-Tag: noindex, nofollow` and a
   `robots.txt` of `Disallow: /` in the nginx/Traefik layer in front of Postiz.

> **Do not orange-cloud Postiz before fixing the section 5d Page Rule.** Postiz
> is Next.js with RSC payloads and cookie auth — exactly the shape that the
> `*wescalestartups.com/*` Cache Everything rule broke on Cal.com. Proxying
> Postiz while that rule is live will reproduce the same login loop. Option 2
> avoids the question entirely.

### 6c. Google / GitHub OAuth buttons are shown but not configured

```bash
curl -s https://postiz.wescalestartups.com/api/auth/oauth/GOOGLE   # …&client_id=      (empty)
curl -s https://postiz.wescalestartups.com/api/auth/oauth/GITHUB   # …client_id=undefined
```

The *Continue With Google* button renders on both the sign-in and sign-up
screens, so clicking it sends the user to a Google `invalid_client` error. The
Google flow's `redirect_uri` is `/integrations/social/youtube`, which would
have to be registered as an authorised redirect URI in Google Cloud for it to
work at all.

Confirmed from the compose file: neither `GOOGLE_CLIENT_ID` nor
`GITHUB_CLIENT_ID` is set for `postiz-app`. **Resolved as a side effect of
6a** — `DISABLE_REGISTRATION=true` disables the OAuth path, so the dead button
is gone. Re-configuring the client id/secret would bring it back; don't,
unless someone actually wants Google sign-in.

### 6d. No security response headers

`/auth` returns no `Strict-Transport-Security`, `X-Frame-Options` (or CSP
`frame-ancestors`), `X-Content-Type-Options`, or `Referrer-Policy`. For a
session-cookie admin panel, HSTS is the one worth adding. Add it at the same
proxy layer as 6b:

```nginx
add_header Strict-Transport-Security "max-age=31536000" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header X-Robots-Tag "noindex, nofollow" always;
```

If you instead set HSTS with `includeSubDomains` on the apex, it applies to
every `*.wescalestartups.com` host — check them all first.

### 6e. Still open

The stack is defined in `DanielJohnsonXYZ/wss-infra` →
`compose/wss-postiz/docker-compose.yml`. Read that file first — most of what
used to need SSH is answerable from it, and it is where changes must be made
(see the warning in 6a).

- **The publisher is configured, but unproven.** `RUN_CRON=true` is set and the
  single container runs everything under pm2 (`sh -c "nginx && pnpm run pm2"`),
  with Temporal alongside — so the scheduling machinery is enabled, not
  missing. Whether it actually *publishes* is still **untestable end-to-end**:
  with no channels connected there is nothing for it to do, so a healthy worker
  and a dead one look identical. Connect one channel, schedule a throwaway
  post, confirm it lands.
- **Do not "just upgrade Postiz".** The image is `wss-postiz-app:personal-linkedin`
  — a **locally built custom image**, not a stock `ghcr.io/gitroomhq` tag.
  Bumping to upstream 2.23.0 means rebuilding that image, and a naive tag swap
  would silently drop whatever the personal-LinkedIn patch does. There is no
  Dockerfile for it in `wss-infra`; find it before planning any upgrade.
- **LinkedIn and X credentials are already set** (`LINKEDIN_CLIENT_ID/SECRET`,
  `X_API_KEY/SECRET`), so those two channels should connect without further
  provider setup. Token freshness still fails at publish time, not at login.
- **`JWT_SECRET`** comes from `${POSTIZ_JWT_SECRET}` in the Dokploy env, not a
  compose literal — confirm it is long and random.
- **Uploads volume.** `storageProvider: local` with `cloudflareUrl` empty, so
  media sits on the box disk — inside the same disk-fill blast radius that
  Mautic caused before (section 7). Section 2 already lists Postiz uploads in
  the backup set; confirm the backed-up volume is the one actually mounted at
  `UPLOAD_DIRECTORY`. Moving to R2 via `STORAGE_PROVIDER=cloudflare` would take
  it off the box entirely.
- **No uptime monitor exists for Postiz** — Cal has one (5b), Postiz does not.
  Add a Kuma/cron check on `https://postiz.wescalestartups.com/api/` expecting
  the body `App is running!`; a keyword check catches a dead backend behind a
  frontend that still returns 200.

---

## 7. Other standing recommendations

- **Mautic** caused a prior disk-fill outage (MySQL binlogs) and is heavy. The
  disk guard runs every 30 minutes from `/etc/cron.d/wss-disk-guard` and should
  target live container `mautic-stack-db-1`; keep an eye on disk usage and
  binlog growth.
- **Dokploy update** is complete as of 2026-06-17: live image
  `dokploy/dokploy:v0.29.8`.
- **Document owners + acceptable downtime per app**, SSH key ownership, and
  DNS/Cloudflare proxy state — the gaps in Notion §9 are where 3am incidents go
  wrong.
