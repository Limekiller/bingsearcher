let activated = 0

const performSingleSearch = () => {
    const textArr = document.querySelector('html').innerText.split(' ')
    const startIndex = Math.floor(Math.random() * (textArr.length + 1))

    let searchString = ''
    for (let i = 0; i < 5; i++) {
        searchString += textArr[startIndex + i] + ' '
    }

    document.querySelector('#sb_form_q').value = searchString
    document.querySelector('#sb_form_go').click()
}

const delay = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

chrome.tabs.onUpdated.addListener(async (tabId, info) => {
    if (info.status === 'complete') {
        if (activated === 1) {
            activated = 2
            for (let i = 0; i < 30; i++) {
                if (activated) {
                    chrome.tabs.executeScript({
                        code: '(' + performSingleSearch + ')();'
                    })
                    await delay(7500)
                } else {
                    return
                }
            }
        }
    }
})

chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(data => {
        if (data.command == 'start') {
            activated = 1
            chrome.tabs.executeScript({
                code: '(' + performSingleSearch + ')();'
            });
        } else {
            activated = 0
        }
    })
})