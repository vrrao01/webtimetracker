chrome.storage.local.get(null,function(siteList){
  var dateShown='04022021';
  let allKeys = Object.keys(siteList[dateShown]);
  let timeSpent = [];
  let color=[];
  let insI=document.getElementById('insInside');
  let insB=document.getElementById('insBefore');
    document.getElementById('btn').addEventListener("click",function(){
      document.getElementById('frmDate').innerHTML='<input type="date" id="hidnDate"><input type="button" value="View by date" id="hidnButton">';
      document.getElementById('hidnButton').addEventListener('click',function(){
        var selectedDate=document.getElementById('hidnDate').value;
        selectedDate=selectedDate.split('-');
        selectedDate=selectedDate[2]+selectedDate[1]+selectedDate[0];
        dateShown=selectedDate.toString();
        allKeys = Object.keys(siteList[dateShown]);
      })
      for(let i = 0; i<allKeys.length;i++){
          let webURL = allKeys[i];
          let nDA=document.createElement('tr');
          let nDB=document.createElement('td');
          let nDC=document.createTextNode(webURL);
          let nDD=document.createElement('td');
          let nDE=document.createTextNode(siteList[dateShown][webURL]+"sec");
          nDA.appendChild(nDB).appendChild(nDC);
          nDA.appendChild(nDD).appendChild(nDE);
          insI.insertBefore(nDA,insB);
        }
        document.getElementById('btn').setAttribute('disabled',true);
      })
  for (let i = 0; i<allKeys.length;i++ ){
    let webURL = allKeys[i];
    timeSpent.push(siteList[dateShown][webURL]);
    color.push('#'+Math.floor(Math.random()*16777215).toString(16));
    }
  new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
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
      }
    }
  });
});


