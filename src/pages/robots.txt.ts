import type { APIRoute } from "astro";
import { siteConfig } from "../site";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\nHost: ${siteConfig.canonicalHost}\nSitemap: ${siteConfig.siteUrl}/sitemap.xml\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
