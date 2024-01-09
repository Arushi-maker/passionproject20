const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let objects = [];
let score = 0;
let timeLeft = 120;
let isGameRunning = false;
let lastTimestamp = null;
let lastMoveTimestamp = 0;

// Additional variable to track whether the questionnaire is completed
let isQuestionnaireCompleted = false;

function initializeGame() {
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
  lastTimestamp = null;
  lastMoveTimestamp = 0;

  drawQuestionnaire();
}

function drawQuestionnaire() {
  // Display the questionnaire (assuming you have an element with ID "questionnaire" for the questionnaire)
  const questionnaire = document.getElementById("questionnaire");
  questionnaire.style.display = "block";

  // Add event listener to the questionnaire submit button
  const submitButton = document.getElementById("submitQuestionnaire");
  submitButton.addEventListener("click", handleQuestionnaireSubmit);
}

function handleQuestionnaireSubmit() {
  const anxietyForm = document.getElementById("anxietyForm");
  const depressionForm = document.getElementById("depressionForm");

  // Hide the questionnaire
  const questionnaire = document.getElementById("questionnaire");
  questionnaire.style.display = "none";

  // Show the canvas
  canvas.style.display = "block";

  // Start the game
  isGameRunning = true;

  const anxietyAnswers = [...anxietyForm.elements].filter((el) => el.checked).map((el) => el.value);
  const depressionAnswers = [...depressionForm.elements].filter((el) => el.checked).map((el) => el.value);

  // Check if all questions are answered
  if (anxietyAnswers.length === 3 && depressionAnswers.length === 3) {
    // Process answers (you can add your logic here)

    // Remove the questionnaire and start the game
    document.body.removeChild(anxietyForm);
    document.body.removeChild(depressionForm);
    requestAnimationFrame(gameLoop);
  } else {
    alert("Please answer all questions before starting the game.");
  }
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

function drawStartScreen() {
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

canvas.addEventListener("click", handleClick);

// Start the game by initializing it
initializeGame();