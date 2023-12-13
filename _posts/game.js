const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let circles = [];
let objects = [];
let score = 0;
let timeLeft = 120;
let isGameRunning = false;
let lastTimestamp = null;

function initGame() {
 
  circles = [];
  for (let i = 0; i < 30; i++) {
    circles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 20 + 5,
      speedX: Math.random() * 6 - 3,
      speedY: Math.random() * 6 - 3,
      color: getRandomColor(),
    });
  }

  objects = [
    { x: 100, y: 100, width: 50, height: 50, color: "#FF0000", isTarget: true, speed: 5 },
    { x: 200, y: 200, width: 50, height: 50, color: "#00FF00", isTarget: false, speed: 5 },
    { x: 300, y: 300, width: 50, height: 50, color: "#0000FF", isTarget: false, speed: 5 },
  ];

  score = 0;
  timeLeft = 120;
  isGameRunning = true;
  lastTimestamp = null;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const circle of circles) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fillStyle = circle.color;
    ctx.fill();

    circle.x += circle.speedX;
    circle.y += circle.speedY;

    if (circle.x - circle.radius < 0 || circle.x + circle.radius > canvas.width) {
      circle.speedX = -circle.speedX;
    }

    if (circle.y - circle.radius < 0 || circle.y + circle.radius > canvas.height) {
      circle.speedY = -circle.speedY;
    }
  }

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

    // Move squares
    object.x += object.speed;
    object.y += object.speed;

    // Bounce off the walls
    if (object.x < 0 || object.x + object.width > canvas.width) {
      object.speed = -object.speed;
    }

    if (object.y < 0 || object.y + object.height > canvas.height) {
      object.speed = -object.speed;
    }
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
  ctx.fillText(timerText, canvas.width - timerWidth - 10, 30); 
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
    object.speed = Math.random() * 6 - 3;
  }
}

function updateTimer(timestamp) {
  if (timeLeft > 0) {
    if (lastTimestamp !== null) {
      const elapsedMilliseconds = timestamp - lastTimestamp;
      const elapsedSeconds = elapsedMilliseconds / 1000;

      timeLeft -= elapsedSeconds * 10;
    }

    lastTimestamp = timestamp;
    requestAnimationFrame(updateTimer);
  } else {
    isGameRunning = false;
    draw(); 
  }
}

function gameLoop(timestamp) {
  if (isGameRunning) {
    updateTimer(timestamp);
    draw();
    requestAnimationFrame(gameLoop);
  }
}

canvas.addEventListener("click", handleClick);

setTimeout(() => {
  initGame();
  gameLoop();
}, 1000);