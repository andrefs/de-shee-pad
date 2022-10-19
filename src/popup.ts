'use strict';

// https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/?key=${api_key}

let path;
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  console.log('XXXXXXXXx', { tabs });
  const tab = tabs[0];
  if (!tab || !tab.url) {
    setDefaultPopup();
    return;
  }

  let url = new URL(tab.url);
  console.log('XXXXXXXXXXXX', { url });

  if (!url.pathname) {
    setDefaultPopup();
    return;
  }
  const matches = url.pathname.match(/^\/spreadsheets\/d\/(.+?)\//);
  if (!matches) {
    setDefaultPopup();
    return;
  }

  const sheetId = matches[1];
  setGSheetsPopup(sheetId);
});

const setGSheetsPopup = (sheetId: string) => {
  const link = document.getElementById('de-shee-pad-link') as HTMLAnchorElement;
  link!.href = `http://decipad.com/${encodeURIComponent(sheetId)}`;
  setPopupContent(
    'Yo this is bullsheet!',
    'Import it into <b>Decipad</b> you fool!',
    'IMPORT',
    `http://decipad.com/${encodeURIComponent(sheetId)}`
  );
};

const setDefaultPopup = () => {
  setPopupContent(
    'Decipad despises this website',
    'But you can still enjoy Decipad for other (better) things!',
    'IMPROVE MY LIFE',
    `http://decipad.com/`
  );
};

const setPopupContent = (
  title: string,
  subtitle: string,
  linkText: string,
  link: string
) => {
  const titleEl = document.getElementById(
    'de-shee-pad-title'
  ) as HTMLParagraphElement;
  titleEl!.innerHTML = title;

  const subTitleEl = document.getElementById(
    'de-shee-pad-subtitle'
  ) as HTMLParagraphElement;
  subTitleEl!.innerHTML = subtitle;

  const linkEl = document.getElementById(
    'de-shee-pad-link'
  ) as HTMLAnchorElement;
  linkEl!.innerHTML = linkText;
  linkEl!.href = link;
};
