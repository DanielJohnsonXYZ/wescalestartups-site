#!/usr/bin/env bash
# cal-booking-diagnose.sh — find why Cal booking URLs 404
#
# Run on the Hetzner box (dokploy-wss) with Docker access. The HTTP probes
# also work from anywhere: they hit origin 65.109.232.75 directly.
#
# This script is read-only. It does not change Cal.com data.
# Restore steps: docs/operations-runbook.md §5e.

set -uo pipefail

ORIGIN_IP="${CAL_ORIGIN_IP:-65.109.232.75}"
HOST="${CAL_HOST:-cal.wescalestartups.com}"
UA='WSS-cal-booking-diagnose/1.0'
CODE_20=""
CODE_60=""

probe() {
  local path="$1"
  local tmp http title
  tmp=$(mktemp)
  http=$(curl -sS -o "$tmp" -m 20 \
    --resolve "${HOST}:443:${ORIGIN_IP}" \
    -A "$UA" \
    -w '%{http_code}' \
    "https://${HOST}${path}" || printf '000')
  title=$(python3 -c "import re,sys; t=open(sys.argv[1],errors='replace').read(); m=re.search(r'<title[^>]*>(.*?)</title>', t, re.I|re.S); print((m.group(1).strip() if m else '')[:90])" "$tmp" 2>/dev/null || true)
  printf '%-42s %s  %s\n' "$path" "$http" "$title"
  rm -f "$tmp"
  case "$path" in
    /daniel/20min) CODE_20=$http ;;
    /daniel/60min) CODE_60=$http ;;
  esac
}

booking_exit() {
  if [ "${CODE_20}" = "200" ] && [ "${CODE_60}" = "200" ]; then
    exit 0
  fi
  echo
  echo "FAIL: booking paths are not HTTP 200 (20min=${CODE_20:-?} 60min=${CODE_60:-?})."
  echo "Restore username/slugs — docs/operations-runbook.md §5e."
  exit 1
}

echo "=== origin HTTP (${ORIGIN_IP}) ==="
echo "A working booking page is HTTP 200. HTTP 404 with title"
echo "'404: This page could not be found. | We Scale Startups' means Cal.com"
echo "is up but the username or event slug is missing."
echo
for p in \
  /auth/login \
  /wss-calendar \
  /event-types \
  /daniel \
  /daniel/20min \
  /daniel/60min \
  /20min \
  /60min \
  ; do
  probe "$p"
done

echo
echo "=== Docker Cal.com / Postgres (Hetzner only) ==="
if ! command -v docker >/dev/null 2>&1; then
  echo "docker not available here. SSH to dokploy-wss and re-run."
  booking_exit
fi

echo "--- containers matching cal / postgres ---"
docker ps --format '{{.Names}}\t{{.Image}}\t{{.Status}}' | grep -iE 'cal|postgres' || {
  echo "No matching containers. Is the Cal.com stack running?"
  exit 1
}

# Prefer DATABASE_URL from the Cal.com app container.
APP_CANDIDATES=$(docker ps --format '{{.Names}}' | grep -iE 'calcom|cal-com|cal_com' | grep -viE 'redis|postgres|db|migrate' || true)
DB_CANDIDATES=$(docker ps --format '{{.Names}}' | grep -iE 'cal.*postgres|cal.*db|postgres.*cal' || true)

echo
echo "app containers: ${APP_CANDIDATES:-<none>}"
echo "db containers:  ${DB_CANDIDATES:-<none>}"

DATABASE_URL=""
APP=""
for c in $APP_CANDIDATES; do
  DATABASE_URL=$(docker exec "$c" sh -c 'printenv DATABASE_URL || printenv POSTGRES_URL || true' 2>/dev/null || true)
  if [ -n "$DATABASE_URL" ]; then
    APP="$c"
    break
  fi
done

if [ -z "$DATABASE_URL" ]; then
  echo
  echo "Could not read DATABASE_URL from a Cal.com app container."
  echo "In Dokploy → calcom → Environment, copy DATABASE_URL and run:"
  echo "  docker exec -i <postgres-container> psql \"\$DATABASE_URL\" -c 'SELECT id, username, email FROM users;'"
  booking_exit
fi

echo
echo "Using DATABASE_URL from container: $APP"
echo "(password redacted below)"
printf '%s\n' "$DATABASE_URL" | sed -E 's#://([^:/]+):[^@]+@#://\1:***@#'

run_sql() {
  local sql="$1"
  # psql may live on the app image or the db image. Try both.
  if [ -n "$APP" ] && docker exec "$APP" sh -c 'command -v psql' >/dev/null 2>&1; then
    docker exec -e DATABASE_URL="$DATABASE_URL" "$APP" \
      psql "$DATABASE_URL" -c "$sql"
    return
  fi
  local dbc
  dbc=$(printf '%s\n' "$DB_CANDIDATES" | awk 'NF{print; exit}')
  if [ -n "$dbc" ]; then
    docker exec -e DATABASE_URL="$DATABASE_URL" "$dbc" \
      psql "$DATABASE_URL" -c "$sql"
    return
  fi
  echo "No psql binary found. Install postgresql-client on the host or exec into the db container."
  return 1
}

echo
echo "--- users (username must be exactly 'daniel' for public /daniel/* URLs) ---"
run_sql 'SELECT id, username, email, name FROM "users" ORDER BY id;' || \
  run_sql 'SELECT id, username, email, name FROM users ORDER BY id;'

echo
echo "--- event types (need slugs 20min and 60min, hidden = false) ---"
run_sql 'SELECT id, slug, title, hidden, "userId", "teamId" FROM "EventType" ORDER BY id;'

echo
echo "--- profiles (org-era Cal.com; public pages can key off this username) ---"
run_sql 'SELECT id, username, "userId", "organizationId" FROM "Profile" ORDER BY id;' 2>/dev/null || \
  echo "(no Profile table — fine on older Cal.com)"

echo
echo "Next: docs/operations-runbook.md §5e (restore username + event slugs, then flush Redis)."
booking_exit
