import type { APIRoute } from "astro";
import { siteConfig } from "../site";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\nHost: ${siteConfig.canonicalHost}\nSitemap: ${siteConfig.siteUrl}/sitemap.xml\n\n# AI crawlers welcome — summary also available at /llms.txt\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
