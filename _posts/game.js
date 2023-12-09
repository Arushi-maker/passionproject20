const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(50, 50, 50, 50);
}

function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();