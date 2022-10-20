'use strict';
import './popup.css';

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

  setTimeout(() => {
    chrome.runtime.sendMessage(
      {
        type: 'DO_FETCH',
        payload: {
          url: `http://localhost:3000/api/import/url?url=${encodeURIComponent(
            tab.url as string
          )}`,
        },
      },
      (response) => {
        if (response) {
          console.log('RESponse', response);
          const { url, user } = JSON.parse(response.message);
          const email = user.email;
          const link = url;

          setGSheetsPopup(email, link);
        }
      }
    );
  }, 1000);
});

const setGSheetsPopup = (email: string, link: string) => {
  setPopupContent(email, link);
};

const setDefaultPopup = () => {
  //setPopupContent(
  //  'Decipad despises this website',
  //  'But you can still enjoy Decipad for other (better) things!',
  //  'IMPROVE MY LIFE',
  //  `http://decipad.com/`
  //);
};

const setPopupContent = (email: string, link: string) => {
  const linkEl = document.getElementById(
    'de-shee-pad-link'
  ) as HTMLAnchorElement;
  linkEl!.href = link;

  const emailEl = document.getElementById(
    'de-shee-pad-email'
  ) as HTMLParagraphElement;
  emailEl!.innerHTML = email;
};
