# <img src="public/icons/icon_48.png" width="45" align="left"> De Shee Pad

A Chrome extension that lets you import Google Sheets into [Decipad](https://decipad.com) with one click.

## What it does

- **Detects Google Sheets**: Automatically highlights the extension icon when you're viewing a Google Spreadsheet
- **One-click import**: Click the extension icon and press "Import to Decipad" to send the sheet to your local Decipad instance
- **Background sync**: Monitors tab changes to keep the icon state in sync

## Prerequisites

- A running Decipad instance at `http://localhost:3000` (the extension calls `http://localhost:3000/api/import/url`)

## Install

### From source (Developer mode)

1. Clone this repository
2. Run `npm install`
3. Run `npm run build` to create a production build in the `build/` folder
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" (top right toggle)
6. Click "Load unpacked" and select the `build/` folder

## Development

```bash
# Install dependencies
npm install

# Watch for changes and rebuild automatically
npm run watch

# Create production build
npm run build

# Format code
npm run format
```

## How it works

1. **Background script** (`src/background.ts`): Listens for tab activation/updates. When the active tab is a Google Sheets URL (`docs.google.com/spreadsheets/d/...`), it switches the extension icon to a highlighted version.

2. **Popup** (`src/popup.ts`): Opens when you click the extension icon. On Google Sheets pages, it:
   - Sends the sheet URL to `http://localhost:3000/api/import/url`
   - Displays the returned Decipad import link
   - Shows the authenticated user's email

3. **Content script** (`src/contentScript.ts`): Currently empty (reserved for future page interactions).

## Project structure

```
src/
├── background.ts    # Service worker - tab monitoring & icon management
├── popup.ts         # Popup logic - import flow & UI
├── popup.css        # Popup styles
└── contentScript.ts # Content script (unused currently)

public/
├── manifest.json    # Extension manifest (v3)
├── popup.html       # Popup HTML
└── icons/           # Extension icons (normal + highlighted)

config/
├── webpack.config.js
├── webpack.common.js
└── paths.js
```

## Configuration

The extension is hardcoded to communicate with `http://localhost:3000`. To change this, modify the API URL in `src/popup.ts:48`.

## Permissions

- `activeTab` / `tabs` - To detect the current tab's URL
- `storage` - Reserved for future use
- `http://localhost:3000/api/import/*` - Host permission for the Decipad API

---

Built with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)