export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === "www.wescalestartups.com") {
    url.hostname = "wescalestartups.com";
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
