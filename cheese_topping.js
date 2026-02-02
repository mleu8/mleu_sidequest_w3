// Cheese decision screen
// Draws a speech bubble, compatibility bar, pizza preview (shows sauce if applied), and Add/Skip cheese buttons

if (typeof cheeseAdded === "undefined") cheeseAdded = false;

// Local helper: draw a colored button with hover shadow (same style as first_topping.js)
function drawColoredButtonCheese({ x, y, w, h, label }, baseColor, textColor) {
  rectMode(CENTER);
  const hover = isHover({ x, y, w, h });
  noStroke();
  const r = baseColor[0];
  const g = baseColor[1];
  const b = baseColor[2];
  if (hover) {
    fill(min(255, r + 18), min(255, g + 18), min(255, b + 18));
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(
      max(0, r - 50),
      max(0, g - 50),
      max(0, b - 50),
    );
  } else {
    fill(r, g, b);
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(220, 220, 220);
  }
  rect(x, y, w, h, 12);
  drawingContext.shadowBlur = 0;
  if (textColor && Array.isArray(textColor) && textColor.length >= 3) {
    fill(textColor[0], textColor[1], textColor[2]);
  } else {
    fill(50, 50, 60);
  }
  textSize(18);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

function drawCheeseTopping() {
  background(250, 245, 240);

  // Speech text
  const bubbleText = "I\'m not picky, but comfort food is kind of my thing.";

  // ---- Compatibility bar (top) ----
  const barW = width * 0.8;
  const barX = (width - barW) / 2;
  const barY = 40;
  const barH = 18;
  push();
  rectMode(CORNER);
  fill(220);
  noStroke();
  rect(barX, barY, barW, barH, 6);
  fill(100, 200, 120);
  const filled = constrain((compatibility / 100) * barW, 0, barW);
  rect(barX, barY, filled, barH, 6);
  fill(40);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(
    "Compatibility: " + Math.round(compatibility) + "%",
    barX + barW / 2,
    barY - 14,
  );
  pop();

  // ---- Speech bubble ----
  textSize(20);
  textAlign(CENTER, CENTER);
  const padding = 10;
  const txtW = textWidth(bubbleText);
  const txtH = textAscent() + textDescent();
  const bubbleW = Math.min(txtW + padding * 2, width * 0.85);
  const bubbleH = txtH + padding * 2;
  const bubbleY = 180;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rectMode(CENTER);
  rect(width / 2, bubbleY, bubbleW, bubbleH, 12);

  fill(40);
  noStroke();
  textSize(20);
  textAlign(CENTER, CENTER);
  text(bubbleText, width / 2, bubbleY);

  // ---- Pizza preview (show sauce if present, and cheese if added) ----
  const centerX = width / 2;
  const centerY = height / 2 - 40;
  const outerR = 220;
  const innerR = 170;

  noStroke();
  fill(210, 150, 80);
  ellipse(centerX, centerY, outerR);
  fill(245, 220, 160);
  ellipse(centerX, centerY, innerR);

  // sauce (from previous step)
  if (typeof sauceAdded !== "undefined" && sauceAdded) {
    fill(180, 30, 30, 220);
    ellipse(centerX, centerY, innerR - 10);
  }

  // cheese layer if added
  if (cheeseAdded) {
    fill(255, 230, 110, 200);
    ellipse(centerX, centerY, innerR - 20);
  }

  // ---- Buttons (same size) ----
  const btnW = 240;
  const btnH = 64;
  const addBtn = {
    x: width / 2,
    y: centerY + 220,
    w: btnW,
    h: btnH,
    label: "Add Cheese",
  };
  const skipBtn = {
    x: width / 2,
    y: centerY + 300,
    w: btnW,
    h: btnH,
    label: "Skip Cheese",
  };

  drawColoredButtonCheese(addBtn, [240, 200, 80]); // cheesy yellow
  drawColoredButtonCheese(skipBtn, [200, 200, 200]); // neutral gray

  const over = isHover(addBtn) || isHover(skipBtn);
  cursor(over ? HAND : ARROW);
}

function cheeseToppingMousePressed() {
  const centerY = height / 2 - 40;
  const btnW = 240;
  const btnH = 64;
  const addBtn = { x: width / 2, y: centerY + 220, w: btnW, h: btnH };
  const skipBtn = { x: width / 2, y: centerY + 300, w: btnW, h: btnH };
  if (isHover(addBtn)) {
    cheeseAdded = true;
    currentScreen = "onion_topping";
    if (typeof applyCompatibility === "function") {
      applyCompatibility(true);
    }
  } else if (isHover(skipBtn)) {
    cheeseAdded = false;
    currentScreen = "onion_topping";
    if (typeof applyCompatibility === "function") {
      applyCompatibility(false);
    }
  }
}

function cheeseToppingKeyPressed() {
  if (key === "a" || key === "A") {
    cheeseAdded = true;
    currentScreen = "onion_topping";
    if (typeof applyCompatibility === "function") {
      applyCompatibility(true);
    }
  }
  if (key === "s" || key === "S") {
    cheeseAdded = false;
    currentScreen = "onion_topping";
    if (typeof applyCompatibility === "function") {
      applyCompatibility(false);
    }
  }
}
