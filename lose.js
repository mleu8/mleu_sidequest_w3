// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawLose() → what the lose screen looks like
// 2) input handlers → how the player returns to the start screen

// ------------------------------
// Main draw function for lose screen
// ------------------------------
// drawLose() is called from main.js
// only when currentScreen === "lose"
function drawLose() {
  background(255, 210, 210);

  fill(0);
  textAlign(CENTER, CENTER);

  // Title
  textSize(48);
  text("🔴 YOU LOSE", width / 2, height / 2 - 120);

  // Body text
  textSize(20);
  const bodyText =
    "Yikes… not quite. 😬🍕\nThe pizza's a little questionable and the chemistry didn't quite rise.\nNot every topping choice lands, and that's okay.\nThere's always another chance to learn their taste.";
  text(bodyText, width / 2, height / 2, width - 100, 300);

  // Instruction
  textSize(18);
  text("Press R to try again.", width / 2, height - 80);
}

// ------------------------------
// Mouse input for lose screen
// ------------------------------
// Any mouse click returns the player to the start screen
// (no buttons needed for this simple end state)
function loseMousePressed() {
  compatibility = 100;
  compatibilityTarget = 100;
  currentScreen = "start";
}

// ------------------------------
// Keyboard input for lose screen
// ------------------------------
// R is commonly used for “restart” in games
function loseKeyPressed() {
  if (key === "r" || key === "R") {
    compatibility = 100;
    compatibilityTarget = 100;
    currentScreen = "start";
  }
}
