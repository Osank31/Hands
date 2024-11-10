const videoElement = document.getElementById('inputVideo');
const canvasElement = document.getElementById('outputCanvas');
const canvasCtx = canvasElement.getContext('2d');

// Set the size of the canvas to 3840x2160
canvasElement.width = 1920;
canvasElement.height = 1080;

// Function to draw a box inside the canvas
function drawBox() {
    const boxWidth = 640;
    const boxHeight = 480;

    // Calculate the position of the box (centered inside the canvas)
    const xPos = (canvasElement.width - boxWidth) / 2;
    const yPos = (canvasElement.height - boxHeight) / 2;

    // Draw the box on the canvas (above the video frame)
    canvasCtx.strokeStyle = '#FFFFFF';  // Box color (white)
    canvasCtx.lineWidth = 5;
    canvasCtx.strokeRect(xPos, yPos, boxWidth, boxHeight);
}

// Initialize the Hands solution
const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
});

function getInCenter(lmList) {
    let x1 = lmList[0][1];
    let y1 = lmList[0][2];

    let x2 = lmList[5][1];
    let y2 = lmList[5][2];

    let x3 = lmList[5][1];
    let y3 = lmList[5][2];

    let a = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    let b = Math.sqrt((x2 - x3) ** 2 + (y2 - y3) ** 2);
    let c = Math.sqrt((x1 - x3) ** 2 + (y1 - y3) ** 2);

    let incenter = [
        (a * x1 + b * x2 + c * x3) / (a + b + c),
        (a * y1 + b * y2 + c * y3) / (a + b + c),
    ];
    return incenter;
}

let prevIncenter = [0, 0];

hands.onResults((results) => {
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    canvasCtx.save();
    canvasCtx.scale(-1, 1);
    canvasCtx.translate(-canvasElement.width, 0);

    // Draw the video frame first
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // Draw the 1920x1080 box on top of the video frame
    drawBox();

    if (results.multiHandLandmarks) {
        for (let handIndex = 0; handIndex < results.multiHandLandmarks.length; handIndex++) {
            const landmarks = results.multiHandLandmarks[handIndex];

            let lmList = [];

            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 10 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 0.5 });

            landmarks.forEach((landmark, index) => {
                const x = landmark.x * canvasElement.width;
                const y = landmark.y * canvasElement.height;
                const z = landmark.z;
                lmList.push([index, x, y, z]);
            });

            let incenter = getInCenter(lmList);
            const threshold = 50;

            let updatedIncenter = [...incenter];

            if (Math.abs(incenter[0] - prevIncenter[0]) > threshold) {
                updatedIncenter[0] = incenter[0];
            } else {
                updatedIncenter[0] = prevIncenter[0];
            }

            if (Math.abs(incenter[1] - prevIncenter[1]) > threshold) {
                updatedIncenter[1] = incenter[1];
            } else {
                updatedIncenter[1] = prevIncenter[1];
            }

            prevIncenter = updatedIncenter;

            // console.log(updatedIncenter);

            let handcoordinates=[updatedIncenter[0]-640, updatedIncenter[1]-480]
            // console.log(handcoordinates);
            
        }
    }

    canvasCtx.restore();
});

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720,
});

camera.start();
