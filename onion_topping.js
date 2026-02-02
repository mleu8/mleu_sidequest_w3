// Onion decision screen
// Displays speech bubble, compatibility bar, pizza preview (shows sauce/cheese), and Add/Skip topping buttons

if (typeof onionAdded === "undefined") onionAdded = false;

// Local helper: draw colored button matching style used elsewhere
function drawColoredButtonOnion({ x, y, w, h, label }, baseColor, textColor) {
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

function drawOnionTopping() {
  background(250, 245, 240);

  const bubbleText = "I don't love overpowering flavors.";

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

  // ---- Pizza preview ----
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
  // cheese (from previous step)
  if (typeof cheeseAdded !== "undefined" && cheeseAdded) {
    fill(255, 230, 110, 200);
    ellipse(centerX, centerY, innerR - 20);
  }

  // onion slices (if added) - evenly spaced on two rings using polar coordinates
  if (onionAdded) {
    const pizzaRadius = innerR / 2;
    const outerRingR = pizzaRadius * 0.5;
    const innerRingR = pizzaRadius * 0.28;
    const outerCount = 6;
    const innerCount = 4;
    for (let i = 0; i < outerCount; i++) {
      const angle = (TWO_PI * i) / outerCount;
      const px = centerX + Math.cos(angle) * outerRingR;
      const py = centerY + Math.sin(angle) * outerRingR;
      push();
      translate(px, py);
      noFill();
      stroke(160, 90, 200);
      strokeWeight(3);
      ellipse(0, 0, 34, 20);
      stroke(235, 225, 245);
      strokeWeight(2);
      ellipse(0, 0, 26, 12);
      pop();
    }
    for (let i = 0; i < innerCount; i++) {
      const angle = (TWO_PI * i) / innerCount + (TWO_PI / innerCount) * 0.5;
      const px = centerX + Math.cos(angle) * innerRingR;
      const py = centerY + Math.sin(angle) * innerRingR;
      push();
      translate(px, py);
      noFill();
      stroke(160, 90, 200);
      strokeWeight(3);
      ellipse(0, 0, 30, 16);
      stroke(235, 225, 245);
      strokeWeight(2);
      ellipse(0, 0, 22, 10);
      pop();
    }
    noStroke();
  }

  // ---- Buttons ----
  const btnW = 240;
  const btnH = 64;
  const addBtn = {
    x: width / 2,
    y: centerY + 220,
    w: btnW,
    h: btnH,
    label: "Add onion",
  };
  const skipBtn = {
    x: width / 2,
    y: centerY + 300,
    w: btnW,
    h: btnH,
    label: "Skip topping",
  };

  drawColoredButtonOnion(addBtn, [200, 180, 220]); // light purple
  drawColoredButtonOnion(skipBtn, [200, 200, 200]); // neutral gray

  const over = isHover(addBtn) || isHover(skipBtn);
  cursor(over ? HAND : ARROW);
}

function onionToppingMousePressed() {
  const centerY = height / 2 - 40;
  const btnW = 240;
  const btnH = 64;
  const addBtn = { x: width / 2, y: centerY + 220, w: btnW, h: btnH };
  const skipBtn = { x: width / 2, y: centerY + 300, w: btnW, h: btnH };
  if (isHover(addBtn)) {
    onionAdded = true;
    applyCompatibility(false);
    currentScreen = "pepperoni_topping";
  } else if (isHover(skipBtn)) {
    onionAdded = false;
    applyCompatibility(true);
    currentScreen = "pepperoni_topping";
  }
}

function onionToppingKeyPressed() {
  if (key === "a" || key === "A") {
    onionAdded = true;
    applyCompatibility(false);
    currentScreen = "pepperoni_topping";
  }
  if (key === "s" || key === "S") {
    onionAdded = false;
    applyCompatibility(true);
    currentScreen = "pepperoni_topping";
  }
}
