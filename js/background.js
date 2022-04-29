chrome.webNavigation.onHistoryStateUpdated.addListener(
  ({ tabId }) => {
    chrome.tabs.get(tabId, () => {
      chrome.tabs.sendMessage(tabId, { action: "addButton" });
    });
  },
  { url: [{ hostSuffix: ".youtube.com" }] }
);
