let clickCoordinates = null;
const videoElement = document.getElementById('inputVideo');
const canvasElement = document.getElementById('outputCanvas');
canvasElement.width = 1920;
canvasElement.height = 1080;
const gameCanvas = document.getElementById("gameCanvas");
const gameCanvasCtx = gameCanvas.getContext("2d");
gameCanvas.width = 1280;
gameCanvas.height = 720;
const openHandImage = document.getElementById("openHand")
const closedHandImage = document.getElementById("closedHand");
import MediapipeHands from "./mediapipe.js";

const ms = new MediapipeHands(videoElement, canvasElement, openHandImage, closedHandImage, gameCanvas, gameCanvasCtx);
ms.initialize();
ms.click = function (lmList, results, positionCoordinates) {
    const handState = this.isHandClosed(lmList, results);
    let click = false;

    if (!this.isClosed && handState === "HandClosed") {
        this.isClosed = true;
        click = true;
    } else if (this.isClosed && handState === "HandOpen") {
        this.isClosed = false;
    }

    const originalXMin = 320, originalXMax = 1500;
    const originalYMin = 120, originalYMax = 960;

    const targetXMin = 0, targetXMax = 1280;
    const targetYMin = 0, targetYMax = 720;

    let adjustedX = positionCoordinates[0];
    adjustedX = Math.max(Math.min(adjustedX, originalXMax), originalXMin);
    adjustedX = ((adjustedX - originalXMin) / (originalXMax - originalXMin)) * (targetXMax - targetXMin);
    let adjustedY = positionCoordinates[1];
    adjustedY = Math.max(Math.min(adjustedY, originalYMax), originalYMin);
    adjustedY = ((adjustedY - originalYMin) / (originalYMax - originalYMin)) * (targetYMax - targetYMin);
    const flippedX = this.gameCanvas.width - adjustedX;

    if (click) {
        // console.log("Click detected at position:", positionCoordinates);
        //------>

        clickCoordinates={x: flippedX, y: adjustedY};
        console.log(clickCoordinates)
    }
    else{

        clickCoordinates=null
    }
};

gameCanvas.addEventListener('click', function (event) {
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(x, y)
});

export function flyMusquito(gameCanvas, gameCanvasCtx, musquitoImage, noOfMusquitoes) {
    let musquitoes = [];
    for (let i = 0; i < noOfMusquitoes; i++) {
        let startPoint = { x: 0, y: 0 };
        let endPoint = { x: gameCanvas.width + 1, y: gameCanvas.height + 1 };

        if (Math.round(Math.random() + 1) == 1) {
            startPoint.x = Math.floor(Math.random() * 641);
            startPoint.y = 0;
        } else {
            startPoint.y = Math.floor(Math.random() * 481);
            startPoint.x = 0;
        }

        if (Math.round(Math.random() + 1) == 1) {
            endPoint.x = 640;
            endPoint.y = Math.floor(Math.random() * 481);
        } else {
            endPoint.y = 480;
            endPoint.x = Math.floor(Math.random() * 641);
        }
        let distanceX = endPoint.x - startPoint.x;
        let distanceY = endPoint.y - startPoint.y;
        let speed = Math.round(Math.random() * 9 + 1);
        let currentPostion = { x: startPoint.x - 200, y: startPoint.y - 200 };

        let musquito = {
            endPoint,
            currentPostion,
            distanceX,
            distanceY,
            speed
        }
        musquitoes.push(musquito);
    }

    setInterval(() => {
        gameCanvasCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height)

        musquitoes.map((musquito, index) => {
            let { moveX, moveY } = {
                moveX: musquito.speed * (musquito.distanceX / Math.sqrt(musquito.distanceX * musquito.distanceX + musquito.distanceY * musquito.distanceY)),
                moveY: musquito.speed * (musquito.distanceY / Math.sqrt(musquito.distanceX * musquito.distanceX + musquito.distanceY * musquito.distanceY))
            };

            if (
                Math.abs(musquito.currentPostion.x - musquito.endPoint.x) > musquito.speed ||
                Math.abs(musquito.currentPostion.y - musquito.endPoint.y) > musquito.speed
            ) {
                musquito.currentPostion.x += moveX;
                musquito.currentPostion.y += moveY;
                gameCanvasCtx.drawImage(musquitoImage, musquito.currentPostion.x, musquito.currentPostion.y, 200, 200);
            }
            if (clickCoordinates) {
                if (
                    clickCoordinates.x >= musquito.currentPostion.x-200 && clickCoordinates.x <= musquito.currentPostion.x + 200 &&
                    clickCoordinates.y >= musquito.currentPostion.y-200 && clickCoordinates.y <= musquito.currentPostion.y + 200
                ) {
                    musquitoes.splice(index, 1);
                }
            }
        });
    }, 41.6667)
}