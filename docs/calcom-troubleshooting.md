# cal.wescalestartups.com (self-hosted Cal.com) — troubleshooting

`cal.wescalestartups.com` is a **self-hosted Cal.com** instance. It is **not**
part of this repo (the Astro site on Cloudflare Pages). It runs on the Hetzner
box `dokploy-wss` (`65.109.232.75`) under **Dokploy + Docker Swarm + Traefik**,
with its own Postgres (see `operations-runbook.md` §2, §3).

Fixing it requires SSH/console access to that box — CI agents and this repo's
tooling cannot reach it.

## The public booking funnel does not depend on this host

The site's `/book` page (`src/pages/book/index.astro`) embeds **Calendly**
(`calendly.com/wescalestartups`, via `siteConfig.calLink`), not this Cal.com
instance. So a Cal.com outage does **not** break booking on the marketing site.
If you ever repoint `/book` to Cal.com, note Cal.com uses a different embed than
Calendly (`<cal-origin>/embed/embed.js` + `Cal("inline", …)`), and the
`calendly.com` postMessage origin check in that page would also need updating.

## Reading a 403 (who is saying no?)

A **403** — as opposed to 502/503/timeout — means something is *deliberately
refusing* the request, not that the app is down. Identify the source first:

```bash
curl -sSI https://cal.wescalestartups.com/
```

- `Server: cloudflare` + a branded page / `cf-ray` header → **Cloudflare edge** is blocking.
- Bare `403 Forbidden` (small body, `Server:` is Traefik/none) → **Traefik middleware**.
- A Cal.com-rendered page → **the app** is refusing (auth/license/config).

## Likely causes, most → least likely

1. **Cloudflare edge block.** A WAF/Firewall rule (Cloudflare "error 1020"), an
   IP Access Rule, "Under Attack" mode, or a **Cloudflare Access / Zero Trust**
   policy on the subdomain. These internal subdomains have been deliberately
   locked down (firewall lockdown, noindex worker, deindex) — a lockdown step
   can block legitimate access too.
   → Cloudflare dashboard → **Security → Events**, filter host
   `cal.wescalestartups.com`, find the Ray ID / rule that fired; then fix the
   rule or allow-list your IP. Check **Zero Trust → Access → Applications** for
   a policy covering this host.

2. **Traefik / Dokploy middleware.** An `ipWhiteList`/`ipAllowList` or
   `basicAuth` middleware on the Cal.com router returns 403 on deny.
   → On the box, inspect the Cal.com stack's Traefik labels/middlewares.

3. **Broken container after an upgrade.** The leftover
   `calcom-calcom-migrate-1` one-shot container and the floating `:latest` tag
   on `cal.com` (runbook §3) point to a recent migration/re-pull. Confirm the
   app is actually up and configured:
   ```bash
   docker ps | grep -i cal
   docker logs --tail=100 <calcom-web-container>
   ```
   Verify `NEXT_PUBLIC_WEBAPP_URL` and `NEXTAUTH_URL` both equal
   `https://cal.wescalestartups.com`, plus `NEXTAUTH_SECRET` /
   `CALENDSO_ENCRYPTION_KEY` are set.

4. **Cloudflare SSL mode mismatch** (Full vs Flexible) against the origin cert —
   can surface as 403/526. Set SSL/TLS mode to **Full (strict)** with a valid
   origin cert.

## References

- Cal.com self-host + reverse proxy: https://cal.bestofproducthunt.com/how-to-self-host-calcom-in-production-docker-reverse-proxy-ssl-step-by-step-1
- Traefik 403 via reverse proxy: https://community.traefik.io/t/reverse-proxy-of-container-showing-500-error-and-blank-page-with-403-error/27445
- Cal.com Docker + Traefik issue: https://github.com/calcom/cal.com/issues/11260
- Cloudflare Error 1020: https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/
