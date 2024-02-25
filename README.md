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

## To configure stats shown

In `src/config.json`, in the `stats` array, create an object for every stat you would like to be displayed with the `name` property being the name of the stat (case sensitive, enter name exactly as shown on Nationstates) and the `isPositive` property set to `true` if you prefer the entered stat to increase and `false` if you prefer the stat to decrease.

_For example_, if you want the extension to show Taxation, Average Income, Average Income of Poor, and Average Income of Rich, and you prefer Taxation to decrease while preferring the rest to increase, the selectedStats array and the statPositive array should look like this:

```json
{
    "stats": [
        {
            "name": "Taxation",
            "isPositive": false
        },
        {
            "name": "Average Income",
            "isPositive": true
        },
        {
            "name": "Average Income of Poor",
            "isPositive": true
        },
        {
            "name": "Average Income of Rich",
            "isPositive": true
        },
        {
            "name": "Economy",
            "isPositive": true
        }
    ]
}
```

Run the extension **while you are on the issue page** and the extension pop-up should look like this:

![Demo of the extension](/assets/demo.png "Demo of the extension")
