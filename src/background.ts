let activeTabId: number | undefined;

let lastUrl: string | undefined;
let lastTitle: string | undefined;

const getTabInfo = (tabId: number) => {
  chrome.tabs.get(tabId, function (tab) {
    if (lastUrl != tab.url || lastTitle != tab.title)
      console.log((lastUrl = tab.url), (lastTitle = tab.title));
    if (tab.url) {
      const urlObj = new URL(tab.url);
      const isGoogleSheet =
        /docs.google.com/.test(urlObj.host) &&
        /^\/spreadsheets\/d\/(.+?)\//.test(urlObj.pathname);
      setIcons(isGoogleSheet);
    }
  });
};

const setIcons = (isGoogleSheet: boolean) => {
  if (isGoogleSheet) {
    chrome.action.setIcon({
      path: {
        16: './icons/icon_16_hl.png',
        32: './icons/icon_32_hl.png',
        48: './icons/icon_48_hl.png',
        128: './icons/icon_128_hl.png',
      },
    });
  } else {
    chrome.action.setIcon({
      path: {
        16: './icons/icon_16.png',
        32: './icons/icon_32.png',
        48: './icons/icon_48.png',
        128: './icons/icon_128.png',
      },
    });
  }
};

chrome.tabs.onActivated.addListener(function (activeInfo) {
  getTabInfo((activeTabId = activeInfo.tabId));
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (activeTabId === tabId) {
    getTabInfo(tabId);
  }
});
