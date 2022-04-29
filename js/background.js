// chrome.webNavigation.onHistoryStateUpdated.addListener(
//   ({ tabId }) => {
//     chrome.tabs.get(tabId, () => {
//       chrome.scripting.executeScript(
//         {
//           target: { tabId },
//           files: ["js/page.js"],
//         },
//         () => {}
//       );
//     });
//   },
//   { url: [{ hostSuffix: ".youtube.com" }] }
// );

// console.log(chrome);
