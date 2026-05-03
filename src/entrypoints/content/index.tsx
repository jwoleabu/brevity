import { Toaster } from "@/components/ui/sonner";
import "./styles.css";
import { Navigation } from "@/components/views/navigation";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div className="fixed top-0 right-0 m-3 max-h-[calc(100vh-32px)] w-full max-w-sm bg-background pr-4 pl-4 pb-4 rounded-md flex flex-col overflow-y-scroll scroll z-100000">
        <Navigation />
      <Toaster position="bottom-left" duration={1500} />
    </div>
  );
}

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
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });
    ui.mount();
  },
});
