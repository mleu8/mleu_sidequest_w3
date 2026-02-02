// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawWin() → what the win screen looks like
// 2) input handlers → how the player returns to the start screen
//
// This file is intentionally very similar to lose.js.
// The goal is to show that win/lose screens are often
// simple “end states” with minimal logic.

// ------------------------------------------------------------
// Main draw function for win screen
// ------------------------------------------------------------
// drawWin() is called from main.js
// only when currentScreen === "win"
function drawWin() {
  background(200, 255, 200);
  fill(0);
  textAlign(CENTER, CENTER);

  // Title
  textSize(48);
  text("🍕 It's a match! ❤️", width / 2, height / 2 - 120);

  // Body text
  textSize(20);
  const bodyText =
    "The pizza came out perfect and so did the vibe.\nYou paid attention, made the right calls, and clearly understood the assignment.\nLooks like this date night is just getting started.";
  text(bodyText, width / 2, height / 2, width - 100, 300);

  // Instruction
  textSize(18);
  text("Press R to try another date.", width / 2, height - 80);
}

// ------------------------------------------------------------
// Mouse input for win screen
// ------------------------------------------------------------
// Any mouse click returns the player to the start screen
function winMousePressed() {
  compatibility = 100;
  compatibilityTarget = 100;
  currentScreen = "start";
}

// ------------------------------------------------------------
// Keyboard input for win screen
// ------------------------------------------------------------
// R is commonly used for “restart” in games
function winKeyPressed() {
  if (key === "r" || key === "R") {
    compatibility = 100;
    compatibilityTarget = 100;
    currentScreen = "start";
  }
}
