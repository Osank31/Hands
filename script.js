import { flyMusquito } from "./flyMusquito.js";
const canvasElement = document.getElementById('outputCanvas');
canvasElement.width=1920;
canvasElement.height=1080;
const gameCanvas = document.getElementById("gameCanvas");
const gameCanvasCtx = gameCanvas.getContext("2d");
gameCanvas.width = 1280;
gameCanvas.height = 720;
const musquitoImage = document.getElementById("musquitoImage")


// flyMusquito(gameCanvas,gameCanvasCtx,musquitoImage);
flyMusquito(gameCanvas,gameCanvasCtx,musquitoImage, 5, 0)
// flyMusquito(gameCanvas,gameCanvasCtx,musquitoImage, 3, 0)