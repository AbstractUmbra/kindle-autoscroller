'use strict';

console.log('Start Script');

if (typeof browser === "undefined") {
    var browser = chrome;
}

function observe(root, id, callback) {
    const observer = new MutationObserver((mutations) => {
        for (let mutation of mutations) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                for (let node of mutation.addedNodes) {
                    if (node.id === id) {
                        callback(node);
                        observer.disconnect();
                    }
                }
            }
        }
    });

    observer.observe(root, {
        attributes: true, childList: true, subtree: true
    });
};

browser.storage.local.get('ks_enabled', data => {
    if (data.ks_enabled) {
        observe(document.body, 'KindleReaderIFrame', (iframe) => {
            setInterval(() => {
                const rightButton = iframe.contentWindow.document.getElementById('kindleReader_pageTurnAreaRight');
                if (rightButton) {
                    rightButton.click();
                }
            }, 45000);
        });
    } else {
        console.log('disabled');
    }
});
