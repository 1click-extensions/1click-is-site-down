chrome.runtime.setUninstallURL("https://1ce.org");

if (!localStorage.created) {
  chrome.tabs.create({ url: "https://1ce.org" });
  var manifest = chrome.runtime.getManifest();
  localStorage.ver = manifest.version;
  localStorage.created = 1;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log(request,sender);
    switch(request.action){
      case 'checkSite':
        aja().url('https://utils.1ce.org/is-site-down?url=' + decodeURIComponent(request.url))
        .timeout(10000)  
        .on('200', function(data){
            if(!data.status){
              sendResponse({status:'error'});
            }
            else{
              sendResponse({status: data.down ? 'down' : 'up'});
            }
              console.log(data);
              //well done
          })
          .on('40x', function(response){
            sendResponse({status:'down'});
          })
          .on('error', function(response){
            sendResponse({status:'offline'});
          })
          .on('50x', function(response){
            sendResponse({status:'down'});
          }).on('timeout', function(){
            sendResponse({status:'down'});
        }).go();

        break;

    }
    return true;
});