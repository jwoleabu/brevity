import { defineConfig } from "wxt";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
  srcDir: "src",
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifestVersion: 3,
  manifest: {
    name: "Brevity",
    description:
      "Speed up your job applications by writing only what you need to.",
    version: "1.0",
    action: {},
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["content.ts"],
      },
    ],
  },
  autoIcons: {
    baseIconPath: resolve("src", "assets/icon.svg"),
  },
});
