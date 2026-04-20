import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://wescalestartups.com",
  trailingSlash: "never",
  devToolbar: {
    enabled: false
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});
