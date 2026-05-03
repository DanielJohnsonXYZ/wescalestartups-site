import type { APIRoute } from "astro";
import { siteConfig } from "../site";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\n# Content signals: allow search and AI input; do not signal opt-in to model training here.\nContent-Signal: search=yes, ai-input=yes, ai-train=no\n\nHost: ${siteConfig.canonicalHost}\nSitemap: ${siteConfig.siteUrl}/sitemap.xml\n\n# LLM-friendly summary for AI crawlers\n# ${siteConfig.siteUrl}/llms.txt\n# Extended: ${siteConfig.siteUrl}/llms-full.txt\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
