// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawGood() → what the mid-tier outcome screen looks like
// 2) input handlers → how the player returns to the start screen

// ------------------------------
// Main draw function for good screen
// ------------------------------
// drawGood() is called from main.js
// only when currentScreen === "good"
function drawGood() {
  background(235, 245, 255);

  fill(0);
  textAlign(CENTER, CENTER);

  // Title
  textSize(36);
  text("60–79% — Good, Not Perfect", width / 2, height / 2 - 140);

  // Body text
  textSize(20);
  const bodyText =
    "Good work! 🙂🍕\nThere were a few bumps along the way, but what relationship doesn’t have them?\nYou didn’t get everything right, but the effort shows and that counts for a lot.\nHonestly… you’d probably go on a second date.";
  text(bodyText, width / 2, height / 2 - 10, width - 100, 320);

  // Instruction
  textSize(18);
  text("Press R to try another date.", width / 2, height - 80);
}

// ------------------------------
// Mouse input for good screen
// ------------------------------
function goodMousePressed() {
  compatibility = 100;
  compatibilityTarget = 100;
  currentScreen = "start";
}

// ------------------------------
// Keyboard input for good screen
// ------------------------------
function goodKeyPressed() {
  if (key === "r" || key === "R") {
    compatibility = 100;
    compatibilityTarget = 100;
    currentScreen = "start";
  }
}
