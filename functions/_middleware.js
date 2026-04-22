export async function onRequest(context) {
  const url = new URL(context.request.url);

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

  return context.next();
}
