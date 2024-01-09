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

  // Draw the questionnaire
  drawQuestionnaire();
}

// Remove the drawQuestionnaire function to avoid confusion
// ...

// Remove the handleClick event listener as it's currently not needed
// ...

// Add the following function to handle the game logic
function handleGameLogic() {
  if (isGameRunning) {
    updateTimer();
    draw();
    requestAnimationFrame(gameLoop);
  }
}

// Replace the last line to call handleGameLogic instead of gameLoop
// ...
// Start the game by initializing it
initializeGame();
handleGameLogic();

function handleQuestionnaireSubmit() {
  const anxietyForm = document.getElementById("anxietyForm1");
  const depressionForm = document.getElementById("depressionForm1");

  // Check if all questions are answered
  if (areAllQuestionsAnswered(anxietyForm) && areAllQuestionsAnswered(depressionForm)) {
    // Process answers (you can add your logic here)

    // Hide the questionnaire
    const questionnaire = document.getElementById("questionnaire");
    questionnaire.style.display = "none";

    // Show the canvas
    canvas.style.display = "block";

    // Start the game
    isGameRunning = true;

    // Remove the questionnaire and start the game
    document.body.removeChild(anxietyForm);
    document.body.removeChild(depressionForm);
    requestAnimationFrame(gameLoop);
  } else {
    alert("Please answer all questions before starting the game.");
  }
}

function areAllQuestionsAnswered(form) {
  const answeredQuestions = [...form.elements].filter((el) => el.checked);
  return answeredQuestions.length === 1; // Assuming there is only one question in each form
}