const gameCanvas = document.getElementById("gameCanvas");
gameCanvas.width = 640;
gameCanvas.height = 480;
const gameCanvasCtx = gameCanvas.getContext("2d");
const musquitoImage = document.getElementById("musquitoImage");

const startPoint = { x: 0, y: 0 };
const endPoint = { x: 641, y: 481 };
let neg;
if (Math.round(Math.random(1) + 1) == 1) {
    neg = true;
} else {
    neg = false;
}
console.log(neg)

if (Math.round(Math.random(1) + 1) == 1) {
    console.log("enter")
    startPoint.x = Math.floor(Math.random() * 641);
    startPoint.y = 0;
} else {
    startPoint.y = Math.floor((Math.random() * 481));
    startPoint.x = 0;
}
if (Math.round(Math.random(1) + 1) == 1) {
    endPoint.x=640;
    endPoint.y=Math.floor(Math.random()*481);
} else{
    endPoint.x=Math.floor(Math.random()*641);
    endPoint.y=480;
}

console.log("startpoint.x=",startPoint.x)
console.log("startpoint.y=",startPoint.y)
console.log("endpoint.x=",endPoint.x);
console.log("endpoint.y=",endPoint.y)


let currentPostion = { ...startPoint };
let distanceX = endPoint.x - startPoint.x;
let distanceY = endPoint.y - startPoint.x;
const speed = 2;
setInterval(() => {
    gameCanvasCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height)
    let { moveX, moveY } = {
        moveX: speed * (distanceX / Math.sqrt(distanceX * distanceX + distanceY * distanceY)),
        moveY: speed * (distanceY / Math.sqrt(distanceX * distanceX + distanceY * distanceY))
    }
    currentPostion.x = currentPostion.x + moveX;
    currentPostion.y = currentPostion.y + moveY;
    if ((currentPostion.x - endPoint.x) <= 0 && (currentPostion.y - endPoint.y) <=  0) {
        gameCanvasCtx.drawImage(musquitoImage, currentPostion.x, currentPostion.y, 200, 200);
    }

}, 41.6667)