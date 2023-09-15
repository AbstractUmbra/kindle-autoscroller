'use strict';

const TITLE_APPLY = "Kindle Scroll";

if (typeof browser === "undefined") {
    var browser = chrome;
}


console.log('Kindle Autoscroller has started.');

try {
    browser.storage.local.get('ks_enabled').then((data) => {
        if (data.enabled) {
            console.log('Kindle Autoscroller is enabled.');
        } else {
            console.log('Kindle Autoscroller is disabled.');
        }
    })
} catch (e) {
    const out = browser.storage.local.set({ ks_enabled: true });
    console.log(out);
};
console.log('Kindle Autoscroller has been enabled.');



browser.browserAction.onClicked.addListener(function (tab) {
    console.log('Button was clicked!');
    browser.storage.local.get('ks_enabled', async (data) => {
        if (data.ks_enabled) {
            console.log('Setting key to false.');
            await browser.storage.local.set({ ks_enabled: false });
        } else {
            console.log('Setting key to true.');
            await browser.storage.local.set({ ks_enabled: true })
        }
        await browser.tabs.reload();
    })
});
