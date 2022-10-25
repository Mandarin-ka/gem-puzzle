const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let gameArr=[];
let complication=16;
for(let i=0;i<complication;i++) gameArr[i]=i;

for (let i=0;i<5;i++) gameArr=gameArr.sort(()=>Math.random()-0.5);


function drawSquare(x,y,val){
    ctx.fillStyle = 'black';
    ctx.fillRect(x,y,100,100)

    val===0 ? ctx.fillStyle='white':ctx.fillStyle='teal';

    ctx.fillRect(x+5, y+5, 90, 90);
    ctx.font='60px Arial';
    ctx.fillStyle='white';
    val<10 ? ctx.fillText(val, x+35, y+70) : ctx.fillText(val, x+15, y+70) 

}

function drawTag(pos, value){
    switch(pos){
        case 0: 
            drawSquare(0,0,value)
            break;
        
        case 1: 
            drawSquare(100,0,value)
            break;

        case 2: 
            drawSquare(200,0,value)
            break;

        case 3: 
            drawSquare(300,0,value)
            break;

        case 4: 
            drawSquare(0,100,value)
            break;

        case 5: 
            drawSquare(100,100,value)
            break;

        case 6: 
            drawSquare(200,100,value)
            break;

        case 7: 
            drawSquare(300,100,value)
            break;

        case 8: 
            drawSquare(0,200,value)
            break;

        case 9: 
            drawSquare(100,200,value)
            break;

        case 10: 
            drawSquare(200,200,value)
            break;

        case 11: 
            drawSquare(300,200,value)
            break;

        case 12: 
            drawSquare(0,300,value)
            break;

        case 13: 
            drawSquare(100,300,value)
            break;

        case 14: 
            drawSquare(200,300,value)
            break;

        case 15: 
            drawSquare(300,300,value)
            break;

    }
}

for(let i=0;i<complication;i++) drawTag(i,gameArr[i])

function checkPlace(evX){
    if(evX<110) return 1;
    else if(evX<210) return 2;
    else if(evX<310) return 3;
    else return 4;
}

canvas.addEventListener('click', (event)=>{
    let clickPos;
    if(event.offsetY <100){
        let place = checkPlace(event.offsetX)
        switch(place){
            case 1:
                clickPos = 0;
                break;
            case 2:
                clickPos = 1;
                break;
            case 3:
                clickPos = 2;
                break;  
            case 4:
                clickPos = 3;
                break;      
        }
    }
    else if(event.offsetY >100 && event.offsetY<200){
        let place = checkPlace(event.offsetX)
        switch(place){
            case 1:
                clickPos = 4;
                break;
            case 2:
                clickPos = 5;
                break;
            case 3:
                clickPos = 6;
                break;  
            case 4:
                clickPos = 7;
                break;      
        }
    }
    else if(event.offsetY > 200 && event.offsetY < 300){
        let place = checkPlace(event.offsetX)
        switch(place){
            case 1:
                clickPos = 8;
                break;
            case 2:
                clickPos = 9;
                break;
            case 3:
                clickPos = 10;
                break;  
            case 4:
                clickPos = 11;
                break;      
        }
    }
    else if(event.offsetY>300 && event.offsetY <410){
        let place = checkPlace(event.offsetX)
        switch(place){
            case 1:
                clickPos = 12;
                break;
            case 2:
                clickPos = 13;
                break;
            case 3:
                clickPos = 14;
                break;  
            case 4:
                clickPos = 15;
                break;      
        }
    }

    if(gameArr[clickPos-4]===0){
        gameArr[clickPos-4]=gameArr[clickPos];
        gameArr[clickPos]=0;

        for(let i=0;i<gameArr.length;i++) drawTag(i, gameArr[i])
    }

    if(gameArr[clickPos+4]===0){
        gameArr[clickPos+4]=gameArr[clickPos];
        gameArr[clickPos]=0;

        for(let i=0;i<gameArr.length;i++) drawTag(i, gameArr[i])
    }

    if(gameArr[clickPos+1]===0 && clickPos!==3 && clickPos!==7 && clickPos!==11){
        gameArr[clickPos+1]=gameArr[clickPos];
        gameArr[clickPos]=0;

        for(let i=0;i<gameArr.length;i++) drawTag(i, gameArr[i])
    }

    if(gameArr[clickPos-1]===0 && clickPos!==0 && clickPos!==4 && clickPos!==8){
        gameArr[clickPos-1]=gameArr[clickPos];
        gameArr[clickPos]=0;

        for(let i=0;i<gameArr.length;i++) drawTag(i, gameArr[i])
    }
})



