import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    mdx(),
    sitemap(),
    react(),
  ],
  vite: {
    plugins: [],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      allowNodeBuiltins: true,
    },
  },
});
