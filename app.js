async function main() {   
    async function loadMediapipe() {
        const scripts = [
            "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
            "https://cdn.jsdelivr.net/npm/@mediapipe/holistic",
            "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils",
            "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils"
        ];

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };
        for (const src of scripts) {
            await loadScript(src);
        }
    }

    await loadMediapipe();
    const button = document.querySelector("button");
    button.addEventListener("click",(e)=>{
        e.preventDefault();
        button.style.display="none"
        const gameArea=document.querySelector(".gameArea");
        gameArea.style.display="block"
        const script=document.createElement("script");
        script.src="script.js";
        script.type="module";
        document.querySelector("body").appendChild(script);
    })
}

main();