chrome.storage.local.get(null,function(siteList){
  allKeys = Object.keys(siteList);
  timeSpent = [];
  color=[];
  insI=document.getElementById('insInside');
  insB=document.getElementById('insBefore');
  for (let i = 0; i<allKeys.length;i++ ){
    let webURL = allKeys[i];
    timeSpent.push(siteList[webURL]);
    color.push('#'+Math.floor(Math.random()*16777215).toString(16));
    //console.log(webURL);
    }
    document.getElementById('btn').addEventListener("click",function(){
    for(let i = 0; i<allKeys.length;i++){
        let webURL = allKeys[i];
        let nDA=document.createElement('tr');
        let nDB=document.createElement('td');
        let nDC=document.createTextNode(webURL);
        let nDD=document.createElement('td');
        let nDE=document.createTextNode(siteList[webURL]+"sec");
        nDA.appendChild(nDB).appendChild(nDC);
        nDA.appendChild(nDD).appendChild(nDE);
        insI.insertBefore(nDA,insB);
        console.log(webURL)
    }
    })
});

setTimeout(function(){
  new Chart(document.getElementById("pie-chart"), {
    type: 'doughnut',
    data: {
      labels: allKeys,
      datasets: [{
        label: "status",
        backgroundColor: color,
        data: timeSpent
      }]
    },
    options: {
      title: {
        display: false
      },
      legend:{
          display:false
      },
      circumference : Math.PI,
      rotation: Math.PI
    }
});
},10)



