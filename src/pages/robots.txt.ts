import type { APIRoute } from "astro";
import { siteConfig } from "../site";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
        `User-agent: *\nAllow: /\n# Content signals. ai-train=yes is deliberate: this site explicitly Allows GPTBot and\n# ClaudeBot, which are training crawlers, so ai-train=no contradicted the same file.\n# Being present in model weights is the point for us. To reverse, set ai-train=no AND\n# add Disallow rules for GPTBot and ClaudeBot below - changing this line alone does nothing.\nContent-Signal: search=yes, ai-input=yes, ai-train=yes\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Claude-SearchBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nHost: ${siteConfig.canonicalHost}\nSitemap: ${siteConfig.siteUrl}/sitemap.xml\n\n# LLM-friendly summary for AI crawlers\n# ${siteConfig.siteUrl}/llms.txt\n# Extended: ${siteConfig.siteUrl}/llms-full.txt\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );
