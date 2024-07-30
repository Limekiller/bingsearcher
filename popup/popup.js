document.querySelector(".start").addEventListener('click', e => {
    const port = chrome.runtime.connect({ name: "search" })
    port.postMessage({ command: 'start' })
})

document.querySelector(".cancel").addEventListener('click', e => {
    const port = chrome.runtime.connect({ name: "search" })
    port.postMessage({ command: 'stop' })
})
