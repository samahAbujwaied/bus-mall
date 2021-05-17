'use strict';
let attempts = 0;
let maxAttempts = 25;
let attemptsEl = document.getElementById('attempts');
let busmall = [];
function BusImage(busName) {
    //'cruisin-goat.jpg'.split('.') >>['cruisin-goat','jpg']
    this.busName = busName.split('.')[0];
    this.source = 'img/' + busName;
    this.clicks = 0;
    this.views = 0;
    busmall.push(this);
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

function renderImg() {
    leftImgIndex = generateImage();
    middleImgIndex = generateImage();
    rightImgIndex = generateImage();

    while (leftImgIndex === rightImgIndex || leftImgIndex=== middleImgIndex || middleImgIndex=== rightImgIndex) {
        leftImgIndex = generateImage();
        middleImgIndex=generateImage();
    }

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
        console.log(event.target.id)
        if (event.target.id === 'leftImg') {
            busmall[leftImgIndex].clicks++;
        } else if (event.target.id === 'middleImg') {
            busmall[middleImgIndex].clicks++;
        }
        else if (event.target.id === 'rightImg') {
            busmall[rightImgIndex].clicks++;
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
       let  br = document.createElement('br');
        ulEl.appendChild(br);
    }
  
        ViewResults.removeEventListener('click',btn);   
       

}