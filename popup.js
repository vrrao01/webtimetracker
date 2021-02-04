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
var allKeys, timeSpent, totalTimeSpent,sortedTimeList,topCount,topDataSet,topLabels;
var color = ["rgba(255, 0, 0, 1)","rgb(255, 51, 0)","rgb(255, 102, 0)","rgb(255, 153, 0)","rgb(255, 204, 0)","rgb(255, 255, 0)","rgb(204, 255, 0)","rgb(153, 255, 0)","rgb(102, 255, 0)","rgb(51, 255, 0)"];
totalTimeSpent = 0;
chrome.storage.local.get(null,function(siteList){
  allKeys = Object.keys(siteList);
  timeSpent = [];
  sortedTimeList = [];
  for (let i = 0; i<allKeys.length;i++ ){
    let webURL = allKeys[i];
    timeSpent.push(siteList[webURL]);
    totalTimeSpent+= siteList[webURL];
    sortedTimeList.push([webURL,siteList[webURL]]);
  }
  sortedTimeList.sort((a,b)=>b[1]-a[1]);
  console.log(sortedTimeList);

  topCount = allKeys.length>10 ? 10 : allKeys.length;
  console.log(topCount);

  topDataSet= [];
  topLabels= [];
  for(let j=0;j<topCount;j++){
    topDataSet.push(sortedTimeList[j][1]);
    topLabels.push(sortedTimeList[j][0]);
  }
  

    const webTable = document.getElementById('webList');
    for(let i = 0; i<allKeys.length;i++){
        let webURL = sortedTimeList[i][0];
        let row = document.createElement('tr');
        let serialNumber = document.createElement('td');
        serialNumber.innerText = i+1;
        let siteURL = document.createElement('td');
        siteURL.innerText= webURL;
        let siteTime = document.createElement('td');
        siteTime.innerText = secondsToString(sortedTimeList[i][1]);
        row.appendChild(serialNumber);
        row.appendChild(siteURL);
        row.appendChild(siteTime);
        webTable.appendChild(row);
        console.log(row);
    }

    new Chart(document.getElementById("pie-chart"), {
      type: 'doughnut',
      data: {
        labels: topLabels,
        datasets: [{
          label: "Time Spent",
          backgroundColor: color,
          data: topDataSet
        }]
      },
      options: {
        title: {
          display: true,
          text: "Top Visited Sites Today"
        },
        legend:{
            display:true
        },
        circumference : Math.PI,
        rotation: Math.PI
      }
  });

});




