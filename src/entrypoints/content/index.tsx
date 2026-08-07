import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { onMessage } from "@/lib/message";
import Extension from "./app";

export default defineContentScript({
	matches: ["<all_urls>"],
	cssInjectionMode: "ui",
	async main(ctx) {
		const ui = await createShadowRootUi(ctx, {
			name: "inject-ui-app",
			position: "inline",
			anchor: "body",
			onMount: (container) => {
				const root = createRoot(container);
				root.render(
					<StrictMode>
						<Extension onClose={() => ui.remove()} />
					</StrictMode>,
				);
				return root;
			},
			onRemove: (root) => {
				root?.unmount();
			},
		});

		const unlistenToggle = onMessage("TOGGLE_UI", () => {
			ui.mounted ? ui.remove() : ui.mount();
		});

		ctx.onInvalidated(() => {
			unlistenToggle();
		});
	},
});
