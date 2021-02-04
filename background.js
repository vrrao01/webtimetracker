function getDomain(tablink){
    let url =  tablink[0].url;
    return url.split("/")[2];
};

function updateTime(){
    chrome.tabs.query({active:true},function(activeTab){
        let domain = getDomain(activeTab);
        let myObj = {};
        myObj[domain] = "";
        chrome.storage.local.get(domain,function(storedObject){
            timeSoFar = 0;
            if(storedObject[domain]){
                timeSoFar = storedObject[domain]+1;
                myObj[domain] = timeSoFar;
                chrome.storage.local.set(myObj,function(){
                    console.log("Set "+domain+" at "+myObj[domain]);
                });
            }
            else{
                timeSoFar++;
                myObj[domain] = timeSoFar;
                chrome.storage.local.set(myObj,function(){
                    console.log("Set "+domain+" at "+myObj[domain]);    
                });
            }
        });
    });
    chrome.browserAction.setBadgeText({'text':timeSoFar.toString()});
};


setInterval(updateTime,1000);
