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
      cap-media-server, minio, uptime-kuma, cal.com, openoutreach, code-server.

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

## 5. OpenOutreach

OpenOutreach (`github.com/eracle/OpenOutreach`) is a self-hosted, Dockerized
Django app for AI-driven B2B lead-gen: it drives a real browser over **VNC**
(Playwright) to run LinkedIn discovery/outreach, with an optional SMTP email
channel. It runs as a Dokploy compose stack on the box. Its state lives in a
single data volume (SQLite at `data/db.sqlite3`), already captured by the R2
backup as "OpenOutreach data" (§2).

Because it embeds a browser logged into a LinkedIn account and a Django admin,
the **exposure surface is the main thing to get right** on a public host.

### Setup / health checklist

Run from an operator machine with SSH to the box (CI agents cannot reach it).

- [ ] **Stack is up.** `docker ps | grep -i openoutreach` shows a running,
      non-restarting container.
- [ ] **Data volume is mounted and matches the backup.** Confirm the volume the
      stack mounts (the container's `data/`) is the same one the backup script
      archives as "OpenOutreach data". A backup of the wrong/empty volume is
      worse than none. Verify a recent object exists:
      `rclone lsf r2:wss-backups/<latest-date>/volumes | grep -i openoutreach`.
- [ ] **VNC and admin are NOT publicly reachable.** The container exposes VNC
      (`5900`, `6080`) and Django admin (`8000`). Unauthenticated VNC on a public
      IP = full remote control of a browser session that is signed into LinkedIn.
      Check what is actually bound to the public interface:
      `ss -tlnp | grep -E '5900|6080|8000'` — these should be bound to
      `127.0.0.1`/Tailscale only, or fronted by Traefik with auth, never `0.0.0.0`.
      Cross-check against the Hetzner Cloud Firewall (§1): only 22/80/443 inbound.
- [ ] **Image tag is pinned.** §3 flags `openoutreach` as still on floating
      `:latest`. Pin to a specific `ghcr.io/eracle/openoutreach` digest so a
      redeploy can't silently pull a breaking image.
- [ ] **Secrets are set in Dokploy env, not committed anywhere.** Required:
      LinkedIn account credentials and an LLM API key (OpenAI/Anthropic). Optional
      (email channel): BetterContact email-finder key and SMTP mailbox creds.
- [ ] **LinkedIn session is healthy.** Via the (private) VNC view, confirm the
      session is logged in and not sitting on a checkpoint/challenge — a blocked
      session silently stalls all outreach.
- [ ] **If the SMTP channel is enabled: sending domain is warmed and
      authenticated.** SPF, DKIM, and DMARC on the sending domain, with
      conservative daily pacing caps. Cold volume from an unauthenticated domain
      burns both the domain and the LinkedIn account.

### Known-good vs. gaps (as of this review)

- ✅ Data volume is in the R2 backup set (§2).
- ❌ Still on a floating `:latest` tag (§3) — pin it.
- ⚠️ VNC/admin exposure, secret storage, and (if used) email deliverability are
  not yet recorded here; verify them against the checklist above and note the
  results so the next operator isn't guessing.

---

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
