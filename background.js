chrome.runtime.onInstalled.addListener(() => {

})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_href') {
        if (chrome.runtime.lastError) {
            sendResponse({ 
                message: 'fail' 
            });

            return
        }

        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let _url = tabs[0].url;
            sendResponse({ 
                message: 'success',
                payload: _url
            })
        });

        return true;
    } else if (request.message === 'download_qr') {
        chrome.downloads.download({
            url: request.url,
            saveAs: true
        });
    }
})