import Extension from "./app";
import { createRoot } from "react-dom/client";


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
        root.render(<Extension />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });
    ui.mount();
  },
});
