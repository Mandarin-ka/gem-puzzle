const canvas = document.querySelector('#canvas');
const inputs = document.querySelectorAll('input');
const isChecked = () =>{for(let i=0; i<inputs.length; i++) if(inputs[i].checked) return +inputs[i].value}
let gameSize=isChecked();
let gameSizeTemp = gameSize;
let gameArr=[];

for (let input of inputs){
    input.addEventListener('change', ()=>{
        gameSize = +input.value;
        gameArr = [];
        for(let i=0;i<gameSize*gameSize;i++) gameArr[i]=i;
        restart();
    });

}

//base functions and settings

for(let i=0;i<gameSize*gameSize;i++) gameArr[i]=i;

function shuffle(arr){
    for (let i=0;i<3;i++){
        arr.sort(()=>Math.random()-0.5)
    }
    if(isCollected(gameArr)){
        return arr;
    } else{
        shuffle(gameArr)
    }
}

shuffle(gameArr)
//---------------------------------------------------------------sounder
let player = new Audio();
player.volume = .3

function playAudio(){
    let link = 'sound.mp3'
    playSound(link)
  }
  
  function playSound(link) {
    player.src = link
    player.play()
  }

//----------------------------------------------------------------move

function findPositionX(size, xCoor){
    if(size===3){
        if(xCoor<133) return 1; 
        else if (xCoor<266) return 2;
        else return 3;
    }
    if(size===4){
        if(xCoor<100) return 1; 
        else if (xCoor<200) return 2;
        else if (xCoor<300) return 3;
        else return 4;
    }
    if(size===5){
        if(xCoor<80) return 1; 
        else if (xCoor<160) return 2;
        else if (xCoor<240) return 3;
        else if (xCoor<320) return 4;
        else return 5;
    }
    if(size===6){
        if(xCoor<66) return 1; 
        else if (xCoor<132) return 2;
        else if (xCoor<66*3) return 3;
        else if (xCoor<66*4) return 4;
        else if (xCoor<66*5) return 5;
        else return 6;
    }
    if(size===7){
        if(xCoor<57) return 1; 
        else if (xCoor<57*2) return 2;
        else if (xCoor<57*3) return 3;
        else if (xCoor<57*4) return 4;
        else if (xCoor<57*5) return 5;
        else if (xCoor<57*6) return 6;
        else return 7;
    }
    if(size===8){
        if(xCoor<50) return 1; 
        else if (xCoor<100) return 2;
        else if (xCoor<150) return 3;
        else if (xCoor<200) return 4;
        else if (xCoor<250) return 5;
        else if (xCoor<300) return 6;
        else if (xCoor<350) return 7;
        else return 8;
    }
}

function findPositionY(size, yCoor){
    if(size===3){
        if(yCoor<133) return 1; 
        else if (yCoor<266) return 2;
        else return 3;
    }
    if(size===4){
        if(yCoor<100) return 1; 
        else if (yCoor<200) return 2;
        else if (yCoor<300) return 3;
        else return 4;
    }
    if(size===5){
        if(yCoor<80) return 1; 
        else if (yCoor<160) return 2;
        else if (yCoor<240) return 3;
        else if (yCoor<320) return 4;
        else return 5;
    }
    if(size===6){
        if(yCoor<66) return 1; 
        else if (yCoor<132) return 2;
        else if (yCoor<66*3) return 3;
        else if (yCoor<66*4) return 4;
        else if (yCoor<66*5) return 5;
        else return 6;
    }
    if(size===7){
        if(yCoor<57) return 1; 
        else if (yCoor<57*2) return 2;
        else if (yCoor<57*3) return 3;
        else if (yCoor<57*4) return 4;
        else if (yCoor<57*5) return 5;
        else if (yCoor<57*6) return 6;
        else return 7;
    }
    if(size===8){
        if(yCoor<50) return 1; 
        else if (yCoor<100) return 2;
        else if (yCoor<150) return 3;
        else if (yCoor<200) return 4;
        else if (yCoor<250) return 5;
        else if (yCoor<300) return 6;
        else if (yCoor<350) return 7;
        else return 8;
    }
}

let step = 0;
let index = 0;
canvas.addEventListener('click', (event)=>{
    let x = findPositionX(gameSize, event.offsetX)
    let y = findPositionY(gameSize, event.offsetY)
    let clickPosIndex = (y-1)*gameSize+x-1
    index=clickPosIndex;
    move(clickPosIndex, x ,y);
    index=clickPosIndex;
})

function move(clickPosIndex,x,y){
    if(!isWin() && ! pause){
        if(gameArr[clickPosIndex-gameSize]==0){
            gameArr[clickPosIndex-gameSize] =  gameArr[clickPosIndex];
            gameArr[clickPosIndex]=0;
            !isWin() ? step++ : step;
            stepCounter.textContent = step;
            playAudio()
            win();
        }

        if(gameArr[clickPosIndex+gameSize]==0){
            gameArr[clickPosIndex+gameSize] =  gameArr[clickPosIndex];
            gameArr[clickPosIndex]=0;
            !isWin() ? step++ : step;
            stepCounter.textContent = step;
            playAudio()
            win();
        }

        if(gameArr[clickPosIndex-1]===0 && clickPosIndex - 1 != (y-2)*gameSize+gameSize-1){
            gameArr[clickPosIndex-1] =  gameArr[clickPosIndex];
            gameArr[clickPosIndex]=0;
            !isWin() ? step++ : step;
            stepCounter.textContent = step;
            playAudio()
            win();
        }

        if(gameArr[clickPosIndex+1]===0 && clickPosIndex != (y-1)*gameSize+gameSize-1){
            gameArr[clickPosIndex+1] = gameArr[clickPosIndex];
            gameArr[clickPosIndex]=0;
            !isWin() ? step++ : step;
            stepCounter.textContent = step;
            playAudio()
            win();
        }
}
    

    for(let i=0;i<gameArr.length;i++) drawTag(i, gameArr[i])
}

//restart-btn---------------------------------------------------------
const restartBtn = document.querySelector('.restart');
function restart(){
    shuffle(gameArr);
    drawTag();
    stepCounter.textContent = 0;
    step=0;
    sec =0;
    min=0;
    time.textContent = '00:00';
    congrats.textContent = ''
}

restartBtn.addEventListener('click', restart)

const stepCounter = document.querySelector('.counter');

//graphics----------------------------------------------------------
const ctx = canvas.getContext('2d');

function drawSquare(x,y,val){
    if (gameSize==3){
        ctx.fillStyle = 'black';
        ctx.fillRect(x,y,133,133)
        
        val===0 ? ctx.fillStyle='white':ctx.fillStyle='#964b00';
    
        ctx.fillRect(x+7, y+7, 120, 120);
        ctx.font='60px Arial';
        ctx.fillStyle='white';
        val<10 ? ctx.fillText(val, x+50, y+90) : ctx.fillText(val, x+15, y+70)
    }
    else if(gameSize==4){
        ctx.fillStyle = 'black';
        ctx.fillRect(x,y,100,100)
        
        val===0 ? ctx.fillStyle='white':ctx.fillStyle='#964b00';
    
        ctx.fillRect(x+5, y+5, 90, 90);
        ctx.font='60px Arial';
        ctx.fillStyle='white';
        val<10 ? ctx.fillText(val, x+35, y+70) : ctx.fillText(val, x+15, y+70)
    }
    else if(gameSize==5){
        ctx.fillStyle = 'black';
        ctx.fillRect(x,y,80,80)
        
        val===0 ? ctx.fillStyle='white':ctx.fillStyle='#964b00';
    
        ctx.fillRect(x+5, y+5, 70, 70);
        ctx.font='45px Arial';
        ctx.fillStyle='white';
        val<10 ? ctx.fillText(val, x+25, y+55) : ctx.fillText(val, x+15, y+55)
    }

    else if (gameSize==6){
        ctx.fillStyle = 'black';
        ctx.fillRect(x,y,66,66)
    
        val===0 ? ctx.fillStyle='white':ctx.fillStyle='#964b00';
    
        ctx.fillRect(x+4, y+4, 58, 58);
        ctx.font='35px Arial';
        ctx.fillStyle='white';
        val<10 ? ctx.fillText(val, x+25, y+45) : ctx.fillText(val, x+15, y+45)
    }

    else if (gameSize==7){
        ctx.fillStyle = 'black';
        ctx.fillRect(x,y,57,57)
    
        val===0 ? ctx.fillStyle='white':ctx.fillStyle='#964b00';
    
        ctx.fillRect(x+3, y+3, 51, 51);
        ctx.font='28px Arial';
        ctx.fillStyle='white';
        val<10 ? ctx.fillText(val, x+21, y+40) : ctx.fillText(val, x+14, y+40)
    }

    else{
        ctx.fillStyle = 'black';
        ctx.fillRect(x,y,50,50)
    
        val===0 ? ctx.fillStyle='white':ctx.fillStyle='#964b00';
    
        ctx.fillRect(x+3, y+3, 45, 45);
        ctx.font='25px Arial';
        ctx.fillStyle='white';
        val<10 ? ctx.fillText(val, x+19, y+35) : ctx.fillText(val, x+13, y+35)
    }
}

function drawTag(){
    counter = -1;
    for(let i=0;i<gameArr.length;i++){
        if(i%gameSize==0) counter++;
        if(gameSize==3) drawSquare((i-counter*gameSize)*133,counter*133,gameArr[i]);
        else if(gameSize==4) drawSquare((i-counter*gameSize)*100,counter*100,gameArr[i]);
        else if(gameSize==5) drawSquare((i-counter*gameSize)*80,counter*80,gameArr[i]);
        else if(gameSize==6) drawSquare((i-counter*gameSize)*66,counter*66,gameArr[i]);
        else if(gameSize==7) drawSquare((i-counter*gameSize)*57,counter*57,gameArr[i]);
        else if(gameSize==8) drawSquare((i-counter*gameSize)*50,counter*50,gameArr[i]);
    }
}

drawTag();

//checkers------------------------------------------------------------------
function isWin(){
    let temp = [];
    for (let i=0;i<gameSize*gameSize;i++) (i+1)%(gameSize*gameSize)!=0 ? temp[i]=i+1 : temp[i]=0;
    let tempBool = true;
    for (let i=0;i<gameSize*gameSize;i++) if(gameArr[i]!=temp[i]) tempBool = false;
    return tempBool;
}

function isCollected(arr){
    let temp=[];
    for (let i=0;i<arr.length;i++) arr[i]!==0 ? temp[i] = arr[i] : temp[i]=16;
    let counter=0;
    for (let i=0;i<temp.length;i++){
        for (let j=i+1;j<temp.length;j++){
            if(temp[i]>temp[j]) counter++;
        }
    }
    return counter%2==0;
}

//--------------------------------------------------------------time-checker
const time = document.querySelector('.timer');
const pauseBtn = document.querySelector('.pause');

let sec=0;
let min=0;
function initTimer(){
    setInterval(tick, 1000);
}

function tick(){
    if(!pause && !isWin()){
        sec++
        if(sec==60){
            min++;
            sec=0;
        }
    }

    if(min<10 && sec<10) time.textContent = '0' + min + ':' + '0' + sec;
    else if(min<10 ?? sec>=10) time.textContent = '0' + min + ':' + sec;
    else if(min>10 ?? sec<10) time.textContent =  min + ':' + '0' + sec;
    else time.textContent =  min + ':' + sec;
}

let pause = false;
pauseBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(pause===false) {
        pause = true;
        pauseBtn.textContent = 'Resume';
    }
    else{
        pause = false;
        pauseBtn.textContent = 'Pause';
    }
})

const congrats = document.querySelector('.congrats');

function win(){
    if(isWin()){
        pause=true;
        congrats.textContent = 'Hooray! You solved the puzzle in ' + (min*60+sec) + ' seconds and ' + step + ' moves'
    }
}

initTimer();