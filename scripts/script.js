"use strict";
// get elements
// worm
const worm = document.getElementById("worm");
// food
const food = document.getElementById("food");
// play area
const playArea = document.getElementById("game-container");
// modal
const newGameModal = document.getElementById("new-game-modal");
// start game button
const newGameBtn = document.getElementById("new-game");

// when user presses play, remove modal
newGameBtn.addEventListener("click", () => {
  newGameModal.style.display = "none";
});

// user clicks arrow direction button, moves worm

// moving worm starts an automatic move forward in that direction

// clicking a different arrow key changes direction

// when worm eats food, triple length of worm (add 3 divs to the backside of original div)

// randomly place a new food div somewhere

// contain the worm and food in the game container
// get the game container area

// count the number of divs and display it as “score”

// when div 1 (head of worm) touches any part of tail
// display game over screen and play again button

function directionPress() {
  console.log(e.keyCode);
}

document.onkeydown = directionPress;

// when someone presses "start", remove modal

// when someone presses an arrow key, move the worm in that direction (translate x, y?)

// when worm touches food object, expand worm (multiply div and add it to "back" of original)
