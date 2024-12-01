import MediapipeHands from "./mediapipe.js";
const videoElement = document.getElementById('inputVideo');
const canvasElement = document.getElementById('outputCanvas');

const ms = new MediapipeHands(videoElement, canvasElement);
ms.initialize()