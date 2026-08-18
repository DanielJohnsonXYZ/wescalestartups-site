#!/usr/bin/env bash
# Paste this whole file into the Hetzner Cloud Console for server dokploy-wss (Steve).
# It restores public booking URLs /daniel/20min and /daniel/60min if the Cal user exists.
# Read-only unless you export APPLY=1 first (this copy applies username/slug fixes).

set -uo pipefail
APPLY="${APPLY:-1}"
EMAIL="${CAL_EMAIL:-daniel@wescalestartups.com}"
EMAIL_ESC=$(printf '%s' "$EMAIL" | sed "s/'/''/g")

echo "=== containers ==="
docker ps --format '{{.Names}}\t{{.Image}}\t{{.Status}}' || { echo "docker not running"; exit 1; }

echo
echo "=== looking for Cal DATABASE_URL ==="
APP=""
DATABASE_URL=""
while read -r c; do
  [ -z "$c" ] && continue
  u=$(docker exec "$c" sh -c 'printenv DATABASE_URL || printenv POSTGRES_URL || true' 2>/dev/null || true)
  case "$u" in
    postgres://*|postgresql://*)
      echo "found in $c"
      APP="$c"
      DATABASE_URL="$u"
      break
      ;;
  esac
done < <(docker ps --format '{{.Names}}' | grep -iE 'cal' || true)

if [ -z "$DATABASE_URL" ]; then
  while read -r c; do
    [ -z "$c" ] && continue
    u=$(docker exec "$c" sh -c 'printenv DATABASE_URL || true' 2>/dev/null || true)
    case "$u" in
      postgres://*|postgresql://*)
        echo "found in $c (wider scan)"
        APP="$c"
        DATABASE_URL="$u"
        break
        ;;
    esac
  done < <(docker ps --format '{{.Names}}')
fi

if [ -z "$DATABASE_URL" ]; then
  echo "No DATABASE_URL on any running container. In Dokploy open the calcom app → Environment."
  exit 1
fi

printf 'app=%s url=' "$APP"
printf '%s\n' "$DATABASE_URL" | sed -E 's#://([^:/]+):[^@]+@#://\1:***@#'

run_sql() {
  local sql="$1"
  if docker exec "$APP" sh -c 'command -v psql' >/dev/null 2>&1; then
    docker exec "$APP" psql "$DATABASE_URL" -c "$sql"
    return
  fi
  docker run --rm --network "container:$APP" postgres:16 \
    psql "$DATABASE_URL" -c "$sql"
}

echo
echo "=== users ==="
run_sql 'SELECT id, username, email, name FROM "users" ORDER BY id;'

echo
echo "=== event types ==="
run_sql 'SELECT id, slug, title, hidden, "userId", "teamId" FROM "EventType" ORDER BY id;'

if [ "$APPLY" != "1" ]; then
  echo "Dry run. Re-run with APPLY=1 to restore username/slugs."
  exit 0
fi

echo
echo "=== restore username daniel + unhide 20min/60min ==="
run_sql "UPDATE \"users\" SET username = 'daniel' WHERE email = '${EMAIL_ESC}';"
run_sql "UPDATE \"Profile\" SET username = 'daniel' WHERE \"userId\" = (SELECT id FROM \"users\" WHERE email = '${EMAIL_ESC}');" || true
run_sql "UPDATE \"EventType\" SET hidden = false WHERE \"userId\" = (SELECT id FROM \"users\" WHERE email = '${EMAIL_ESC}') AND slug IN ('20min','60min');"
run_sql "UPDATE \"EventType\" SET slug = '20min', hidden = false WHERE \"userId\" = (SELECT id FROM \"users\" WHERE email = '${EMAIL_ESC}') AND title ILIKE '%growth audit%' AND title NOT ILIKE '%hour%' AND title NOT ILIKE '%60%';"
run_sql "UPDATE \"EventType\" SET slug = '60min', hidden = false WHERE \"userId\" = (SELECT id FROM \"users\" WHERE email = '${EMAIL_ESC}') AND (title ILIKE '%60%' OR title ILIKE '%1 hour%' OR title ILIKE '%one hour%');"

REDIS=$(docker ps --format '{{.Names}}' | grep -iE 'cal.*redis|redis.*cal' | head -n1 || true)
if [ -n "$REDIS" ]; then
  echo "flushing redis $REDIS"
  docker exec "$REDIS" redis-cli FLUSHALL || true
fi

echo
echo "=== origin check ==="
curl -sS -o /dev/null -w '/daniel/20min %{http_code}\n' --max-time 15 --resolve cal.wescalestartups.com:443:127.0.0.1 https://cal.wescalestartups.com/daniel/20min || \
curl -sS -o /dev/null -w '/daniel/20min %{http_code}\n' --max-time 15 http://127.0.0.1:3000/daniel/20min || true
curl -sS -o /dev/null -w 'public 20min %{http_code}\n' --max-time 15 https://cal.wescalestartups.com/daniel/20min || true

echo "Done. 20min should be HTTP 200. If users table was empty, restore Cal Postgres from R2 backups instead."
