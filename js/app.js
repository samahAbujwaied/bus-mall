'use strict';
let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let busmall = [];
let busImagesNames = [];
let busClicks = [];
let busViews = [];
let arr=[[0,0,0]];
let busNamclick=[];

function BusImage(busName) {
    //'cruisin-goat.jpg'.split('.') >>['cruisin-goat','jpg']
    this.busName = busName.split('.')[0];
    this.source = 'img/' + busName;
    this.clicks = 0;
    this.views = 0;
    busmall.push(this);
    busImagesNames.push(this.busName);
   
    
}
function BusImageclick(busNameclick) {
    
   this.busNameclick=busNameclick;
   busNamclick.push(this);
   settingclicks();
    
}

function settingclicks(){
 let setclick=JSON.stringify(busNamclick);
 localStorage.setItem('clicks',setclick);
 console.log(setclick);

}
let busImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];

for (let i = 0; i < busImages.length; i++) {
    new BusImage(busImages[i]);
}

function generateImage() {
    //0-1 >> 0-19
    return Math.floor(Math.random() * busmall.length);
}

let lImgEl = document.getElementById('leftImg');
let mImgEl= document.getElementById('middleImg')
let rImgEl = document.getElementById('rightImg');

let leftImgIndex;
let middleImgIndex;
let rightImgIndex;
let i=0;
function renderImg() {
    leftImgIndex = generateImage();
    middleImgIndex = generateImage();
    rightImgIndex = generateImage();
    i++;
    
    
    
    while(arr[i-1].includes(leftImgIndex)|| arr[i-1].includes(middleImgIndex) || arr[i-1].includes(rightImgIndex)
    || leftImgIndex === rightImgIndex || leftImgIndex=== middleImgIndex || middleImgIndex=== rightImgIndex){
        leftImgIndex = generateImage();
        middleImgIndex = generateImage();
        rightImgIndex = generateImage();
        
        // console.log(i);  
           console.log(arr);
   
    }
    arr.push([leftImgIndex,middleImgIndex,rightImgIndex]);
   
    lImgEl.setAttribute('src', busmall[leftImgIndex].source);
    lImgEl.setAttribute('title', busmall[leftImgIndex].source);
    busmall[leftImgIndex].views++;

    mImgEl.setAttribute('src', busmall[middleImgIndex].source);
    mImgEl.setAttribute('title', busmall[middleImgIndex].source);
    busmall[middleImgIndex].views++;

    rImgEl.setAttribute('src', busmall[rightImgIndex].source);
    rImgEl.setAttribute('title', busmall[rightImgIndex].source);
    busmall[rightImgIndex].views++;
    attemptsEl.textContent = attempts;
    
}
renderImg();

lImgEl.addEventListener('click', handelClicks);
mImgEl.addEventListener('click', handelClicks);
rImgEl.addEventListener('click', handelClicks);

let ViewResults=document.getElementById('button');
function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        if (event.target.id === 'leftImg') {
            busmall[leftImgIndex].clicks++;
            new BusImageclick(busmall[leftImgIndex]);
        } else if (event.target.id === 'middleImg') {
            busmall[middleImgIndex].clicks++;
            new BusImageclick( busmall[middleImgIndex]);
        }
        else if (event.target.id === 'rightImg') {
            busmall[rightImgIndex].clicks++;
            new BusImageclick(busmall[rightImgIndex]);
        }
        renderImg();
    } else {
        
       
       let buttonIt = document.createElement('button');
       ViewResults.appendChild(buttonIt);
       buttonIt.textContent='View Results';
       ViewResults.addEventListener('click',btn);
       lImgEl.removeEventListener('click', handelClicks);
       mImgEl.removeEventListener('click', handelClicks);
       rImgEl.removeEventListener('click', handelClicks); 
       
       
    }
    
}

function btn()
{
    
    let ulEl = document.getElementById('results');
    let liEl;
    for (let i = 0; i < busmall.length; i++) {
        liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${busmall[i].busName} has ${busmall[i].views} views and has ${busmall[i].clicks} clicks.`
        busClicks.push(busmall[i].clicks);
        busViews.push(busmall[i].views); 
        let  br = document.createElement('br');
        ulEl.appendChild(br);
    }
        chartRender();
        ViewResults.removeEventListener('click',btn);   
       

}
function chartRender() {
    var ctx = document.getElementById('myChart').getContext('2d');
    
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: busImagesNames,
            datasets: [{
                label: '# of Clicks',
                data: busClicks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 2
            }, {
                label: '# of Views',
                data: busViews,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
