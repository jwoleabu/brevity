import { Message, MessageType } from "@/lib/message";
import { db } from "@/lib/db";

const activeContentScriptTabs = new Set<number>()
let pendingOnboarding = false;

export default defineBackground(() => {
  browser.action.onClicked.addListener((tab) => {
    if (!tab?.id) return;
    console.log("icon click event");
    browser.tabs.sendMessage(tab.id, { type: MessageType.TOGGLE_UI });
  });

  browser.runtime.onMessage.addListener(
    (message: Message, sender, sendResponse) => {
      switch (message.type) {
        case MessageType.CONTENT_SCRIPT_MOUNTED:
        if (sender.tab?.id) activeContentScriptTabs.add(sender.tab.id)
          console.log("tab",sender.tab?.id,"joined the pool")
        break;

        case MessageType.CONTENT_SCRIPT_UNMOUNTED:
        if (sender.tab?.id) activeContentScriptTabs.delete(sender.tab.id)
        console.log("tab",sender.tab?.id,"left the pool")
        break;
      
        case MessageType.OPEN_OPTIONS:
          browser.runtime.openOptionsPage();
          break;

        case MessageType.GET_WORKSPACES_META:
          db.workspaceMeta
            .toArray()
            .then((data) => {
              console.log("sending", data);
              sendResponse(data);
            })
            .catch(console.error);
          return true;

        case MessageType.OPTIONS_PAGE_READY:
          if (pendingOnboarding) {
            pendingOnboarding = false;
            browser.runtime.sendMessage({ type: MessageType.START_ONBOARDING });
          }
          break;

        case MessageType.WORKSPACES_UPDATED:
          console.log("workspace updated!")
          console.log("pool:", activeContentScriptTabs)
          activeContentScriptTabs.forEach(tabId => {
            browser.tabs.sendMessage(tabId, {type: MessageType.WORKSPACES_UPDATED})
            .catch(() => {
              activeContentScriptTabs.delete(tabId)
              console.log("stale tab",sender.tab?.id,"flushed from the pool")
            })
          })
          // browser.tabs.sendMessage({
          //   type: MessageType.WORKSPACES_UPDATED,
          // });
          break;

        default:
          break;
      }
    },
  );

  browser.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === browser.runtime.OnInstalledReason.INSTALL) {
      pendingOnboarding = true;
      await browser.runtime.openOptionsPage();
    }
  });

  console.log("brevity background script active");
});
