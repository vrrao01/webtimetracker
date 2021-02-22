'use strict';

let page =document.getElementById('buttonDiv');
const kbColours=['blue','red','black','green'];
function constructOptions(kbColours){
    for(let item of kbColours){
        let button=document.createElement('button');
        button.style.backgroundColor=item;
        button.addEventListener('click',function(){
            chrome.storage.sync.set({color:item}, function(){
                console.log('colour: '+item);
            });
        });
        page.appendChild(button);
    }
}
constructOptions(kbColours);