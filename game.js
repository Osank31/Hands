const gameCanvas = document.getElementById("gameCanvas");
gameCanvas.width = 640;
gameCanvas.height = 480;
const gameCanvasCtx = gameCanvas.getContext("2d");
const musquitoImage = document.getElementById("musquitoImage");
let clickCoordinates=null;

gameCanvas.addEventListener('click', function(event) {
    // Get the coordinates of the click relative to the canvas
    const rect = gameCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    clickCoordinates={x,y};
});

function flyMusquito(noOfMusquitoes) {
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
        speed=Math.round(Math.random()*9+1);
        let currentPostion = { x: startPoint.x - 200, y: startPoint.y - 200 };

        let musquito={
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
            
            if ((musquito.currentPostion.x - musquito.endPoint.x) <= 0 || (musquito.currentPostion.y - musquito.endPoint.y) <= 0) {
                musquito.currentPostion.x = musquito.currentPostion.x + moveX;
                musquito.currentPostion.y = musquito.currentPostion.y + moveY;
                gameCanvasCtx.drawImage(musquitoImage, musquito.currentPostion.x, musquito.currentPostion.y, 200, 200);
            }
            if (clickCoordinates) {
                if (
                    clickCoordinates.x >= musquito.currentPostion.x && clickCoordinates.x <= musquito.currentPostion.x + 200 &&
                    clickCoordinates.y >= musquito.currentPostion.y && clickCoordinates.y <= musquito.currentPostion.y + 200
                ) {
                    musquitoes.splice(index, 1);
                }
            }
        });
        

    }, 41.6667)
}




flyMusquito(5,clickCoordinates);