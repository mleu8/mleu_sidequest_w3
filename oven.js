// oven.js
// Draws the oven screen and handles bake timing

let bakeStartMs = null;

function drawBakeScreen() {
  background(250, 245, 240);

  // Title text (matches your vibe)
  const bubbleText = "time to bake! moment of truth...";

  // Speech bubble
  const padding = 12;
  textSize(20);
  textAlign(CENTER, CENTER);
  const bubbleW = min(textWidth(bubbleText) + padding * 2, width * 0.85);
  const bubbleH = textAscent() + textDescent() + padding * 2;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rectMode(CENTER);
  rect(width / 2, 120, bubbleW, bubbleH, 12);

  noStroke();
  fill(40);
  text(bubbleText, width / 2, 120);

  // Compatibility readout (debug friendly)
  const compNow =
    typeof compatibilityTarget !== "undefined"
      ? compatibilityTarget
      : typeof compatibility !== "undefined"
        ? compatibility
        : 0;

  fill(40);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("Compatibility: " + Math.round(compNow) + "%", width / 2, 165);

  // Oven drawing
  const ox = width / 2;
  const oy = height / 2 + 60;

  rectMode(CENTER);
  noStroke();

  // oven body
  fill(210, 210, 215);
  rect(ox, oy, 380, 300, 18);

  // control panel
  fill(190, 190, 195);
  rect(ox, oy - 115, 350, 60, 14);

  // knobs
  fill(120, 120, 130);
  ellipse(ox - 120, oy - 115, 18, 18);
  ellipse(ox - 80, oy - 115, 18, 18);
  ellipse(ox - 40, oy - 115, 18, 18);

  // oven window + glow
  fill(70, 70, 80);
  rect(ox, oy + 20, 310, 180, 12);

  const glow = 90 + 60 * sin(frameCount * 0.08);
  fill(255, 150, 80, glow);
  rect(ox, oy + 20, 290, 160, 10);

  // Timer logic
  if (bakeStartMs === null) bakeStartMs = millis();
  const elapsed = millis() - bakeStartMs;

  // optional little status text
  fill(40);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("baking...", ox, oy + 175);

  if (elapsed >= 3000) {
    bakeStartMs = null;

    // final comparison
    const finalComp =
      typeof compatibilityTarget !== "undefined"
        ? compatibilityTarget
        : typeof compatibility !== "undefined"
          ? compatibility
          : 0;

    if (finalComp >= 80) {
      currentScreen = "win";
    } else if (finalComp >= 60) {
      currentScreen = "good";
    } else {
      currentScreen = "lose";
    }
  }
}

function bakeScreenMousePressed() {}
function bakeScreenKeyPressed() {}
