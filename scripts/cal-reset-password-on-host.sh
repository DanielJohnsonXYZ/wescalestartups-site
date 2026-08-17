#!/usr/bin/env bash
# cal-reset-password-on-host.sh — inspect / set the Cal.com login on dokploy-wss
#
# Cal.com's POST /api/auth/forgot-password ALWAYS returns
#   {"message":"password_reset_email_sent"}
# even when the user does not exist (verified with a fake address). A missing
# inbox is therefore not a mail-server mystery until you have checked that
# daniel@wescalestartups.com is actually in Postgres.
#
# Run ON the Hetzner box (needs docker). This environment cannot SSH there.
#
# Inspect only:
#   ./scripts/cal-reset-password-on-host.sh
#
# Set a new password (user must already exist):
#   APPLY=1 CAL_NEW_PASSWORD='choose-a-long-password' ./scripts/cal-reset-password-on-host.sh
#
# If the user row is missing, restore Cal.com Postgres from R2 — do not INSERT
# a blank user (Google Calendar / Meet credentials will be gone).

set -uo pipefail

EMAIL="${CAL_EMAIL:-daniel@wescalestartups.com}"
APPLY="${APPLY:-0}"
NEW_PASSWORD="${CAL_NEW_PASSWORD:-}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Run this on dokploy-wss (docker required)." >&2
  echo "This environment cannot SSH to 65.109.232.75 — paste the command there." >&2
  exit 1
fi

APP_CANDIDATES=$(docker ps --format '{{.Names}}' | grep -iE 'calcom|cal-com|cal_com' | grep -viE 'redis|postgres|db|migrate' || true)
DB_CANDIDATES=$(docker ps --format '{{.Names}}' | grep -iE 'cal.*postgres|cal.*db|postgres.*cal' || true)

if [ -z "$APP_CANDIDATES" ] && [ -z "$DB_CANDIDATES" ]; then
  echo "No Cal.com containers. docker ps and check the Dokploy calcom stack." >&2
  docker ps --format '{{.Names}}\t{{.Image}}\t{{.Status}}'
  exit 1
fi

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
  echo "Could not read DATABASE_URL from a Cal.com app container." >&2
  echo "app: ${APP_CANDIDATES:-<none>}  db: ${DB_CANDIDATES:-<none>}" >&2
  exit 1
fi

echo "app container: ${APP:-<none>}"
printf 'DATABASE_URL: '; printf '%s\n' "$DATABASE_URL" | sed -E 's#://([^:/]+):[^@]+@#://\1:***@#'

run_sql() {
  local sql="$1"
  if [ -n "$APP" ] && docker exec "$APP" sh -c 'command -v psql' >/dev/null 2>&1; then
    docker exec -e DATABASE_URL="$DATABASE_URL" "$APP" psql "$DATABASE_URL" -At -c "$sql"
    return
  fi
  local dbc
  dbc=$(printf '%s\n' "$DB_CANDIDATES" | awk 'NF{print; exit}')
  if [ -n "$dbc" ]; then
    docker exec -e DATABASE_URL="$DATABASE_URL" "$dbc" psql "$DATABASE_URL" -At -c "$sql"
    return
  fi
  echo "No psql in app or db container." >&2
  return 1
}

run_sql_pretty() {
  local sql="$1"
  if [ -n "$APP" ] && docker exec "$APP" sh -c 'command -v psql' >/dev/null 2>&1; then
    docker exec -e DATABASE_URL="$DATABASE_URL" "$APP" psql "$DATABASE_URL" -c "$sql"
    return
  fi
  local dbc
  dbc=$(printf '%s\n' "$DB_CANDIDATES" | awk 'NF{print; exit}')
  docker exec -e DATABASE_URL="$DATABASE_URL" "$dbc" psql "$DATABASE_URL" -c "$sql"
}

EMAIL_ESC=$(printf '%s' "$EMAIL" | sed "s/'/''/g")

echo
echo "--- users ---"
run_sql_pretty 'SELECT id, username, email, name FROM "users" ORDER BY id;' 2>/dev/null || \
  run_sql_pretty 'SELECT id, username, email, name FROM users ORDER BY id;'

echo
echo "--- ResetPasswordRequest for ${EMAIL} (row means the user existed when we POSTed forgot-password) ---"
run_sql_pretty "SELECT id, email, \"expires\" FROM \"ResetPasswordRequest\" WHERE email = '${EMAIL_ESC}' ORDER BY \"expires\" DESC LIMIT 5;" 2>/dev/null || \
  echo "(no ResetPasswordRequest table, or query failed)"

USER_ID=$(run_sql "SELECT id FROM \"users\" WHERE email = '${EMAIL_ESC}' LIMIT 1;" 2>/dev/null || true)
USER_ID=$(printf '%s' "$USER_ID" | tr -d '[:space:]')

if [ -z "$USER_ID" ]; then
  echo
  echo "NO USER for ${EMAIL}."
  echo "That is why no reset email arrived — Cal.com still answers"
  echo "password_reset_email_sent so attackers cannot enumerate accounts."
  echo
  echo "Do not INSERT a blank user. Restore Cal.com Postgres from R2 (§2 / §5e C),"
  echo "then re-run this script with APPLY=1 CAL_NEW_PASSWORD=..."
  exit 2
fi

echo
echo "User ${EMAIL} exists as id=${USER_ID}."
echo "If ResetPasswordRequest is empty, SMTP never queued a mail (EMAIL_FROM / EMAIL_SERVER)."
echo "If a request row exists, check spam and Cal.com logs for send failures."

if [ "$APPLY" != "1" ]; then
  echo
  echo "Dry run. To set a password:"
  echo "  APPLY=1 CAL_NEW_PASSWORD='...' $0"
  exit 0
fi

if [ ${#NEW_PASSWORD} -lt 12 ]; then
  echo "CAL_NEW_PASSWORD must be at least 12 characters." >&2
  exit 1
fi

if [ -z "$APP" ]; then
  echo "Need the Cal.com app container to hash the password with bcrypt." >&2
  exit 1
fi

HASH=$(docker exec -e CAL_NEW_PASSWORD="$NEW_PASSWORD" "$APP" node -e '
const pw = process.env.CAL_NEW_PASSWORD;
function load() {
  for (const m of ["bcryptjs", "bcrypt", "@node-rs/bcrypt"]) {
    try { return require(m); } catch (_) {}
  }
  throw new Error("no bcrypt module in Cal.com image");
}
const bcrypt = load();
const hashFn = bcrypt.hashSync || ((p, r) => bcrypt.hash(p, r));
Promise.resolve(hashFn.call(bcrypt, pw, 12)).then((h) => process.stdout.write(String(h)));
') || {
  echo "Failed to bcrypt-hash the password inside ${APP}." >&2
  exit 1
}

if [ ${#HASH} -lt 20 ]; then
  echo "Hash looked wrong (len ${#HASH}). Not writing it." >&2
  exit 1
fi

HASH_ESC=$(printf '%s' "$HASH" | sed "s/'/''/g")

echo "Writing password hash for user id=${USER_ID} (not printed)."

# Newer Cal.com: UserPassword.hash. Older: users.password.
if run_sql "SELECT 1 FROM information_schema.tables WHERE table_name = 'UserPassword';" | grep -q 1; then
  run_sql "INSERT INTO \"UserPassword\" (hash, \"userId\") VALUES ('${HASH_ESC}', ${USER_ID})
           ON CONFLICT (\"userId\") DO UPDATE SET hash = EXCLUDED.hash;"
else
  run_sql "UPDATE \"users\" SET password = '${HASH_ESC}' WHERE id = ${USER_ID};"
fi

run_sql "UPDATE \"users\" SET username = 'daniel' WHERE id = ${USER_ID} AND (username IS NULL OR username <> 'daniel');" || true

echo "Password updated for ${EMAIL}. Log in at https://cal.wescalestartups.com/auth/login"
echo "Then fix event slugs 20min / 60min (runbook §5e)."
echo "Flush Cal Redis after login if /daniel still 404s."
