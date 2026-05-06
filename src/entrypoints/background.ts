import { Message, MessageType } from "@/lib/message";
let pendingOnboarding = false;

export default defineBackground(() => {
  browser.action.onClicked.addListener((tab) => {
    if (!tab?.id) return;
    console.log("icon click event");
    browser.tabs.sendMessage(tab.id, { type: MessageType.START_PANEL });
  });

  browser.runtime.onMessage.addListener((message: Message) => {
    switch (message.type) {
      case MessageType.OPEN_OPTIONS:
        browser.runtime.openOptionsPage();
        break;

      case MessageType.OPTIONS_PAGE_READY:
        if (pendingOnboarding) {
          pendingOnboarding = false;
          browser.runtime.sendMessage({type: MessageType.START_ONBOARDING});
        }
        break;

      default:
        break;
    }
  });

  browser.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === browser.runtime.OnInstalledReason.INSTALL) {
      pendingOnboarding = true;
      await browser.runtime.openOptionsPage();
    }
  });

  console.log("brevity background script active");
});
