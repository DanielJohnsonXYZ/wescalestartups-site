# We Scale Startups

First-principles static rebuild of We Scale Startups.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Deployment

This site is static Astro output. In Coolify, deploy either:

- the repo/folder directly with the included `Dockerfile`, or
- build with `npm run build` and serve `dist/` with Nginx/Caddy.

Cloudflare Pages uses the same build contract:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

The current Hetzner/Coolify production path uses `compose.production.yml`.
It builds the static image, attaches to the existing WSS proxy network, and
routes `wescalestartups.com` plus `www.wescalestartups.com` through Traefik.

Rollback on the Hetzner host:

```bash
cd /data/codex/wescalestartups-site
docker compose -f compose.production.yml stop
docker start wordpress-pdgjxv2qnvxcpyuqyh7ensjb
```

Recommended rollout:

1. Deploy to a preview hostname first, such as `new.wescalestartups.com`.
2. Verify pages, booking links, redirects, analytics, sitemap, and robots.
3. Cut DNS from WordPress only after the redirect map is ready.

## Content Model

- `src/content/services`
- `src/content/industries`
- `src/content/cases`

The point is to generate pages from structured truth, not to recreate WordPress page-builder state.
