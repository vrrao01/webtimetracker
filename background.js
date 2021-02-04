function secondsToString(seconds,compressed=false){
    let hours = parseInt(seconds/3600);
    seconds = seconds%3600;
    let minutes= parseInt(seconds/60);
    seconds = seconds%60;
    let timeString = "";
    if(hours){
      timeString += hours + " hrs ";
    }
    if(minutes){
      timeString += minutes + " min ";
    }
    if(seconds){
      timeString += seconds+ " sec "
    }
    if(!compressed){
      return timeString;
    }
    else{
      if(hours){
        return(`${hours}h`);
      }
      if(minutes){
        return(`${minutes}m`);
      }
      if(seconds){
        return(`${seconds}s`);
      }
    }
  };

function getDomain(tablink){
    let url =  tablink[0].url;
    return url.split("/")[2];
};

function updateTime(){
    chrome.tabs.query({active:true},function(activeTab){
        let domain = getDomain(activeTab);
        let myObj = {};
        let timeSoFar = 0;
        myObj[domain] = "";
        chrome.storage.local.get(domain,function(storedObject){
            if(storedObject[domain]){
                timeSoFar = storedObject[domain]+1;
                myObj[domain] = timeSoFar;
                chrome.storage.local.set(myObj,function(){
                    console.log("Set "+domain+" at "+myObj[domain]);
                    chrome.browserAction.setBadgeText({'text':secondsToString(timeSoFar,true)});
                });
            }
            else{
                timeSoFar++;
                myObj[domain] = timeSoFar;
                chrome.storage.local.set(myObj,function(){
                    console.log("Set "+domain+" at "+myObj[domain]);  
                    chrome.browserAction.setBadgeText({'text':secondsToString(timeSoFar,true)});  
                });
            }
        });
    });

    // console.log(timeSoFar);
};


setInterval(updateTime,1000);
