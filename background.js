function getDomain(tablink){
    let url =  tablink[0].url;
    return url.split("/")[2];
};
var timeSoFar;
function updateTime(){
        let nDate=new Date();
        let nDateDate=nDate.getDate();
        let nDateMonth=nDate.getMonth()+1;
        let nDateYear=nDate.getFullYear().toString();
        if(nDateDate<10){nDateDate="0"+nDateDate.toString();};
        if(nDateMonth<10){nDateMonth="0"+nDateMonth.toString();};
        let presentDate=nDateDate+nDateMonth+nDateYear;
    chrome.tabs.query({active:true},function(activeTab){
        let domain = getDomain(activeTab);
        let myObj = {};
        myObj[presentDate]={};
        myObj[presentDate][domain] = "";
        chrome.storage.local.get(null,function(storedObject){
            timeSoFar = 0;
            if(storedObject[presentDate]){
                if(storedObject[presentDate][domain]){
                    timeSoFar = storedObject[presentDate][domain]+1;
                    myObj = storedObject;
                    myObj[presentDate][domain] = timeSoFar;
                    chrome.storage.local.set(myObj,function(){
                        console.log(`${myObj[presentDate][domain]} in ${domain}`);
                    });
                }
                else{
                    timeSoFar++;
                    myObj = storedObject;
                    myObj[presentDate][domain] = timeSoFar;
                    chrome.storage.local.set(myObj,function(){
                        console.log(`${myObj[presentDate][domain]} in ${domain}`);    
                    });
                }
            }
            else{
                timeSoFar++;
                myObj = storedObject;
                myObj[presentDate] = {};
                myObj[presentDate][domain]= timeSoFar;
                chrome.storage.local.set(myObj,function(){
                console.log(`${myObj[presentDate][domain]} in ${domain}`);});
            }
        });
    });
    chrome.browserAction.setBadgeText({'text':timeSoFar.toString()});
};


setInterval(updateTime,1000);
