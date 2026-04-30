export default defineBackground(() => {
  browser.action.onClicked.addListener((tab) => {
    if (!tab?.id) return;
    console.log("icon click event");
    browser.tabs.sendMessage(tab.id, { action: "toggleBrevity" });
  });

  console.log("brevity background script active");
});
