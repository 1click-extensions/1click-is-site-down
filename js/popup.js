var query = { active: true, currentWindow: true },
    urlInput = document.getElementById('url'),
    message = document.getElementById('message'),
    title = document.getElementById('title'),
    sub = document.getElementById('submit');
title.innerText = chrome.i18n.getMessage("paste");
chrome.tabs.query(query, (tabs)=>{
    if(tabs && tabs[0]){
        urlInput.value = tabs[0].url;
    }
});

sub.addEventListener('click', ()=>{
    message.innerText = chrome.i18n.getMessage("please_wait");
    chrome.runtime.sendMessage({action: "checkSite",url:urlInput.value},(ans) =>{
        console.log(ans);
        if('error' == ans.status){
            message.innerText = chrome.i18n.getMessage("error_in_check");
        }
        else if('down' == ans.status){
            message.innerText = chrome.i18n.getMessage("site_is_down");
        }
        else if('offline' == ans.status){
            message.innerText = chrome.i18n.getMessage("offline");
        }
        else{
            message.innerText = chrome.i18n.getMessage("site_is_not_down");
        }
    });
})
