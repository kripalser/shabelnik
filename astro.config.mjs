import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://shabelnik.kripalser.com",
  trailingSlash: "always",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
});
