import { Message, MessageType } from "@/lib/message";
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

    const listener = (message : Message)=>{
      switch(message.type){
        case MessageType.TOGGLE_UI:
          ui.mounted ? ui.remove() : ui.mount();
          break;
        case MessageType.CLOSE:
          if (!ui.mounted) break;
          ui.remove();
          break;
      }
    }

    browser.runtime.onMessage.addListener(listener);
    
    ctx.onInvalidated(() => {
      browser.runtime.onMessage.removeListener(listener);
    })
  }

});
