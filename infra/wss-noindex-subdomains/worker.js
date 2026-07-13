/**
 * Zone Worker: durable noindex for internal / staging subdomains.
 * Passes traffic through unchanged except:
 * - X-Robots-Tag: noindex, nofollow on all responses
 * - robots.txt → Disallow: /
 * - HTML responses get a meta robots noindex tag injected once
 *
 * Deploy from this directory (not the parent Pages project root):
 *   cd infra/wss-noindex-subdomains && npx wrangler deploy
 */
const ROBOTS_BODY = "User-agent: *\nDisallow: /\n";

function withNoindexHeaders(headers) {
  const h = new Headers(headers);
  h.set("X-Robots-Tag", "noindex, nofollow");
  return h;
}

async function injectHtmlMeta(response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("text/html")) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: withNoindexHeaders(response.headers),
    });
  }

  const html = await response.text();
  if (/<meta\s+name=["']robots["']/i.test(html)) {
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: withNoindexHeaders(response.headers),
    });
  }

  const meta = '<meta name="robots" content="noindex, nofollow">';
  const patched = html.includes("</head>")
    ? html.replace(/<\/head>/i, `${meta}</head>`)
    : meta + html;

  return new Response(patched, {
    status: response.status,
    statusText: response.statusText,
    headers: withNoindexHeaders(response.headers),
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/robots.txt") {
      return new Response(ROBOTS_BODY, {
        status: 200,
        headers: withNoindexHeaders({
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=300",
        }),
      });
    }

    const originResponse = await fetch(request);
    return injectHtmlMeta(originResponse);
  },
};
