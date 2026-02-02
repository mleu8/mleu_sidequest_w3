// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines the start screen visuals and input handlers.

// Ensure a global compatibility variable exists and is initialized to 100%
if (typeof compatibility === "undefined") compatibility = 100;

// drawStart() is called from main.js only when currentScreen === "start"
function drawStart() {
  // Soft evening background
  background(245, 238, 230);

  // ---- Title ----
  fill(40, 40, 50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Pizza Night", width / 2, 100);

  // ---- Speech text box (sized to fit text with ~10px padding) ----
  const bubbleX = width / 2;
  const bubbleY = 180;
  const bubbleText =
    "“I’m really excited for tonight. I trust you to make the pizza.”";
  textSize(20);
  textAlign(CENTER, CENTER);
  // measure text dimensions
  const padding = 10;
  const txtW = textWidth(bubbleText);
  const txtH = textAscent() + textDescent();
  const bubbleW = txtW + padding * 2;
  const bubbleH = txtH + padding * 2;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rectMode(CENTER);
  rect(bubbleX, bubbleY, bubbleW, bubbleH, 12);

  // draw centered text
  fill(40, 40, 50);
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);
  text(bubbleText, bubbleX, bubbleY);

  // ---- Compatibility bar (centered, 80% width) ----
  const barW = width * 0.8;
  const barX = (width - barW) / 2;
  const barY = 40;
  const barH = 18;
  push();
  rectMode(CORNER);
  // background track
  fill(220);
  noStroke();
  rect(barX, barY, barW, barH, 6);
  // filled portion based on compatibility (0-100)
  fill(100, 200, 120);
  const filled = constrain((compatibility / 100) * barW, 0, barW);
  rect(barX, barY, filled, barH, 6);
  // label
  fill(40);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(
    "Compatibility: " + Math.round(compatibility) + "%",
    barX + barW / 2,
    barY - 14,
  );
  pop();

  // ---- Empty pizza base in center ----
  const centerX = width / 2;
  const centerY = height / 2 - 40;
  const outerR = 220;
  const innerR = 170;

  // crust
  noStroke();
  fill(210, 150, 80);
  ellipse(centerX, centerY, outerR);
  // inner dough
  fill(245, 220, 160);
  ellipse(centerX, centerY, innerR);

  // subtle topping guide (dashed circle)
  stroke(200, 120);
  strokeWeight(1);
  noFill();
  ellipse(centerX, centerY, innerR - 10);

  // ---- Buttons ----
  const startBtn = {
    x: width / 2,
    y: centerY + 220,
    w: 280,
    h: 64,
    label: "Start Making Pizza",
  };
  const instrBtn = {
    x: width / 2,
    y: centerY + 300,
    w: 200,
    h: 48,
    label: "Instructions",
  };

  drawButton(startBtn);
  drawButton(instrBtn);

  // Cursor feedback
  const over = isHover(startBtn) || isHover(instrBtn);
  cursor(over ? HAND : ARROW);
}

// Mouse input for start screen
function startMousePressed() {
  const startBtn = { x: width / 2, y: height / 2 - 40 + 220, w: 280, h: 64 };
  const instrBtn = { x: width / 2, y: height / 2 - 40 + 300, w: 200, h: 48 };

  if (isHover(startBtn)) {
    currentScreen = "first_topping";
  } else if (isHover(instrBtn)) {
    currentScreen = "instr";
  }
}

// Keyboard shortcuts for start screen
function startKeyPressed() {
  if (keyCode === ENTER) {
    currentScreen = "first_topping";
  }
  if (key === "i" || key === "I") {
    currentScreen = "instr";
  }
}

// Helper: drawButton (keeps same visual style as previous project)
function drawButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  const hover = isHover({ x, y, w, h });

  noStroke();

  if (hover) {
    fill(255, 215, 180);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(180, 140, 100);
  } else {
    fill(255, 245, 230);
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(220, 220, 220);
  }

  rect(x, y, w, h, 12);
  drawingContext.shadowBlur = 0;

  fill(50, 50, 60);
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
