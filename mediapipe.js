class MediapipeHands {
    constructor(videoElement, canvasElement, openHandImage, gameCanvas, gameCanvasCtx) {
        this.videoElement = videoElement;
        this.canvasElement = canvasElement;
        this.canvasCtx = this.canvasElement.getContext("2d");
        this.gameCanvas = gameCanvas;
        this.gameCanvasCtx = gameCanvasCtx;
        this.hands = null;
        this.camera = null;
        this.landmarks = null;
        this.prevIncenter = [0, 0];
        this.openHandImage = openHandImage;
    }

    drawBox() {
        const boxWidth = 640;
        const boxHeight = 480;
        const xPos = (this.canvasElement.width - boxWidth) / 2;
        const yPos = (this.canvasElement.height - boxHeight) / 2;
        this.canvasCtx.strokeStyle = '#FFFFFF';
        this.canvasCtx.lineWidth = 5;
        this.canvasCtx.strokeRect(xPos, yPos, boxWidth, boxHeight);
    }

    assessHandPlacement(positionCoordinates) {
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

        this.gameCanvasCtx.drawImage(this.openHandImage, flippedX, adjustedY);
    }


    getInCenter(lmList) {
        let x1 = lmList[0][1], y1 = lmList[0][2];
        let x2 = lmList[5][1], y2 = lmList[5][2];
        let x3 = lmList[17][1], y3 = lmList[17][2];

        let a = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        let b = Math.sqrt((x2 - x3) ** 2 + (y2 - y3) ** 2);
        let c = Math.sqrt((x1 - x3) ** 2 + (y1 - y3) ** 2);

        return [
            (a * x1 + b * x2 + c * x3) / (a + b + c),
            (a * y1 + b * y2 + c * y3) / (a + b + c),
        ];
    }

    async initialize() {
        this.canvasElement.width = 1920;
        this.canvasElement.height = 1080;
        this.hands = new Hands({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        this.hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        this.camera = new Camera(this.videoElement, {
            onFrame: async () => {
                await this.hands.send({ image: this.videoElement });
            },
            width: 1920,
            height: 1080,
        });

        this.hands.onResults((results) => {
            this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
            this.canvasCtx.save();
            this.canvasCtx.scale(-1, 1);
            this.canvasCtx.translate(-this.canvasElement.width, 0);
            this.canvasCtx.drawImage(results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);
            if (results.multiHandLandmarks) {

                for (let handIndex = 0; handIndex < results.multiHandLandmarks.length; handIndex++) {
                    this.landmarks = results.multiHandLandmarks[handIndex];
                    let lmList = [];
                    this.landmarks.forEach((landmark, index) => {
                        let x = landmark.x * this.canvasElement.width;
                        let y = landmark.y * this.canvasElement.height;
                        let z = landmark.z;
                        lmList.push([index, x, y, z]);
                    });
                    let positionCoordinates = this.getInCenter(lmList);
                    console.log(positionCoordinates)
                    this.assessHandPlacement(positionCoordinates)
                    drawConnectors(this.canvasCtx, this.landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 10 });
                    drawLandmarks(this.canvasCtx, this.landmarks, { color: '#FF0000', lineWidth: 0.5 });
                }
            }
            this.canvasCtx.resetTransform();
        })
        this.canvasCtx.restore();

        this.camera.start();
    }
}

export default MediapipeHands;