import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ["@wxt-dev/module-react", "@wxt-dev/auto-icons"],
	srcDir: "src",
	vite: () => ({
		plugins: [tailwindcss(), svgr()],
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
		browser_specific_settings: {
			gecko: {
				data_collection_permissions: {
					required: ["none"],
				},
			},
		},
	},
	autoIcons: {
		baseIconPath: resolve("src", "assets/icon.svg"),
	},
});
