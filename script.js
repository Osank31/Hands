// import MediapipeHands from "./mediapipe.js";
import { flyMusquito } from "./flyMusquito.js";
// const videoElement = document.getElementById('inputVideo');
const canvasElement = document.getElementById('outputCanvas');
canvasElement.width=1920;
canvasElement.height=1080;
const gameCanvas = document.getElementById("gameCanvas");
const gameCanvasCtx = gameCanvas.getContext("2d");
gameCanvas.width = 1280;
gameCanvas.height = 720;
const musquitoImage = document.getElementById("musquitoImage");
// const openHandImage = document.getElementById("openHand")
// const closedHandImage=document.getElementById("closedHand");
// let clickCoordinates=null;

// const ms = new MediapipeHands(videoElement, canvasElement, openHandImage,closedHandImage, gameCanvas, gameCanvasCtx);
// ms.initialize()

// ms.click = function (lmList, results, positionCoordinates) {
//     const handState = this.isHandClosed(lmList, results);
//     let click = false;

//     if (!this.isClosed && handState === "HandClosed") {
//         this.isClosed = true;
//         click = true;
//     } else if (this.isClosed && handState === "HandOpen") {
//         this.isClosed = false;
//     }

//     if (click) {
//         console.log("Click detected at position:", positionCoordinates);
//         //------>

//         clickCoordinates={x: positionCoordinates[0], y: positionCoordinates[1]};


//     }
// };


flyMusquito(gameCanvas,gameCanvasCtx,musquitoImage, 5);