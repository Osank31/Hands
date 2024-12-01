import { flyMusquito } from "./flyMusquito.js";
const gameCanvas = document.getElementById("gameCanvas");
gameCanvas.width = 1280;
gameCanvas.height = 720;
const gameCanvasCtx = gameCanvas.getContext("2d");
const musquitoImage = document.getElementById("musquitoImage");
let clickCoordinates=null;

flyMusquito(gameCanvas,gameCanvasCtx, 5);