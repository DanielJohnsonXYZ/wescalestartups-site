import type { APIRoute } from "astro";
import { buildLlmsTxtBody } from "../lib/buildLlmsTxt";

export const prerender = true;

export const GET: APIRoute = async () => {
  const body = await buildLlmsTxtBody("full");
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600"
    }
  });
};
