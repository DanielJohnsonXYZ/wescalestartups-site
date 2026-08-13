# Deindex internal subdomains

Worker `wss-noindex-subdomains` adds `X-Robots-Tag: noindex, nofollow`, overrides
`/robots.txt` to `Disallow: /`, and injects HTML `<meta name="robots" …>` for
Cloudflare-proxied hosts.

## Live (as of 2026-07-12)

| Host | Stack | Proxy | Durable noindex |
|------|-------|-------|-----------------|
| `hai.wescalestartups.com` | Human Approved AI (CF Pages / Astro) | Orange-cloud | Worker live |
| `uptime.wescalestartups.com` | Uptime Kuma on Hetzner via CF | Orange-cloud | Worker live |
| `comms.wescalestartups.com` | Mautic (Apache) on `65.109.232.75` | DNS-only | Needs proxy or Traefik header |
| `pingcrm.wescalestartups.com` | PingCRM on Hetzner | DNS-only | Needs proxy or Traefik header |
| `postiz.wescalestartups.com` | Postiz (Next.js) on `65.109.232.75` | DNS-only | **None** — no `robots.txt`, no header, no meta |

Main site `wescalestartups.com` / `www` is **not** covered by this Worker.

## Redeploy

```bash
cd infra/wss-noindex-subdomains
npx wrangler deploy
```

Do not run `wrangler deploy` from the repo root (Pages project detection).

## Finish DNS-only hosts

1. Cloudflare → DNS → enable **Proxied** for `comms`, `pingcrm` and `postiz` (confirm origin TLS still works).
2. Uncomment those routes in `wrangler.toml` and redeploy.
3. Or on Dokploy/Traefik: add response header `X-Robots-Tag: noindex, nofollow` and serve `robots.txt` with `Disallow: /`.

> **Postiz is the exception to step 1.** It is a Next.js app with RSC payloads
> and cookie auth, so orange-clouding it while the `*wescalestartups.com/*`
> Cache Everything Page Rule is still live will reproduce the Cal.com login
> loop (operations runbook §5d). Fix that rule first, or take route 3 for
> Postiz. See operations runbook §6b.

## Bing / Google removals (UI)

Bing Webmaster API `AddBlockedUrl` is currently broken via MCP (deserialization error). Use UI:

1. [Bing Webmaster](https://www.bing.com/webmasters) → property `https://www.wescalestartups.com/`
2. **Configure My Site → Block URLs** (or **URL Removal**)
3. Block as **Directory** (or equivalent):
   - `https://hai.wescalestartups.com/`
   - `https://uptime.wescalestartups.com/`
   - `https://comms.wescalestartups.com/`
   - `https://pingcrm.wescalestartups.com/`
   - `https://postiz.wescalestartups.com/`
4. Also submit key paths if shown Indexed: `/dashboard`, `/trust-security/`, `/s/login`

Google Search Console (`sc-domain:wescalestartups.com`):

1. **Removals** → **Temporary removals** → **New Request** → **Remove this URL**
2. Use **Remove all URLs with this prefix** for each host root above
3. Optional: **URL Inspection** on sample URLs after noindex headers are live → **Request indexing** is wrong here; wait for recrawl after noindex
