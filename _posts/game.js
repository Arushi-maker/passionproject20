const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let objects = [];
let score = 0;
let timeLeft = 120;
let isGameRunning = false;
let isGamePaused = false;
let lastTimestamp = null;
let lastMoveTimestamp = 0;

function initGame() {
  // Initialize game objects
  objects = [
    { x: 100, y: 100, width: 50, height: 50, color: "#FF0000", isTarget: true },
    { x: 200, y: 200, width: 50, height: 50, color: "#00FF00", isTarget: false },
    { x: 300, y: 300, width: 50, height: 50, color: "#0000FF", isTarget: false },
    { x: 400, y: 400, width: 50, height: 50, color: "#FFA500", isTarget: true }, // Orange square
    { x: 500, y: 500, width: 50, height: 50, color: "#FFFF00", isTarget: false }, // Yellow square
    { x: 600, y: 200, width: 50, height: 50, color: "#800080", isTarget: false }, // Purple square
  ];

  score = 0;
  timeLeft = 120;
  isGameRunning = false;
  isGamePaused = false;
  lastTimestamp = null;
  lastMoveTimestamp = 0;

  drawStartScreen();
}

function drawStartScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#000";
  ctx.font = "40px Arial";
  ctx.fillText("Click 'Start Game' to begin", canvas.width / 2 - 250, canvas.height / 2 - 20);

  const startButtonWidth = 200;
  const startButtonHeight = 50;
  const startButtonX = canvas.width / 2 - startButtonWidth / 2;
  const startButtonY = canvas.height / 2 + 20;

  ctx.fillStyle = "#00FF00";
  ctx.fillRect(startButtonX, startButtonY, startButtonWidth, startButtonHeight);

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Start Game", startButtonX + 50, startButtonY + 30);

  canvas.addEventListener("click", handleStartClick);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isGameRunning) {
    drawObjects();
    drawScore();
    drawTimer();
    drawPauseButton(); // Added to display the pause button during the game
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
  ctx.fillStyle = "#fff"; // Set text color to white
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawTimer() {
  ctx.fillStyle = "#fff"; // Set text color to white
  ctx.font = "40px Arial";
  const timerText = `Time: ${timeLeft.toFixed(1)}s`;
  const timerWidth = ctx.measureText(timerText).width;
  ctx.fillText(timerText, canvas.width - timerWidth - 10, 30);
}

function drawPauseButton() {
  const pauseButtonWidth = 100;
  const pauseButtonHeight = 30;
  const pauseButtonX = canvas.width - pauseButtonWidth - 10;
  const pauseButtonY = 10;

  ctx.fillStyle = "#FFD700"; // Set pause button color to gold
  ctx.fillRect(pauseButtonX, pauseButtonY, pauseButtonWidth, pauseButtonHeight);

  ctx.fillStyle = "#000";
  ctx.font = "16px Arial";
  ctx.fillText("Pause Game", pauseButtonX + 10, pauseButtonY + 20);
}

function drawGameOver() {
  ctx.fillStyle = "#fff"; // Set text color to white
  ctx.font = "40px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 20);
  ctx.font = "20px Arial";
  ctx.fillText(`Your score: ${score}`, canvas.width / 2 - 60, canvas.height / 2 + 20);

  const restartButtonWidth = 200;
  const restartButtonHeight = 50;
  const restartButtonX = canvas.width / 2 - restartButtonWidth / 2;
  const restartButtonY = canvas.height / 2 + 80;

  ctx.fillStyle = "#00FF00";
  ctx.fillRect(restartButtonX, restartButtonY, restartButtonWidth, restartButtonHeight);

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Restart Game", restartButtonX + 30, restartButtonY + 30);

  canvas.addEventListener("click", handleRestartClick);
}

function handleStartClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const startButtonWidth = 200;
  const startButtonHeight = 50;
  const startButtonX = canvas.width / 2 - startButtonWidth / 2;
  const startButtonY = canvas.height / 2 + 20;

  if (
    mouseX >= startButtonX &&
    mouseX <= startButtonX + startButtonWidth &&
    mouseY >= startButtonY &&
    mouseY <= startButtonY + startButtonHeight
  ) {
    isGameRunning = true;
    canvas.removeEventListener("click", handleStartClick);
    requestAnimationFrame(gameLoop);
  }
}

function drawPauseScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Add a semi-transparent black overlay
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff"; // Set text color to white
  ctx.font = "40px Arial";
  ctx.fillText("Game Paused", canvas.width / 2 - 120, canvas.height / 2 - 20);

  const resumeButtonWidth = 200;
  const resumeButtonHeight = 50;
  const resumeButtonX = canvas.width / 2 - resumeButtonWidth / 2;
  const resumeButtonY = canvas.height / 2 + 20;

  ctx.fillStyle = "#00FF00";
  ctx.fillRect(resumeButtonX, resumeButtonY, resumeButtonWidth, resumeButtonHeight);

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Resume Game", resumeButtonX + 30, resumeButtonY + 30);

  canvas.addEventListener("click", handleResumeClick);
}

function drawPauseButton() {
  const pauseButtonWidth = 100;
  const pauseButtonHeight = 30;
  const pauseButtonX = canvas.width - pauseButtonWidth - 10;
  const pauseButtonY = 10;

  ctx.fillStyle = "#FFD700"; // Set pause button color to gold
  ctx.fillRect(pauseButtonX, pauseButtonY, pauseButtonWidth, pauseButtonHeight);

  ctx.fillStyle = "#000";
  ctx.font = "16px Arial";
  ctx.fillText("Pause Game", pauseButtonX + 10, pauseButtonY + 20);

  canvas.addEventListener("click", handlePauseClick);
}

function handlePauseClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const pauseButtonWidth = 100;
  const pauseButtonHeight = 30;
  const pauseButtonX = canvas.width - pauseButtonWidth - 10;
  const pauseButtonY = 10;

  if (
    mouseX >= pauseButtonX &&
    mouseX <= pauseButtonX + pauseButtonWidth &&
    mouseY >= pauseButtonY &&
    mouseY <= pauseButtonY + pauseButtonHeight
  ) {
    isGamePaused = true;
    canvas.removeEventListener("click", handlePauseClick);
    drawPauseScreen();
  }
}

function handleResumeClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  const resumeButtonWidth = 200;
  const resumeButtonHeight = 50;
  const resumeButtonX = canvas.width / 2 - resumeButtonWidth / 2;
  const resumeButtonY = canvas.height / 2 + 20;

  if (
    mouseX >= resumeButtonX &&
    mouseX <= resumeButtonX + resumeButtonWidth &&
    mouseY >= resumeButtonY &&
    mouseY <= resumeButtonY + resumeButtonHeight
  ) {
    isGamePaused = false;
    canvas.removeEventListener("click", handleResumeClick);
    requestAnimationFrame(gameLoop);
  }
}

function drawPauseScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Add a semi-transparent black overlay
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fff"; // Set text color to white
  ctx.font = "40px Arial";
  ctx.fillText("Game Paused", canvas.width / 2 - 120, canvas.height / 2 - 20);

  const resumeButtonWidth = 200;
  const resumeButtonHeight = 50;
  const resumeButtonX = canvas.width / 2 - resumeButtonWidth / 2;
  const resumeButtonY = canvas.height / 2 + 20;

  ctx.fillStyle = "#00FF00";
  ctx.fillRect(resumeButtonX, resumeButtonY, resumeButtonWidth, resumeButtonHeight);

  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Resume Game", resumeButtonX + 30, resumeButtonY + 30);

  canvas.addEventListener("click", handleResumeClick);
}

function updateTimer() {
  const currentTimestamp = performance.now();
  const elapsedMilliseconds = currentTimestamp - lastTimestamp;
  const elapsedSeconds = elapsedMilliseconds / 1000;

  timeLeft -= elapsedSeconds;
  lastTimestamp = currentTimestamp;

  if (timeLeft <= 0) {
    isGameRunning = false;
    draw();
  }
}

function gameLoop(timestamp) {
  if (!isGamePaused) {
    updateTimer();
    draw();
    requestAnimationFrame(gameLoop);
  }
}

canvas.addEventListener("click", handleClick);

// Start the game by initializing it
initGame();
