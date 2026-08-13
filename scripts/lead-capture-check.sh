#!/usr/bin/env bash
# lead-capture-check.sh — WSS lead-capture health probe
#
# WHY THIS EXISTS
# Booking went down on 09 Aug and was fixed in ~69 hours, because a monitor was
# watching it and shouted every 5 minutes. Lead capture went down on 06 Aug and
# stayed down for ~150 hours, because nothing watched it at all. The endpoint
# returned HTTP 200 to the visitor the whole time — a broken form and a working
# form look identical in a browser. The ONLY reliable signal is the response body.
#
# WHAT IT CHECKS
#   POST /api/forms with the synthetic monitor profile.
#   PASS  -> JSON body containing "form_id"      (Customer.io accepted the write)
#   FAIL  -> anything else, specifically:
#              bare {"ok":true}   = abuse guard silently rejected it
#              text/plain 502     = function crashed / old build deployed
#              {"ok":false,...}   = Customer.io rejected the credentials
#
# SAFE TO RUN CONTINUOUSLY
# monitor+run@wescalestartups.com (cio_id b6f30d00e205e305) is a permanently
# unsubscribed synthetic profile, flagged monitor=true and "Never a lead" in
# Customer.io. It is updated in place, so this creates no list growth and sends
# no email. Do NOT swap in a real address.
#
# TURNSTILE
# When TURNSTILE_ENFORCE=1 on Pages, set FORM_MONITOR_SECRET to the same value
# as the Pages env var of that name, and send it via X-WSS-Monitor. The guard
# skips Turnstile only for this synthetic email + matching secret. Origin /
# Referer / source_page checks still apply.
#
# CLOUDFLARE BOT FIGHT
# If this cron runs from an IP Cloudflare challenges, responses are HTML
# challenge pages (DOCTYPE) and this script alerts. Allowlist the Hetzner
# egress IP (or skip Bot Fight) for POST /api/forms and POST /api/booked.
#
# INSTALL: fold into the existing cal-booking-check.sh cron (every 2–5 min) so
# alerts land on the same path as the booking monitor.
#   cp scripts/lead-capture-check.sh /opt/wss-monitors/
#   # then append to the cron that already runs cal-booking-check.sh

set -uo pipefail

SLACK_WEBHOOK="${SLACK_WEBHOOK:?set SLACK_WEBHOOK}"   # same webhook as cal-booking-check.sh
PROBE_EMAIL="monitor+run@wescalestartups.com"
FORM_MONITOR_SECRET="${FORM_MONITOR_SECRET:-}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"

alert() {
  curl -s -X POST "$SLACK_WEBHOOK" \
    -H 'Content-Type: application/json' \
    -d "{\"text\": $(printf '%s' "$1" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')}" >/dev/null
}

check_endpoint() {
  local path="$1" label="$2"
  local body http
  local -a hdrs=(
    -H 'Content-Type: application/json'
    -H 'Origin: https://wescalestartups.com'
    -H 'Referer: https://wescalestartups.com/'
  )

  if [[ -n "${FORM_MONITOR_SECRET}" ]]; then
    hdrs+=(-H "X-WSS-Monitor: ${FORM_MONITOR_SECRET}")
  fi

  body=$(curl -s -m 20 -w '\n%{http_code}' \
    -X POST "https://wescalestartups.com${path}" \
    "${hdrs[@]}" \
    -d "{\"email\":\"${PROBE_EMAIL}\",\"form_id\":\"daily-monitor\",\"source_page\":\"https://wescalestartups.com/monitor-${STAMP}\",\"name\":\"Monitor ${STAMP}\"}")

  http=$(printf '%s' "$body" | tail -n1)
  body=$(printf '%s' "$body" | sed '$d')

  # The success signature is form_id in the body, NOT the status code.
  if printf '%s' "$body" | grep -q '"form_id"'; then
    return 0
  fi

  local why="unrecognised response"
  case "$body" in
    '{"ok":true}')            why="abuse guard silently rejected the submission (no form_id) — every real signup is being discarded" ;;
    *'Customer.io rejected'*) why="Customer.io rejected the stored credentials (site ID / Track API key wrong in Cloudflare)" ;;
    *'<!DOCTYPE'*|*'error code'*) why="Cloudflare edge error — the function crashed, an old build is deployed, or Bot Fight challenged the probe IP" ;;
  esac
  alert "🚨 WSS LEAD CAPTURE FAIL: ${label} → HTTP ${http} — ${why}. Body: ${body:0:200}"
  return 1
}

fail=0
check_endpoint /api/forms  "form capture (/api/forms)"   || fail=1
check_endpoint /api/booked "booking stamp (/api/booked)" || fail=1
exit $fail
