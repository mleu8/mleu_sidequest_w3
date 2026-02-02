// Clean sauce decision screen implementation
// Defines drawFirstTopping(), firstToppingMousePressed(), firstToppingKeyPressed()

if (typeof sauceAdded === "undefined") sauceAdded = false;

// Local helper: draw a colored button with hover shadow (keeps start screen style)
function drawColoredButton({ x, y, w, h, label }, baseColor, textColor) {
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

function drawFirstTopping() {
  background(250, 245, 240);
  // Use same layout as title screen: top compatibility bar, centered speech bubble, pizza, stacked buttons
  const bubbleText =
    "I love food with strong flavor, but I don't like things that feel unfinished.";

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

  // ---- Speech bubble (sized to fit text with padding) ----
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

  // ---- Pizza (centered) ----
  const centerX = width / 2;
  const centerY = height / 2 - 40;
  const outerR = 220;
  const innerR = 170;
  noStroke();
  fill(210, 150, 80);
  ellipse(centerX, centerY, outerR);
  fill(245, 220, 160);
  ellipse(centerX, centerY, innerR);
  if (sauceAdded) {
    fill(180, 30, 30, 220);
    ellipse(centerX, centerY, innerR - 10);
  }

  // ---- Buttons (same size, different colors) ----
  const btnW = 240;
  const btnH = 64;
  const addBtn = {
    x: width / 2,
    y: centerY + 220,
    w: btnW,
    h: btnH,
    label: "Add Sauce",
  };
  const skipBtn = {
    x: width / 2,
    y: centerY + 300,
    w: btnW,
    h: btnH,
    label: "Skip Sauce",
  };
  // Make Add Sauce label match page background color (250,245,240)
  drawColoredButton(addBtn, [200, 80, 80], [250, 245, 240]); // warm red button, text same as background
  drawColoredButton(skipBtn, [200, 200, 200]); // neutral gray for Skip Sauce

  const over = isHover(addBtn) || isHover(skipBtn);
  cursor(over ? HAND : ARROW);
}

function firstToppingMousePressed() {
  const centerY = height / 2 - 40;
  const btnW = 240;
  const btnH = 64;
  const addBtn = { x: width / 2, y: centerY + 220, w: btnW, h: btnH };
  const skipBtn = { x: width / 2, y: centerY + 300, w: btnW, h: btnH };
  if (isHover(addBtn)) {
    sauceAdded = true;
    applyCompatibility(true);
    currentScreen = "cheese_topping";
  } else if (isHover(skipBtn)) {
    sauceAdded = false;
    applyCompatibility(false);
    currentScreen = "cheese_topping";
  }
}

function firstToppingKeyPressed() {
  if (key === "a" || key === "A") {
    sauceAdded = true;
    applyCompatibility(true);
    currentScreen = "cheese_topping";
  }
  if (key === "s" || key === "S") {
    sauceAdded = false;
    applyCompatibility(false);
    currentScreen = "cheese_topping";
  }
}
