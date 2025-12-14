export default defineBackground(() => {
  browser.action.onClicked.addListener((tab) => {
    if (!tab?.id) return;
    console.log("ping");
    browser.tabs.sendMessage(tab.id, { action: "togglePanel" });
  });

  console.log("Hello background!", { id: browser.runtime.id });
});
