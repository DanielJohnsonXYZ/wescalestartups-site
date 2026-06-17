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

## 2. Backups → Cloudflare R2 ("one nightly job" — done safely)

Yes, a single nightly job is an appropriate RPO here. The catch: **you cannot
just copy live database volume directories** — a hot Postgres/MySQL data dir
copied mid-write is corrupt on restore. The safe "one big nightly update" is:
dump each database to a file, then push dumps + the non-DB volumes to R2 in one
shot. `restic` does this with encryption, dedup, and retention built in.

### One-time setup

1. R2 → create an **API token** (Object Read & Write) scoped to the backup
   bucket. Note the Access Key ID + Secret.
2. Recreate the backup bucket in an **EU region** (currently `wss-backups` is
   APAC — wrong continent for a Finland server: slower restores, cross-region
   egress, and EU data sitting outside the EU). e.g. `wss-backups-eu` in EEUR.
3. Put the script below at `/usr/local/sbin/wss-backup.sh`, fill the env, and
   `chmod +x` it. Initialize the repo once: `restic init`.

```bash
#!/usr/bin/env bash
set -euo pipefail

# --- R2 / restic config (store these outside the script in real use) ---
export AWS_ACCESS_KEY_ID="<r2-access-key>"
export AWS_SECRET_ACCESS_KEY="<r2-secret>"
export RESTIC_REPOSITORY="s3:https://<accountid>.r2.cloudflarestorage.com/wss-backups-eu"
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

### Restore test (an untested backup is not a backup)

Monthly, prove it works:

```bash
restic snapshots                          # confirm last night exists
restic restore latest --target /tmp/restore-test --include /tmp/.../calcom.sql
# then load the dump into a throwaway container and sanity-check a table.
```

> Alternative: Dokploy's built-in backups (Settings → Destinations → add the R2
> bucket, then enable per-database + per-volume backups). Same outcome, less
> scripting, but it backs up per-service rather than as one bundle and only
> handles named volumes (not bind mounts). Either is fine — pick one and verify
> a restore.

Also enable **provider-level daily snapshots** in the Hetzner console for a
cheap whole-box rollback, independent of app backups.

---

## 3. Decommission / removal checklist

Verify before each deletion; these are destructive.

- [ ] **`wescalestartups-static` Dokploy stack** — remove *after* the Pages DNS
      cutover (see `deployment.md`) is verified.
- [ ] **`Cap` stack** (cap.wescalestartups.com, 500 since creation) — see §4.
- [ ] **`calcom-calcom-migrate-1`** — exited one-shot migration container.
- [ ] **Dokploy API keys `codex-2026-05-19`, `codec`** — unused, revoke.
- [ ] **Unused Docker volumes / non-dangling images** — prune with care
      (`docker volume ls`, confirm no stack references each one).
- [ ] **Floating `:latest` image tags** — pin to a version/digest on cap-web,
      cap-media-server, minio, uptime-kuma, cal.com, openoutreach, code-server.

---

## 4. Screen recording (Cap replacement)

The self-hosted `Cap` + CAP Media stack (cap-web + media-server + MinIO +
MySQL = 4 containers, broken since creation) is the heaviest, most fragile thing
on the box for a feature that free tools cover with zero ops:

- **Cap hosted free tier / desktop app** (cap.so) — same product you chose,
  no server to run. Easiest migration: keep the tool, drop the infra.
- **Screenity** — free, open-source browser extension, unlimited local
  recordings, no account, no backend.

Recommendation: delete the self-hosted Cap + CAP Media stacks and use Cap's
hosted free tier (or Screenity for quick clips). This reclaims 4 containers,
a MySQL + MinIO, and removes a standing 500.

---

## 5. Other standing recommendations

- **Mautic** caused a prior disk-fill outage (MySQL binlogs) and is heavy —
  keep an eye on disk usage and binlog growth, and confirm the disk-guard cron
  still runs.
- **Finish Dokploy update** v0.29.4 → v0.29.8 from the in-UI Update button
  (the API trigger does not swap the image).
- **Document owners + acceptable downtime per app**, SSH key ownership, and
  DNS/Cloudflare proxy state — the gaps in Notion §9 are where 3am incidents go
  wrong.
