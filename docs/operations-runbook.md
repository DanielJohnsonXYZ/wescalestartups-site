# WSS Infrastructure — Operations Runbook

Version-controlled companion to the Notion "WSS Infrastructure — Hetzner /
Dokploy Operational Reference" page. Keep this file as the source of truth for
**procedures**; the Notion page is fine for live inventory but tends to drift.

> Scope: the single Hetzner box (`dokploy-wss`, `65.109.232.75`, Finland)
> running Dokploy + Docker Swarm. These steps require SSH/console access that
> CI agents do not have — run them from an operator machine.

---

## 1. Firewall lockdown

**Done 2026-08-10** on server `Steve` (`65.109.232.75`):

- Hetzner Cloud Firewall renamed `coolify-public-web` → **`wss-edge`** (id
  `10854490`). Inbound allow-list only: `22/tcp`, `80/tcp`, `443/tcp`, `icmp`,
  `41641/udp` (Tailscale). Removed legacy Coolify `8000` and Dokploy `3000`
  public allows.
- Host `ufw` installed and enabled (deny inbound by default; allow 22/80/443 +
  `tailscale0`). Extra `iptables` drops on `eth0` for Swarm `2377/7946/4789`
  and Dokploy admin `3000` (localhost still reaches `127.0.0.1:3000`).
- Persist: `/etc/iptables/rules.v4` + `/etc/ufw/after.rules` (`WSS-HARDENING`
  block).

Do **not** re-open `3000` or `8000` on the Hetzner firewall. Manage Dokploy at
`https://dokploy.wescalestartups.com` (Traefik/HTTPS) or via Tailscale/SSH.

---

## 2. Backups → Cloudflare R2

Current state as of 2026-08-10:

- R2 bucket: `wss-backups`
- Dokploy destination: `Cloudflare R2 - wss-backups`
- Endpoint: `https://2f53f880d2dd5bf1dc904eabb154f2a7.r2.cloudflarestorage.com`
- Region: `auto`
- Schedule: root crontab runs `/opt/backup.sh` daily at `02:00 UTC`
- Retention: delete R2 objects older than 14 days
- Log: `/var/log/wss-backup.log`

The native Dokploy `backup` / `volume_backup` schedules are empty. Live coverage
is the host cron script.

Covered database dumps (live stacks):

- Dokploy Postgres
- Cal.com Postgres
- Postiz Postgres
- Postiz Temporal Postgres

Covered volumes (live stacks):

- Dokploy Postgres/Redis + Dokploy data volumes
- Postiz config, Postgres, Redis, uploads, Temporal Postgres
- Cal.com Postgres **and Cal.com Redis** (`calcom_calcom-redis`, added 2026-08-10)
- Hermes data

### Restore test

Monthly, restore the newest backup into a throwaway location (never over
production). Read-only check done 2026-08-10 for
`r2:wss-backups/2026-08-09` Dokploy + Cal.com SQL dumps (`gzip -t` OK).

```bash
mkdir -p /tmp/wss-restore-check
rclone copy r2:wss-backups/YYYY-MM-DD/databases/dokploy-postgres-YYYY-MM-DD.sql.gz /tmp/wss-restore-check/
gzip -t /tmp/wss-restore-check/dokploy-postgres-YYYY-MM-DD.sql.gz
gzip -cd /tmp/wss-restore-check/dokploy-postgres-YYYY-MM-DD.sql.gz | sed -n '1,20p'
```

Also enable **provider-level daily snapshots** in the Hetzner console for a
cheap whole-box rollback, independent of app backups.

---

## 3. Decommission / removal checklist

### Done 2026-08-10 (infra harden)

- [x] **Coolify** — removed `/data/coolify` and leftover compose/env copies.
      No Coolify containers remained. Hetzner firewall no longer named/configured
      for Coolify dashboard port `8000`.
- [x] **Root SSH keys** — pruned to 2 keys only (active ops key +
      `dan@Daniels-MacBook-Air.local`). Removed Coolify, Codex, Cowork, Claude
      sandbox, Caspian, and other agent keys.
- [x] **Dokploy API keys** — deleted all 7 never-expiring agent keys
      (`codex`, `CC`, `ClaudeCode`, `claudecode`, `Claude`, `Claude Cowork`,
      `claudecowork`). Create a new key in the UI only when needed, with expiry.
- [x] **Compose `.env` permissions** — set to `600` under
      `/etc/dokploy/compose/*/code/.env`.
- [x] **Cal.com image pins** — app + Postgres 16 + Redis 7 digest-pinned in
      compose (and Dokploy DB `composeFile`).
- [x] **Dokploy password rotated** — set via host DB using Dokploy’s bcrypt
      hasher. Enable **2FA** in Dokploy → Settings (still off as of harden).

### Done 2026-08-10 (decommission unused stacks)

- [x] **`wescalestartups-static`** — stopped/removed from Dokploy + Traefik.
      Marketing site is Cloudflare Pages only (`www` / apex).
- [x] **`rolo`** — stopped/removed (app, DB volume, Dokploy domain, backup
      dump entry). Compose dirs archived under `/root/wss-decommission-*`.
- [x] **`Mautic` / `comms.wescalestartups.com`** — fully removed (app, worker,
      cron, MySQL, all volumes, Traefik routers, Dokploy compose/domain,
      backup dumps, healthcheck). Also removed `noindex-static`. Archive:
      `/root/wss-decommission-mautic-*`. Delete Cloudflare DNS for `comms`.

### Still optional

- [ ] **Ghost DNS** (Cloudflare) — delete unused names that still point at the
      box or CF: `comms`, `n8n`, `uptime`, `hai`, `applypilot`, `monitor`,
      `outreach-vnc`, `outreach-admin`, `rolo`, and leftover
      `video`/`minio`/`cap` records.
- [ ] **Unused Docker volumes / non-dangling images** — prune with care
      (`docker volume ls`, confirm no stack references each one).
- [ ] **ACME junk** — Traefik `acme.json` still holds certs for retired
      hostnames; safe to leave until those DNS names are gone.
- [ ] **Hetzner Backups** — not free (20% of server ≈ €3–4/mo for `cx43`).
      R2 app backups remain the free path; enable Hetzner Backups only if you
      want whole-VM rollback.

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
- Target: Cal booking page via **Traefik origin** (`--resolve` to `127.0.0.1`),
  path `/daniel/20min`, expects HTTP **200** + booking content. Public HTTPS from
  the server IP often gets Cloudflare bot challenge (`403`), so edge-only checks
  are unreliable from this host.

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

- **Disk guard** runs every 30 minutes from `/etc/cron.d/wss-disk-guard`
  (dead Mautic prune paths removed 2026-08-10).
- **Dokploy** live image: `dokploy/dokploy:v0.29.14` (upgraded 2026-08-10).
  Container must stay on both `dokploy` and `dokploy-network` bridges so it can
  reach Postgres/Redis and Traefik.
- **Healthchecks** hit Traefik on localhost (`--resolve …:127.0.0.1`) for Cal
  `/daniel/20min` + `/daniel/60min`, Postiz, Hermes, Dokploy. Cloudflare bot
  `403` is no longer treated as success for apps on this box. Marketing Pages
  edge may log `WARN edge_cf_challenge` from the server IP.
- **fail2ban** enabled (`sshd` jail). Traefik logs rotate via
  `/etc/logrotate.d/wss-traefik`.
- **Removed** Uptime Kuma + Netdata (unused, no Traefik routes) and leftover
  `rolo-tycuaq_*` Docker networks.
- **Document owners + acceptable downtime per app**, SSH key ownership, and
  DNS/Cloudflare proxy state — the gaps in Notion §9 are where 3am incidents go
  wrong.
- Live Dokploy compose stacks: **Cal.com**, **Hermes Gateway**, **Postiz**,
  **Cal OAuth Home**.
