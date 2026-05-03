/** Matches `public/_headers` for `/` — keep in sync for HTML (via Pages headers) and markdown (via Functions response). */
const HOMEPAGE_AGENT_LINK =
  '</llms.txt>; rel="alternate"; type="text/plain", ' +
  '</llms-full.txt>; rel="alternate"; type="text/markdown", ' +
  '</markdown/home.md>; rel="alternate"; type="text/markdown", ' +
  '</.well-known/api-catalog>; rel="api-catalog", ' +
  '</.well-known/agent-skills/index.json>; rel="alternate"; type="application/json"';

/** Cloudflare Pages: use the ASSETS binding. Plain `fetch(same-origin)` in middleware is not reliable. */
function fetchStaticAsset(context, pathname) {
  const assetUrl = new URL(pathname, context.request.url);
  const req = new Request(assetUrl.toString(), { method: context.request.method });
  if (context.env && context.env.ASSETS) {
    return context.env.ASSETS.fetch(req);
  }
  return fetch(req);
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Serve static assets (images, og, css, js, _astro, sitemap, robots) directly via ASSETS.
  if (
    /^\/images\//.test(path) ||
    /^\/og\//.test(path) ||
    /^\/_astro\//.test(path) ||
    path.endsWith(".css") ||
    path.endsWith(".js") ||
    path === "/sitemap.xml" ||
    path === "/robots.txt" ||
    path === "/rss.xml"
  ) {
    return fetchStaticAsset(context, path);
  }

  // Junk / legacy e-commerce paths from old index — 410 so crawlers drop them (not soft-404 to home).
  if (
    /^\/item\/[0-9]+\/?$/.test(path) ||
    /^\/wheel-arch-|^\/loungefly-/i.test(path)
  ) {
    return new Response(null, { status: 410, statusText: "Gone" });
  }

  if (url.hostname === "www.wescalestartups.com") {
    url.hostname = "wescalestartups.com";
    return Response.redirect(url.toString(), 301);
  }

  // Content negotiation: agents requesting markdown on the homepage get the static mirror.
  if (path === "/" || path === "") {
    const accept = context.request.headers.get("Accept") || "";
    if (/\btext\/markdown\b/i.test(accept)) {
      const mdRes = await fetchStaticAsset(context, "/markdown/home.md");
      if (mdRes.ok) {
        const method = context.request.method;
        const body = method === "HEAD" ? null : await mdRes.text();
        return new Response(body, {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            Link: HOMEPAGE_AGENT_LINK,
            Vary: "Accept",
            "Cache-Control": "public, max-age=300, must-revalidate"
          }
        });
      }
    }
  }

  if (url.pathname === "/contact-us" || url.pathname === "/contact-us/") {
    url.pathname = "/contact";
    return Response.redirect(url.toString(), 301);
  }

  const serviceRedirects = {
    "/services/growth-strategy": "/services/growth-diagnosis",
    "/services/growth-strategy/": "/services/growth-diagnosis",
    "/services/customer-research": "/services/90-day-growth-sprint",
    "/services/customer-research/": "/services/90-day-growth-sprint",
    "/services/acquisition-systems": "/services/acquisition-system-build",
    "/services/acquisition-systems/": "/services/acquisition-system-build"
  };

  if (serviceRedirects[url.pathname]) {
    url.pathname = serviceRedirects[url.pathname];
    return Response.redirect(url.toString(), 301);
  }

  const legacyRedirects = {
    "/about-us": "/about",
    "/about-us/": "/about",
    "/speaking": "/press",
    "/speaking/": "/press",
    "/portfolio/greenscreen": "/case-studies",
    "/portfolio/greenscreen/": "/case-studies",
    "/team/rahul-van-manen": "/about",
    "/team/rahul-van-manen/": "/about"
  };

  if (legacyRedirects[path]) {
    url.pathname = legacyRedirects[path];
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
