export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

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
