# Deployment Notes

## GitHub

Repository: `DanielJohnsonXYZ/wescalestartups-site`

The repository is private and uses `main` as the production branch.

## Cloudflare Pages

Project: `wescalestartups-site`

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Preview URL: `https://wescalestartups-site.pages.dev`

The Pages project is connected to the GitHub repository. Direct uploads are
also supported with:

```bash
npm run build
npx wrangler pages deploy dist --project-name=wescalestartups-site --branch=main
```

## Production DNS Cutover

The production domain currently still resolves through Cloudflare to the
Hetzner origin. Cloudflare Pages custom domains have been added for:

- `wescalestartups.com`
- `www.wescalestartups.com`

They remain pending until the zone DNS records are changed from the Hetzner
origin to the Pages project.

Change the existing proxied A records:

```text
wescalestartups.com      A      65.109.232.75
www.wescalestartups.com  A      65.109.232.75
```

to proxied CNAME records:

```text
wescalestartups.com      CNAME  wescalestartups-site.pages.dev
www.wescalestartups.com  CNAME  wescalestartups-site.pages.dev
```

Keep the MX and TXT records unchanged.

## Hetzner Fallback

The Hetzner deployment is still useful as a fallback while Cloudflare Pages is
being verified.

SSH:

```bash
ssh coolify
```

Current production folder:

```bash
/data/codex/wescalestartups-site
```

Rollback to the pre-Astro WordPress web container:

```bash
cd /data/codex/wescalestartups-site
docker compose -f compose.production.yml stop
docker start wordpress-pdgjxv2qnvxcpyuqyh7ensjb
```
