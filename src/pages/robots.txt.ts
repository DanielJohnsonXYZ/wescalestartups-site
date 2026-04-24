import type { APIRoute } from "astro";
import { siteConfig } from "../site";

export const prerender = true;

const aiUserAgents = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "cohere-ai",
  "FacebookBot",
  "Bytespider",
  "Amazonbot",
  "DuckAssistBot",
  "YouBot"
];

export const GET: APIRoute = () => {
  const aiBlock = aiUserAgents.map((ua) => `User-agent: ${ua}\nAllow: /\n`).join("\n");

  const body = `# We Scale Startups — robots.txt
# Full site is open to index and summarisation.

User-agent: *
Allow: /

${aiBlock}
Host: ${siteConfig.canonicalHost}
Sitemap: ${siteConfig.siteUrl}/sitemap.xml

# LLM-friendly summary for AI crawlers
# ${siteConfig.siteUrl}/llms.txt
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
};
