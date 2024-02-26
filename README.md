# NStax

A browser extension to show results of NationStates issues

## Installation

### Chrome, Edge, and Opera GX

1. In `src`, rename `manifest-chrome.json` to `manifest.json`.
2.  - **Chrome**: Go to `chrome://extensions`, enable Developer mode, and load the unpacked extension from the `src` directory.
    - **Edge**: Go to `Settings and more` (3-dot menu on the top right corner), select `Extensions`, enable Developer mode, and load the temporary add-on from the `src` directory.
    - **Opera GX**: Go to `opera:extensions`, enable Developer mode, and load the unpacked extension from the `src` directory.

### Firefox

1. In `src`, rename `manifest-firefox.json` to `manifest.json`.
2. Go to `about:debugging#/runtime/this-firefox` and load the temporary add-on from the `src` directory.
3. Go to `about:addons`, select the NStax extension, go to `Permissions`, and turn on all permissions for the extension.

![Firefox extension permissions screenshot](/assets/firefox_permissions.png "Firefox extension permissions")

## To configure stats shown

Go to the Options page by clicking on the `Options` button in the top right corner of the pop-up, or right-clicking on the extension icon in the toolbar and selecting `Options`. Configure the stats you would like to be shown. Check the `Positive` checkbox if you prefer the entered stat to increase and uncheck the checkbox if you prefer the stat to decrease. Check the `Show Notabilities/Policies` if you would like notabilities and policies to be shown. Click `Save` to save changes.

## To use

Run the extension **while you are on the issue page** and the extension pop-up should look like this:

![Demo of the extension](/assets/demo.png "Demo of the extension")
