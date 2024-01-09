const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let objects = [];
let score = 0;
let timeLeft = 120;
let isGameRunning = false;
let lastTimestamp = null;
let lastMoveTimestamp = 0;

function initializeGame() {
  // Initialize game objects
  objects = [
    { x: 100, y: 100, width: 50, height: 50, color: "#FF0000", isTarget: true },
    // Add more objects as needed
  ];

  // Initialize other variables
  score = 0;
  timeLeft = 120;
  isGameRunning = false;
  lastTimestamp = null;
  lastMoveTimestamp = 0;

  // Show the questionnaire initially
  showQuestionnaire();

  // Add event listener to the questionnaire submit button
  const submitButton = document.getElementById("submitQuestionnaire");
  submitButton.addEventListener("click", handleQuestionnaireSubmit);

  // Add event listener to handle canvas clicks
  canvas.addEventListener("click", handleClick);
}

function showQuestionnaire() {
  const questionnaire = document.getElementById("questionnaire");
  questionnaire.style.display = "block";
}

function handleQuestionnaireSubmit() {
  const questionnaire = document.getElementById("questionnaire");
  const gameContent = document.getElementById("gameContent");

  // Hide the questionnaire
  questionnaire.style.display = "none";

  // Show the canvas
  gameContent.style.display = "block";

  // Start the game
  isGameRunning = true;
  requestAnimationFrame(gameLoop);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (isGameRunning) {
    drawObjects();
    drawScore();
    drawTimer();
  } else {
    drawStartScreen();
  }
}

function drawObjects() {
  for (const object of objects) {
    ctx.fillStyle = object.color;
    ctx.fillRect(object.x, object.y, object.width, object.height);
  }
}

function drawScore() {
  // Omitted the score drawing as per your request
}

function drawTimer() {
  ctx.fillStyle = "#fff"; // Set text color to white
  ctx.font = "40px Arial";
  const timerText = `Time: ${timeLeft.toFixed(1)}s`;
  const timerWidth = ctx.measureText(timerText).width;
  ctx.fillText(timerText, canvas.width - timerWidth - 10, 30);
}

function drawStartScreen() {
  ctx.fillStyle = "#000";
  ctx.font = "40px Arial";
  ctx.fillText("Click anywhere to begin", canvas.width / 2 - 250, canvas.height / 2 - 20);
}

function handleClick(event) {
  if (!isGameRunning) {
    // If the game is not running, start it on a click
    isGameRunning = true;
    requestAnimationFrame(gameLoop);
  } else {
    // Handle clicks during the game (if needed)
  }
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
  if (isGameRunning) {
    updateTimer();
    draw();
    requestAnimationFrame(gameLoop);
  }
}

// Initialize the game when the window has fully loaded
window.addEventListener('load', initializeGame);