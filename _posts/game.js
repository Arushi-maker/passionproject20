const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

var myGamePiece;
var myUpBtn;
var myDownBtn;
var myLeftBtn;
var myRightBtn;

let objects = [];
let score = 0;
let timeLeft = 120;
let isGameRunning = false;
let lastTimestamp = null;
let lastMoveTimestamp = 0;

function startCombinedGame() {
  // Call both start functions
  startGame();
  startGame2();
}

if ("submitQuestionnaire") true; {
  startGame();
}

canvas.addEventListener("click", handleClick);

