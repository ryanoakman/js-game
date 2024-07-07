"use strict";

// Define elements
const gameBoard = document.getElementById("game-board");
const instructions = document.getElementById("instructions");
const startGameBtn = document.getElementById("start-game-btn");
const gameOverWall = document.getElementById("game-over-wall");
const gameOverSelf = document.getElementById("game-over-homer");
const playAgainBtnSelf = document.getElementById("play-again-btn-self");
const playAgainBtnWall = document.getElementById("play-again-btn-wall");
const dohAudio = document.getElementById("doh");
const donutAudio = document.getElementById("donut");

// Define game variables
const gridSizeX = 40;
const gridSizeY = 25;
let homer = [{x: 10, y: 10, direction: "right"}];
let food = randomFood();
let direction = "right";
let gameSpeed = 150;
let gameStarted = false;
let timerID;

// "Draw" game elements
function draw() {
  // reset board each time the game starts
  gameBoard.innerHTML = " ";
  drawHomer();
  drawFood();
}

// Draw Homer on the gameboard
function drawHomer() {
  homer.forEach((segment, index) => {
    // create a div for Homer

    let homerClass = "homer-right";

    // if index 0 // head logic - the first homer elem in the array is the head and leads the way, based on a set direction
    if (index === 0) {
      switch (segment.direction) {
        // switch direction
        case "up":
          homerClass = "homer-up";
          break;
        case "down":
          homerClass = "homer-down";
          break;
        case "left":
          homerClass = "homer-left";
          break;
        default:
          homerClass = "homer-right";
          break;
      }
    } else {
      // else , tail logic - follow the head
      switch (segment.direction) {
        // switch direction
        case "up":
          homerClass = "homer-up";
          break;
        case "down":
          homerClass = "homer-down";
          break;
        case "left":
          homerClass = "homer-left";
          break;
        default:
          homerClass = "homer-right";
          break;
      }
    }

    let homerElem = createGameElement("div", homerClass);
    // set Homer's position on the game board
    setPosition(homerElem, segment);
    // add Homer to the game board
    gameBoard.appendChild(homerElem);
  });
}

// create an element as a div - used for drawing homer and food
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Draw the donut (food) on the gameboard
function drawFood() {
  if (gameStarted) {
    const foodElem = createGameElement("div", "food");
    setPosition(foodElem, food);
    gameBoard.appendChild(foodElem);
  }
}

// Set random position of food
function randomFood() {
  const randomX = Math.floor(Math.random() * gridSizeX) + 1;
  const randomY = Math.floor(Math.random() * gridSizeY) + 1;
  return {x: randomX, y: randomY};
}

// Set the position of the element
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

//  Move Homer

function move() {
  const homerHead = {...homer[0]};
  switch (direction) {
    case "up":
      homerHead.y--;
      break;
    case "down":
      homerHead.y++;
      break;
    case "left":
      homerHead.x--;
      break;
    case "right":
      homerHead.x++;
      break;
  }

  homerHead.direction = direction;

  // check to see if homer hits a wall
  if (
    homerHead.x < 1 ||
    homerHead.x > gridSizeX ||
    homerHead.y < 1 ||
    homerHead.y > gridSizeY
  ) {
    gameOverWall.style.visibility = "visible";
    gameOver();
    return;
  }

  // check to see if homer hits himself
  for (let i = 1; i < homer.length; i++) {
    if (homerHead.x === homer[i].x && homerHead.y === homer[i].y) {
      gameOverSelf.style.visibility = "visible";
      gameOver();
      return;
    }
  }

  homer.unshift(homerHead);

  // When Homer eats a piece of food
  if (homerHead.x === food.x && homerHead.y === food.y) {
    donutAudio.play();
    donutAudio.currentTime = 0;
    // generate a new piece of food
    food = randomFood();
  } else {
    // keep removing each instance of Homer in the array, except for growth Homers
    homer.pop();
  }
}

// Use arrow keys to control Homer
function keyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowRight":
      direction = "right";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
  }
}

document.addEventListener("keydown", keyPress);

// Start the game

startGameBtn.addEventListener("click", startGame);
playAgainBtnSelf.addEventListener("click", startGame);
playAgainBtnWall.addEventListener("click", startGame);

function startGame() {
  gameStarted = true;
  // When start game is pressed, reset board...
  instructions.style.display = "none";
  gameOverSelf.style.visibility = "hidden";
  gameOverWall.style.visibility = "hidden";
  timerID = setInterval(() => {
    move();
    draw();
  }, gameSpeed);
}

function gameOver() {
  // stop game
  clearInterval(timerID);
  // reset board
  gameReset();
  gameStarted = false;
  dohAudio.play();
  dohAudio.currentTime = 0;
}

function gameReset() {
  // gameOver();
  homer = [{x: 10, y: 10, direction: "right"}];
  food = randomFood();
  direction = "right";
  gameSpeed = 150;

  draw();
}
