import MediapipeHands from "./mediapipe.js";
import { flyMusquito } from "./flyMusquito.js";
const videoElement = document.getElementById('inputVideo');
const canvasElement = document.getElementById('outputCanvas');
canvasElement.width=1920;
canvasElement.height=1080;
const gameCanvas = document.getElementById("gameCanvas");
const gameCanvasCtx = gameCanvas.getContext("2d");
gameCanvas.width = 1280;
gameCanvas.height = 720;
const musquitoImage = document.getElementById("musquitoImage");
const openHandImage = document.getElementById("openHand")
const closedHandImage=document.getElementById("closedHand");

const ms = new MediapipeHands(videoElement, canvasElement, openHandImage,closedHandImage, gameCanvas, gameCanvasCtx);
ms.initialize()

let clickCoordinates=null;

flyMusquito(gameCanvas,gameCanvasCtx,musquitoImage, 5);