#!/usr/bin/env bash
# lead-capture-check.sh v2 — WSS lead-capture health probe
#
# v2 changes (v1 would not run under cron):
#   - SLACK_WEBHOOK is now OPTIONAL. v1 aborted before doing anything if it was
#     unset, and cron does not inherit your shell environment, so v1 worked by
#     hand and silently did nothing on a schedule. It now probes regardless and
#     falls back to stdout/logfile, which cron emails to you.
#   - Writes a timestamped line to a logfile every run, so "is it running?" is
#     answerable by looking at a file instead of inferring it.
#
# WHY THIS EXISTS
# Booking went down on 09 Aug and was fixed in ~69 hours, because a monitor was
# watching it. Lead capture went down on 06 Aug and stayed down ~150 hours,
# because nothing watched it. The endpoint returned HTTP 200 to visitors the
# whole time — a broken form and a working form look identical in a browser.
# The only reliable signal is the response body.
#
# PASS -> JSON body containing "form_id"   (Customer.io accepted the write)
# FAIL -> bare {"ok":true}  = abuse guard silently discarded a genuine signup
#         text/plain 502    = function crashed / old build deployed
#         {"ok":false,...}  = Customer.io rejected the stored credentials
#
# SAFE TO RUN CONTINUOUSLY
# monitor+run@wescalestartups.com (cio_id b6f30d00e205e305) is a permanently
# unsubscribed synthetic profile, flagged "Never a lead", updated in place.
# No list growth, no email sent. Do NOT swap in a real address.
#
# TURNSTILE
# When TURNSTILE_ENFORCE=1 on Pages, set FORM_MONITOR_SECRET to the same value
# as the Pages env var of that name, and send it via X-WSS-Monitor. The guard
# skips Turnstile only for this synthetic email + matching secret. Origin /
# Referer / source_page checks still apply. Leave TURNSTILE_ENFORCE off until
# every form ships a widget.
#
# CLOUDFLARE BOT FIGHT
# If this cron runs from an IP Cloudflare challenges, responses are HTML
# challenge pages (DOCTYPE) and this script alerts. Allowlist the Hetzner
# egress IP (or skip Bot Fight) for POST /api/forms and POST /api/booked.
#
# INSTALL (crontab -e or /etc/cron.d/) — set the webhook INSIDE the cron line:
#   */5 * * * * SLACK_WEBHOOK='https://hooks.slack.com/services/XXX' /opt/wss-monitors/lead-capture-check.sh
# It is also fine to run with no webhook; failures then go to the logfile and
# cron mail. Fold into the same cron as cal-booking-check.sh when possible.

set -uo pipefail

SLACK_WEBHOOK="${SLACK_WEBHOOK:-}"                        # optional
LOGFILE="${LOGFILE:-/var/log/wss-lead-capture.log}"
PROBE_EMAIL="monitor+run@wescalestartups.com"
FORM_MONITOR_SECRET="${FORM_MONITOR_SECRET:-}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"

# Fall back to a writable path if the default logfile is not writable.
if ! { : >>"$LOGFILE"; } 2>/dev/null; then
  LOGFILE="${TMPDIR:-/tmp}/wss-lead-capture.log"
fi

log() { printf '%s %s\n' "$STAMP" "$1" >>"$LOGFILE"; }

alert() {
  local msg="$1"
  log "ALERT $msg"
  printf '%s\n' "$msg" >&2          # cron emails stderr
  [ -n "$SLACK_WEBHOOK" ] || return 0
  # Escape for JSON without depending on python/jq being installed.
  local esc
  esc=$(printf '%s' "$msg" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g' | tr -d '\n')
  curl -s -m 15 -X POST "$SLACK_WEBHOOK" \
    -H 'Content-Type: application/json' \
    -d "{\"text\":\"${esc}\"}" >/dev/null
}

check_endpoint() {
  local path="$1" label="$2"
  local raw http body why
  local -a hdrs=(
    -H 'Content-Type: application/json'
    -H 'Origin: https://wescalestartups.com'
    -H 'Referer: https://wescalestartups.com/'
  )

  if [[ -n "${FORM_MONITOR_SECRET}" ]]; then
    hdrs+=(-H "X-WSS-Monitor: ${FORM_MONITOR_SECRET}")
  fi

  raw=$(curl -s -m 20 -w '\n%{http_code}' \
    -X POST "https://wescalestartups.com${path}" \
    "${hdrs[@]}" \
    -d "{\"email\":\"${PROBE_EMAIL}\",\"form_id\":\"daily-monitor\",\"source_page\":\"https://wescalestartups.com/monitor-${STAMP}\",\"name\":\"Monitor ${STAMP}\"}")

  http=$(printf '%s' "$raw" | tail -n1)
  body=$(printf '%s' "$raw" | sed '$d')

  # The success signature is form_id in the BODY, not the status code.
  if printf '%s' "$body" | grep -q '"form_id"'; then
    log "OK    ${label} HTTP ${http}"
    return 0
  fi

  why="unrecognised response"
  case "$body" in
    '{"ok":true}')                why="abuse guard silently rejected the submission (no form_id) — every real signup is being discarded" ;;
    *'Customer.io rejected'*)     why="Customer.io rejected the stored credentials (site ID / Track API key wrong in Cloudflare)" ;;
    *'<!DOCTYPE'*|*'error code'*) why="Cloudflare edge error — the function crashed, an old build is deployed, or Bot Fight challenged the probe IP" ;;
    '')                           why="empty response — network failure or timeout reaching the site" ;;
  esac
  alert "🚨 WSS LEAD CAPTURE FAIL: ${label} → HTTP ${http} — ${why}. Body: $(printf '%s' "$body" | head -c 200)"
  return 1
}

fail=0
check_endpoint /api/forms  "form capture (/api/forms)"   || fail=1
check_endpoint /api/booked "booking stamp (/api/booked)" || fail=1
exit $fail
