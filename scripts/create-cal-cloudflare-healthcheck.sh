#!/usr/bin/env bash
# Create a Cloudflare Health Check for the Growth Audit booking URL.
# Requires: Pro+ zone plan, and CLOUDFLARE_API_TOKEN with Zone.Health Checks Edit + Zone Read.
# Free plan returns: health checks disabled for zone.
set -euo pipefail

ZONE_NAME="${ZONE_NAME:-wescalestartups.com}"
CHECK_NAME="${CHECK_NAME:-cal-growth-audit}"
ADDRESS="${ADDRESS:-cal.wescalestartups.com}"
PATH_TO_CHECK="${PATH_TO_CHECK:-/daniel/20min}"

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "Set CLOUDFLARE_API_TOKEN first (API token with Health Checks:Edit)." >&2
  exit 1
fi

auth=(-H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" -H "Content-Type: application/json")

ZONE_ID=$(curl -fsS "${auth[@]}" \
  "https://api.cloudflare.com/client/v4/zones?name=${ZONE_NAME}" \
  | python3 -c "import sys,json; r=json.load(sys.stdin); assert r.get('success'), r; print(r['result'][0]['id'])")

echo "zone=${ZONE_NAME} id=${ZONE_ID}"

# Skip if a check with this name already exists
EXISTING=$(curl -fsS "${auth[@]}" \
  "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/healthchecks" \
  | python3 -c "import sys,json; r=json.load(sys.stdin); assert r.get('success'), r; print(next((x['id'] for x in r['result'] if x.get('name')=='${CHECK_NAME}'), ''))")

if [[ -n "${EXISTING}" ]]; then
  echo "Health check '${CHECK_NAME}' already exists: ${EXISTING}"
  exit 0
fi

curl -fsS -X POST "${auth[@]}" \
  "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/healthchecks" \
  --data @- <<JSON | python3 -m json.tool
{
  "name": "${CHECK_NAME}",
  "address": "${ADDRESS}",
  "type": "HTTPS",
  "check_regions": ["WEU", "EEU"],
  "http_config": {
    "path": "${PATH_TO_CHECK}",
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
}
JSON

echo "Created. Add a Cloudflare Notification policy for Health Checks status next."
