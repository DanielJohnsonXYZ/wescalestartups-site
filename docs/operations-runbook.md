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

Use Dokploy's built-in backup scheduling first. It keeps backup state visible in
the same place operators already use for stacks and alerts, and it avoids
copying live database directories by hand.

### One-time setup

1. R2 → create or retrieve a dedicated S3 API token (Object Read & Write)
   scoped to the `wss-backups` bucket. Note the Access Key ID + Secret.
2. Dokploy → Settings → Destinations → add S3/R2 destination:
   - name: `Cloudflare R2 - wss-backups`
   - bucket: `wss-backups`
   - endpoint: `https://2f53f880d2dd5bf1dc904eabb154f2a7.r2.cloudflarestorage.com`
   - region: `auto`
3. Enable nightly backups and keep the latest 14.
4. Cover every stateful database/volume: Dokploy Postgres/Redis, n8n, Uptime
   Kuma, PingCRM, Postiz, Cal.com, CAP Media MySQL/MinIO, Mautic, Hermes,
   OpenOutreach, and ApplyPilot.
5. Trigger or wait for the first run, then verify an object appears in R2.

### Restore test

An untested backup is not a backup. Monthly, restore the newest backup into a
throwaway location/container and sanity-check at least one database table or
application data directory. Do not restore over production during the test.

### Alternative: restic bundle

```bash
#!/usr/bin/env bash
set -euo pipefail

# --- R2 / restic config (store these outside the script in real use) ---
export AWS_ACCESS_KEY_ID="<r2-access-key>"
export AWS_SECRET_ACCESS_KEY="<r2-secret>"
export RESTIC_REPOSITORY="s3:https://2f53f880d2dd5bf1dc904eabb154f2a7.r2.cloudflarestorage.com/wss-backups"
export RESTIC_PASSWORD="<long-random-passphrase>"   # WITHOUT THIS YOU CANNOT RESTORE

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

# --- 1. Dump databases (consistent snapshots) ---
# Dokploy/Swarm container names will differ; resolve with `docker ps`.
docker exec dokploy-postgres pg_dumpall -U dokploy > "$STAGE/dokploy.sql"
docker exec calcom-db        pg_dumpall -U calcom   > "$STAGE/calcom.sql"
# ...repeat for postiz, pingcrm (postgres) and mautic, cap (mysqldump):
# docker exec <mysql-container> sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > "$STAGE/<name>.sql"

# --- 2. Back up dumps + non-DB named volumes in one snapshot ---
# Volumes live at /var/lib/docker/volumes/<name>/_data. Back up app data
# (uploads, configs, n8n, whatsapp sessions, hermes data) — NOT raw DB volumes
# (the dumps above are the consistent copy).
restic backup \
  "$STAGE" \
  /var/lib/docker/volumes/services_n8n-data/_data \
  /var/lib/docker/volumes/postiz_postiz-uploads/_data \
  /var/lib/docker/volumes/pingcrm-gc2kl3_avatars/_data \
  /var/lib/docker/volumes/pingcrm-gc2kl3_whatsapp_sessions/_data \
  /var/lib/docker/volumes/hermes-gateway_hermes-data/_data \
  --tag nightly

# --- 3. Retention ---
restic forget --prune \
  --keep-daily 7 --keep-weekly 4 --keep-monthly 3
```

Cron (nightly at 03:30, with output mailed/logged):

```bash
# /etc/cron.d/wss-backup
30 3 * * * root /usr/local/sbin/wss-backup.sh >> /var/log/wss-backup.log 2>&1
```

Use this only if Dokploy's built-in backup system is insufficient. It is more
flexible, but it also adds a custom script and a separate restore password to
protect.

Also enable **provider-level daily snapshots** in the Hetzner console for a
cheap whole-box rollback, independent of app backups.

---

## 3. Decommission / removal checklist

Verify before each deletion; these are destructive.

- [ ] **`wescalestartups-static` Dokploy stack** — remove *after* the Pages DNS
      cutover (see `deployment.md`) is verified.
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

## 5. Other standing recommendations

- **Mautic** caused a prior disk-fill outage (MySQL binlogs) and is heavy. The
  disk guard runs every 30 minutes from `/etc/cron.d/wss-disk-guard` and should
  target live container `mautic-stack-db-1`; keep an eye on disk usage and
  binlog growth.
- **Dokploy update** is complete as of 2026-06-17: live image
  `dokploy/dokploy:v0.29.8`.
- **Document owners + acceptable downtime per app**, SSH key ownership, and
  DNS/Cloudflare proxy state — the gaps in Notion §9 are where 3am incidents go
  wrong.
