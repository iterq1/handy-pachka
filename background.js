
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "copyChatMessageLink",
        "title": "Скопировать ссылку на сообщение",
        "contexts": ["all"],
        "documentUrlPatterns": [ "https://app.pachca.com/*" ]
      });
});

chrome.contextMenus.onClicked.addListener(
    (info, tab) => {
        if (info.menuItemId == 'copyChatMessageLink') {
            (async () => {
                const response = await chrome.tabs.sendMessage(tab.id, 'copyChatMessageLink');
                // do something with response here, not outside the function
                console.log(response);
              })();
        }
    }
);
  
// chrome.commands.onCommand.addListener((command) => {
//     console.log(`Command: ${command}`);
// });