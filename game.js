const gameCanvas = document.getElementById("gameCanvas");
gameCanvas.width = 640;
gameCanvas.height = 480;
const gameCanvasCtx = gameCanvas.getContext("2d");
const musquitoImage = document.getElementById("musquitoImage");

let startPoint = { x: 0, y: 0 };
let endPoint = { x: 641, y: 481 };

if(Math.round(Math.random()+ 1)==1){
    startPoint.x=Math.floor(Math.random()*641);
    startPoint.y=0;
} else{
    startPoint.y=Math.floor(Math.random()*481);
    startPoint.x=0;
}

if(Math.round(Math.random()+ 1)==1){
    endPoint.x=640;
    endPoint.y=Math.floor(Math.random()*481);
} else{
    endPoint.y=480;
    endPoint.x=Math.floor(Math.random()*641);   
}


let currentPostion = { x:startPoint.x-200, y:startPoint.y-200 };
let distanceX = endPoint.x - startPoint.x;
let distanceY = endPoint.y - startPoint.y;
const speed = 10;
setInterval(() => {
    gameCanvasCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
    let { moveX, moveY } = {
        moveX: speed * (distanceX / Math.sqrt(distanceX * distanceX + distanceY * distanceY)),
        moveY: speed * (distanceY / Math.sqrt(distanceX * distanceX + distanceY * distanceY))
    }
    
    if ((currentPostion.x - endPoint.x) <= 0 || (currentPostion.y - endPoint.y) <= 0) {
        currentPostion.x = currentPostion.x + moveX;
        currentPostion.y = currentPostion.y + moveY;
        console.log("currentpos.x",currentPostion.x);
        console.log("currentpos.y",currentPostion.y);
        gameCanvasCtx.drawImage(musquitoImage, currentPostion.x, currentPostion.y , 200, 200);
    }

}, 41.6667)