new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [{
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
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

chrome.storage.local.get(null,function(siteList){
  let allKeys = Object.keys(siteList);
    console.log(allKeys);
  for (let i = 0; i<allKeys.length;i++ ){
    let webURL = allKeys[i];
    console.log("Spent "+ siteList[webURL]+ " on "+  webURL)
  }
});




