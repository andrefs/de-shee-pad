'use strict';

// https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/?key=${api_key}

let path;
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  console.log('XXXXXXXXx', { tabs });
  const tab = tabs[0];
  if (!tab || !tab.url) {
    return;
  }

  let url = new URL(tab.url);
  console.log('XXXXXXXXXXXX', { url });

  if (!url.pathname) {
    return;
  }
  const matches = url.pathname.match(/^\/spreadsheets\/d\/(.+?)\//);
  if (!matches) {
    return;
  }

  const sheetId = matches[1];
  const tabId = url.hash.replace(/^#gid=/, '');
  console.log('XXXXXXXXXX', { sheetId, tabId });

  const link = document.getElementById('deci-link') as HTMLAnchorElement;
  link!.href = `http://decipad.com/${encodeURIComponent(sheetId)}`;
});
