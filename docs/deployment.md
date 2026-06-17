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

Project: `wescalestartups-site`

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Preview URL: `https://wescalestartups-site.pages.dev`

The Pages project is connected to the GitHub repository. Manual deploys are
also supported:

```bash
npm run build
npx wrangler pages deploy dist --project-name=wescalestartups-site --branch=main
```

`functions/_middleware.js` redirects `www.wescalestartups.com` to the apex
domain (preserving path + query) and handles legacy redirects + agent
content negotiation.

### Sentry source maps

The build uploads source maps to Sentry when `SENTRY_AUTH_TOKEN` is present
(see `astro.config.mjs`). Set it in **two** places so both CI and Pages builds
get readable production stack traces:

1. GitHub → repo Settings → Secrets and variables → Actions → `SENTRY_AUTH_TOKEN`
2. Cloudflare Pages → Project → Settings → Environment variables → `SENTRY_AUTH_TOKEN`

Create the token in Sentry → Settings → Auth Tokens (org auth tokens are
region-aware, so no `SENTRY_URL` is needed for the EU `de.sentry.io` org).

## Production DNS Cutover (the last manual step)

Production currently still resolves through Cloudflare to the Hetzner origin.
Pages custom domains are added for `wescalestartups.com` and
`www.wescalestartups.com` but stay **pending** until the zone DNS records point
at Pages.

Required Cloudflare permission: **`Zone DNS Edit`** for the
`wescalestartups.com` zone (a Pages-only token is not enough).

Change the existing proxied A records:

```text
wescalestartups.com      A      65.109.232.75
www.wescalestartups.com  A      65.109.232.75
```

to proxied CNAME records (keep the orange cloud / proxied on):

```text
wescalestartups.com      CNAME  wescalestartups-site.pages.dev
www.wescalestartups.com  CNAME  wescalestartups-site.pages.dev
```

Keep the MX and TXT records unchanged (email + verification).

Verify after cutover: `https://wescalestartups.com` and the `www` →apex
redirect both return 200, and Sentry receives a test event.

## Hetzner Fallback (decommission after cutover)

Useful only while Pages is being verified.

SSH: `ssh coolify` — production folder `/data/codex/wescalestartups-site`.

Rollback to the pre-Astro WordPress web container:

```bash
cd /data/codex/wescalestartups-site
docker compose -f compose.production.yml stop
docker start wordpress-pdgjxv2qnvxcpyuqyh7ensjb
```

Once the DNS cutover is verified and stable, remove the `wescalestartups-static`
stack from Dokploy to reclaim the box.

---

For server-wide infrastructure (firewall, backups, the Hetzner/Dokploy box),
see [`docs/operations-runbook.md`](./operations-runbook.md).
