let closeBtns = document.querySelectorAll('.close');
let apply = document.getElementById('apply');

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        window.close();
    });
});

apply.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'apply' });
    });
});