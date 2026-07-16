# Deployment Notes

## Canonical host: Cloudflare Pages

This site is a static Astro build. **Cloudflare Pages is the single source of
truth for production.** It gives us a global CDN, free hosting, automatic
deploys on every push to `main`, and preview deploys per pull request — and it
removes the marketing site from the Hetzner box entirely (one fewer stack to
build, patch, and back up).

The Hetzner / Dokploy nginx deployment (`compose.production.yml`, `Dockerfile`,
`nginx.conf`) is retained **only as a fallback** until the DNS cutover below is
complete and verified. After that, it can be decommissioned.

> Vercel is not used. If you see Vercel references in older notes, ignore them.

## GitHub

Repository: `DanielJohnsonXYZ/wescalestartups-site`

Private repo, `main` is the production branch. CI (`.github/workflows/ci.yml`)
runs `astro check` + `build` on every PR and push. Pushing to `main`
auto-deploys to Pages — so "push" already means "deploy" for this site.

## Cloudflare Pages

Project: `wescalestartups-com`

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Preview URL: `https://wescalestartups-site.pages.dev`

The Pages project is connected to the GitHub repository. Manual deploys are
also supported:

```bash
npm run build
npx wrangler pages deploy dist --project-name=wescalestartups-com --branch=main
```

`functions/_middleware.js` redirects `www.wescalestartups.com` to the apex
domain (preserving path + query) and handles legacy redirects + agent
content negotiation.

`functions/api/podcast-guest.js` receives podcast guest applications from
`/podcast-guest-application`. Delivery order:

1. `RESEND_API_KEY` (+ optional `GUEST_APPLICATION_TO`, `GUEST_APPLICATION_FROM`)
2. `GUEST_APPLICATION_WEBHOOK_URL` (Zapier / Make / n8n / Discord)
3. FormSubmit.co to `GUEST_APPLICATION_TO` (default `daniel@wescalestartups.com`) — no secret required; the first live submit sends an activation email. Set `GUEST_APPLICATION_DISABLE_FORMSUBMIT=1` to turn this off.

The form also captures the applicant email in Mautic and shows an on-page success state with clipboard + mailto backup.

### Sentry source maps

The build uploads source maps to Sentry when `SENTRY_AUTH_TOKEN` is present
(see `astro.config.mjs`). Set it in **two** places so both CI and Pages builds
get readable production stack traces:

1. GitHub → repo Settings → Secrets and variables → Actions → `SENTRY_AUTH_TOKEN`
2. Cloudflare Pages → Project → Settings → Environment variables → `SENTRY_AUTH_TOKEN`

Create the token in Sentry → Settings → Auth Tokens (org auth tokens are
region-aware, so no `SENTRY_URL` is needed for the EU `de.sentry.io` org).

## Production DNS Cutover

Production is cut over to Cloudflare Pages as of 2026-06-18. Public DNS returns
Cloudflare edge IPs because the records are proxied, so verify by comparing the
public domain with `wescalestartups-site.pages.dev` rather than by expecting a
visible CNAME answer.

Expected zone records:

```text
wescalestartups.com      CNAME  wescalestartups-site.pages.dev  proxied
www.wescalestartups.com  CNAME  wescalestartups-site.pages.dev  proxied
```

Keep the MX and TXT records unchanged (email + verification).

Historical records that should not be restored except for rollback:

```text
wescalestartups.com      A      65.109.232.75
www.wescalestartups.com  A      65.109.232.75
```

Verification used on 2026-06-18: `https://wescalestartups.com` returned 200,
`https://www.wescalestartups.com` redirected to the apex, and forcing the old
Hetzner IP with `curl --resolve ...:65.109.232.75` returned 502 instead of the
production page.

## Hetzner Fallback (decommission after cutover)

Useful only while Pages is being verified. The site can still run on the box as
the `wescalestartups-static` Dokploy stack (built from `compose.production.yml`).

Once the Pages cutover is considered stable, stop and remove that stack to
reclaim the box.

---

For server-wide infrastructure (firewall, backups, the Hetzner/Dokploy box),
see [`docs/operations-runbook.md`](./operations-runbook.md).
