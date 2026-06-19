import { Message, MessageType } from "@/lib/message";
import { db } from "@/lib/db";

const activeContentScriptTabs = new Set<number>();
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
          if (sender.tab?.id) activeContentScriptTabs.add(sender.tab.id);
          console.log("tab", sender.tab?.id, "joined the pool");
          break;

        case MessageType.CONTENT_SCRIPT_UNMOUNTED:
          if (sender.tab?.id) activeContentScriptTabs.delete(sender.tab.id);
          console.log("tab", sender.tab?.id, "left the pool");
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

        case MessageType.GET_WORKSPACE_DATA:
          console.log("workspaceid", message.workspaceId)
          db.workspaces
            .get(message.workspaceId)
            .then((data) => {
              console.log("sending", data ?? null);
              sendResponse(data);
            })
            .catch(console.error);
          return true;

        case MessageType.GET_PROFILE:
          db.settings
            .get("profile")
            .then((data) => {
              const profile = data?.value ?? data ?? null;
              console.log("sending", data);
              sendResponse(profile);
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
        case MessageType.PROFILE_UPDATED: {
          console.log(message.type);
          console.log("pool:", activeContentScriptTabs);
          activeContentScriptTabs.forEach((tabId) => {
            browser.tabs
              .sendMessage(tabId, { type: message.type })
              .catch(() => {
                activeContentScriptTabs.delete(tabId);
                console.log(
                  "stale tab",
                  sender.tab?.id,
                  "flushed from the pool",
                );
              });
          });
          break;
        }

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
