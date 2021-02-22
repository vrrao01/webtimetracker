let showTableBtn=document.getElementById('btnShowTable');
let clearTimesBtn=document.getElementById('btnClearTimes');
let errorMessageElement=document.getElementById('errorMessage');
let timeTable=document.getElementById("timeTable");
clearTimesBtn.onclick=function(element){
    chrome.storage.local.set({"tabTimesObject": "{}"}, function(){

    });
}
showTableBtn.onclick=function(element){
    chrome.storage.local.get("tabTimesObject", function(dataCont){
        console.log(dataCont);
        let dataString=dataCont["tabTimesObject"];
        if(dataString==null){
            return;
        }
        try{
            let data=JSON.parse(dataString);
            var rowCount=timeTable.rows.length;
            for(var x=rowCount-1;x>=0;x--){
                timeTable.deleteRow(x);
            }
            let entries=[];
            for(var key in data){
                if(data.hasOwnProperty(key)){
                    entries.push(data[key]);
                }
            }
            entries.sort(function(e1,e2){
                let e1S=e1["trackedSeconds"];
                let e2S=e2["trackedSeconds"];
                if (isNaN(e1S) || isNaN(e2S)){
                    return 0;
                }
                if(e1S>e2S){
                    return 1;
                }
                else if(e1S<e2S){
                    return -1;
                }
                return 0;
            });
            entries.map(function(urlObject){
                let newRow=timeTable.insertRow(0);
                let celHostname=newRow.insertCell(0);
                let celTimeMinutes=newRow.insertCell(1);
                let celTime=newRow.insertCell(2);
                let celLastDate=newRow.insertCell(3);
                celHostname.innerHTML=urlObject["url"];
                let time_=urlObject["trackedSeconds"]!=null ? urlObject["trackedSeconds"]:0;
                celTime.innerHTML=Math.round(time_);
                celTimeMinutes.innerHTML=(time_/60).toFixed(2);
                let date=new Date();
                date.setTime(urlObject["lastDateVal"]!=null ? urlObject["lastDateVal"]:0);
                celLastDate.innerHTML=date.toUTCString();
               // date.setTime(urlObject["lastDateVal"]!=null ? urlObject["lastDateVal"]:0);
            });
            let headerRow=timeTable.insertRow(0);
            headerRow.insertCell(0).innerHTML="Url";
            headerRow.insertCell(1).innerHTML="Minutes";
            headerRow.insertCell(2).innerHTML="Tracked Sec";
            headerRow.insertCell(3).innerHTML="Last Visited Date";
           // headerRow.insertCell(4).innerHTML="First Visited on";

        }
        catch(err){
            const message="loading the tabTimesObject went wrong: "+err.toString();
            console.error(message);
            errorMessageElement.innerText=message;
            errorMessageElement.innerText=dataString;
        }
    });
}