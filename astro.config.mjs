import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sentry from "@sentry/astro";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://wescalestartups.com",
  trailingSlash: "never",
  compressHTML: true,
  build: {
    format: "file"
  },
  devToolbar: {
    enabled: false
  },
  integrations: [
    mdx(),
    sentry({
      // Upload source maps only when a token is present (CI). Local builds skip it silently.
      // Create an org auth token in Sentry (Settings -> Auth Tokens), set it as the
      // SENTRY_AUTH_TOKEN secret in GitHub and the Pages build env. Org auth tokens are
      // region-aware, so no SENTRY_URL is needed for the EU (de.sentry.io) org.
      sourceMapsUploadOptions: {
        enabled: Boolean(process.env.SENTRY_AUTH_TOKEN),
        org: "we-scale-startups",
        project: "wescalestartups-com"
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
