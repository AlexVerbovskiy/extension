chrome.runtime.onMessage.addListener(
    async function ({
        type,
        data,
        url,
        name
    }, sender, sendResponse) {
        const init = {
            method: type.toUpperCase(),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) init["body"] = data;

        const response = await fetch(url, init);
        const res = await response.json();
        chrome.tabs.sendMessage(sender.tab.id, {
            name,
            res
        }, function (response) {});

    }
);