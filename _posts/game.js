const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let objects = [];
let score = 0;
let timeLeft = 120;
let isGameRunning = false;
let lastTimestamp = null;
let lastMoveTimestamp = 0; // Added variable for object movement

function initGame() {
  // Initialize game objects
  objects = [
    { x: 100, y: 100, width: 50, height: 50, color: "#FF0000", isTarget: true },
    { x: 200, y: 200, width: 50, height: 50, color: "#00FF00", isTarget: false },
    { x: 300, y: 300, width: 50, height: 50, color: "#0000FF", isTarget: false },
  ];

  score = 0;
  timeLeft = 120;
  isGameRunning = true;
  lastTimestamp = null;
  lastMoveTimestamp = 0; // Initialize lastMoveTimestamp
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isGameRunning) {
    drawObjects();
    drawScore();
    drawTimer();
  } else {
    drawGameOver();
  }
}

function drawObjects() {
  for (const object of objects) {
    ctx.fillStyle = object.color;
    ctx.fillRect(object.x, object.y, object.width, object.height);
  }
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawTimer() {
  ctx.fillStyle = "#000";
  ctx.font = "40px Arial";
  const timerText = `Time: ${timeLeft.toFixed(1)}s`;
  const timerWidth = ctx.measureText(timerText).width;
  ctx.fillText(timerText, canvas.width - timerWidth - 10, 30); // Adjusted the position
}

function drawGameOver() {
  ctx.fillStyle = "#000";
  ctx.font = "40px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 20);
  ctx.font = "20px Arial";
  ctx.fillText(`Your score: ${score}`, canvas.width / 2 - 60, canvas.height / 2 + 20);
}

function handleClick(event) {
  if (!isGameRunning) return;

  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  for (const object of objects) {
    if (
      mouseX >= object.x &&
      mouseX <= object.x + object.width &&
      mouseY >= object.y &&
      mouseY <= object.y + object.height
    ) {
      if (object.isTarget) {
        score++;
      } else {
        score--;
      }

      resetObjects();
      break;
    }
  }
}

function resetObjects() {
  for (const object of objects) {
    object.x = Math.random() * (canvas.width - object.width);
    object.y = Math.random() * (canvas.height - object.height);
  }
}

function updateTimer(timestamp) {
  if (timeLeft > 0 && isGameRunning) {
    if (lastTimestamp !== null) {
      const elapsedMilliseconds = timestamp - lastTimestamp;
      const elapsedSeconds = elapsedMilliseconds / 1000;

      timeLeft -= elapsedSeconds;
    }

    lastTimestamp = timestamp;
    requestAnimationFrame(updateTimer);
  } else {
    isGameRunning = false;
    draw(); // Call draw function to display the game over screen
  }
}

function gameLoop(timestamp) {
  if (isGameRunning) {
    // Move objects every half second
    if (timestamp - lastMoveTimestamp > 500) {
      moveObjects();
      lastMoveTimestamp = timestamp;
    }

    updateTimer(timestamp);
    draw();
    requestAnimationFrame(gameLoop);
  }
  // Additional check to restart the game after game over
  else {
    initGame();
    isGameRunning = true;
    requestAnimationFrame(gameLoop);
  }
}

function moveObjects() {
  for (const object of objects) {
    object.x = Math.random() * (canvas.width - object.width);
    object.y = Math.random() * (canvas.height - object.height);
  }
}

canvas.addEventListener("click", handleClick);

// Start the game by initializing it and calling the game loop
initGame();
gameLoop();