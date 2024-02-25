# NStax
A browser extension to show results of NationStates issues
## Installation
### Chrome, Edge, and Opera GX
1. In `src`, rename `manifest-chrome.json` to `manifest.json`.
2. * **Chrome**: Go to `chrome://extensions`, enable Developer mode, and load the unpacked extension from the `src` directory.
    * **Edge**: Go to `Settings and more` (3-dot menu on the top right corner), select `Extensions`, enable Developer mode, and load the temporary add-on from the `src` directory.
    * **Opera GX**: Go to `opera:extensions`, enable Developer mode, and load the unpacked extension from the `src` directory.
### Firefox
1. In `src`, rename `manifest-firefox.json` to `manifest.json`.
2. Go to `about:debugging#/runtime/this-firefox` and load the temporary add-on from the `src` directory.
## To configure stats shown
In `src/script.js`, add the name of the stats you would like to be displayed in the selectedStats array (case sensitive, enter name exactly as shown on Nationstates). In the statPositive array, set to `true` if you prefer the entered stat to increase and `false` if you prefer the stat to decrease.

*For example*, if you want the extension to show Taxation, Average Income, Average Income of Poor, and Average Income of Rich, and you prefer Taxation to decrease while preferring the rest to increase, the selectedStats array and the statPositive array should look like this:
```
const selectedStats = ["Taxation", "Average Income", "Average Income of Poor", "Average Income of Rich"];
const statPositive = [false, true, true, true];
```
Run the extension **while you are on the issue page** and the extension pop-up should look like this:

![Demo of the extension](/assets/demo.png "Demo of the extension")
