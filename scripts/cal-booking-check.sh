#!/usr/bin/env bash
# cal-booking-check.sh — WSS Cal.com public booking uptime probe
#
# WHY THIS EXISTS
# The Growth Audit URLs live on self-hosted Cal.com, not this Astro repo.
# When the username or event slugs disappear, /book embeds a 404 and Slack
# floods with "WSS health FAIL: Cal booking → HTTP 404 (origin …)".
#
# The probe hits the origin IP (bypassing Cloudflare Bot Fight) so a CF
# challenge cannot masquerade as a booking outage. Pass = HTTP 200.
# A Cal.com Next.js 404 page is a real miss (user or event type gone).
#
# INSTALL on Hetzner (same cron file as lead-capture):
#   install -m 0755 scripts/cal-booking-check.sh /opt/wss-monitors/cal-booking-check.sh
#   */5 * * * * root SLACK_WEBHOOK='https://hooks.slack.com/services/XXX' /opt/wss-monitors/cal-booking-check.sh
#
# ALERTS
# Default: Slack on state change, plus a reminder every REMIND_EVERY failures
# (12 × 5 min ≈ hourly). Set ALERT_ON_EVERY_FAIL=1 to match the old flood.

set -uo pipefail

SLACK_WEBHOOK="${SLACK_WEBHOOK:-}"
LOGFILE="${LOGFILE:-/var/log/wss-cal-booking.log}"
STATE_FILE="${STATE_FILE:-/var/lib/wss-monitors/cal-booking.state}"
ORIGIN_IP="${CAL_ORIGIN_IP:-65.109.232.75}"
HOST="${CAL_HOST:-cal.wescalestartups.com}"
ALERT_ON_EVERY_FAIL="${ALERT_ON_EVERY_FAIL:-0}"
REMIND_EVERY="${REMIND_EVERY:-12}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"

if ! { : >>"$LOGFILE"; } 2>/dev/null; then
  LOGFILE="${TMPDIR:-/tmp}/wss-cal-booking.log"
fi

state_dir=$(dirname "$STATE_FILE")
if ! mkdir -p "$state_dir" 2>/dev/null || ! { : >>"$STATE_FILE"; } 2>/dev/null; then
  STATE_FILE="${TMPDIR:-/tmp}/wss-cal-booking.state"
fi

log() { printf '%s %s\n' "$STAMP" "$1" >>"$LOGFILE"; }

slack() {
  local msg="$1"
  [ -n "$SLACK_WEBHOOK" ] || return 0
  local esc
  esc=$(printf '%s' "$msg" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g' | tr -d '\n')
  curl -s -m 15 -X POST "$SLACK_WEBHOOK" \
    -H 'Content-Type: application/json' \
    -d "{\"text\":\"${esc}\"}" >/dev/null
}

read_state() {
  local key="$1"
  awk -F= -v k="$key" '$1==k {print $2; exit}' "$STATE_FILE" 2>/dev/null
}

write_state() {
  local key="$1" val="$2"
  local tmp
  tmp=$(mktemp)
  if [ -f "$STATE_FILE" ]; then
    awk -F= -v k="$key" '$1!=k {print}' "$STATE_FILE" >"$tmp"
  fi
  printf '%s=%s\n' "$key" "$val" >>"$tmp"
  mv "$tmp" "$STATE_FILE"
}

# GET via origin IP. Follows redirects. Returns HTTP code on stdout.
probe() {
  local path="$1"
  curl -sS -o /dev/null -m 20 \
    --resolve "${HOST}:443:${ORIGIN_IP}" \
    -A 'WSS-cal-booking-check/1.0' \
    -w '%{http_code}' \
    "https://${HOST}${path}" || printf '000'
}

check_path() {
  local label="$1" path="$2"
  local url="https://${HOST}${path}"
  local http key prev fails msg
  http=$(probe "$path")
  key=$(printf '%s' "$label" | tr ' /' '__')
  prev=$(read_state "$key")
  prev=${prev:-ok}

  if [ "$http" = "200" ]; then
    log "OK    ${label} HTTP ${http} origin ${url}"
    if [ "$prev" != "ok" ]; then
      msg="WSS health RECOVERED: ${label} → HTTP 200 (origin ${url})"
      printf '%s\n' "$msg"
      slack "$msg"
    fi
    write_state "$key" "ok"
    write_state "${key}_fails" "0"
    return 0
  fi

  fails=$(read_state "${key}_fails")
  fails=${fails:-0}
  fails=$((fails + 1))
  write_state "$key" "fail"
  write_state "${key}_fails" "$fails"

  msg="WSS health FAIL: ${label} → HTTP ${http} (origin ${url})"
  log "ALERT ${msg} fails=${fails}"
  printf '%s\n' "$msg" >&2

  if [ "$ALERT_ON_EVERY_FAIL" = "1" ] || [ "$prev" != "fail" ] || \
     [ $((fails % REMIND_EVERY)) -eq 0 ]; then
    slack "$msg"
  fi
  return 1
}

fail=0
check_path "Cal booking" "/daniel/20min" || fail=1
check_path "Cal 60min" "/daniel/60min" || fail=1
exit $fail
