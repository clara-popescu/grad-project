// what shapes your sense of identity the most?
// press and hold to place dots on the respective arrow(s)

let touchStartTime = 0;
let held = false;
let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  stroke(255);
  fill(255);
  textSize(18);
}

function draw() {
  background(0);
  
  // vertical
  drawArrowLine(windowWidth/2, 100, windowWidth/2, windowHeight - 100, "religious beliefs", "ability & disability", -30);

  // horizontal
  drawArrowLine(100, windowHeight/2, windowWidth - 100, windowHeight/2, "social\nnorms", "personal\ndesires");
  
  // top left to btm right
  drawArrowLine(150, 150, windowWidth - 150, windowHeight - 150, "authenticity", "appearances");
  
  // top right to btm left
  drawArrowLine(windowWidth - 150, 150, 150, windowHeight - 150, "relationships", "social class");
  
  if (held) {
    let duration = millis() - touchStartTime;

    if (duration >= 1000) {
      circles.push({
        x: mouseX,
        y: mouseY,
        placedAt: millis(),
        faded: false
      });

      // send signal
      fetch("http://192.168.1.109:3000/trigger", {
          method: "POST",
          body: JSON.stringify({ x: mouseX, y: mouseY }),
          headers: { "Content-Type": "application/json" }
        })
        .then(r => r.text())
        .then(t => console.log("RESPONSE:", t))
        .catch(e => console.log("ERROR:", e));

      held = false; // prevent repeated triggering
    }
  }
  
  for (let c of circles) {
    let elapsed = millis() - c.placedAt;

    let fadeStart = 5000; // 5 seconds
    let fadeDuration = 2000; // how long fade takes

    let t = 0;

    if (elapsed > fadeStart) {
      t = constrain((elapsed - fadeStart) / fadeDuration, 0, 1);
    }

    // interpolate from white -> grey
    let col = lerpColor(color(255), color(50, 50, 50), t);

    push();
    fill(col);
    noStroke();
    circle(c.x, c.y, 30);
    pop();
  }
}

function touchStarted() {
  touchStartTime = millis();
  held = true;
}

function touchEnded() {
  held = false; // cancel if released early
}

function drawArrowHead(x, y, angle, size) {
  let offset = PI / 4;

  line(x, y, x - size * cos(angle - offset), y - size * sin(angle - offset));

  line(x, y, x - size * cos(angle + offset), y - size * sin(angle + offset));
}

function drawArrowLine(x1, y1, x2, y2, labelTop = "", labelBottom = "", offsetAlong = -50, offsetPerp = 0, arrowSize = 15) {
  // main line
  line(x1, y1, x2, y2);

  // angle of the line
  let angle = atan2(y2 - y1, x2 - x1);

  // arrowheads
  drawArrowHead(x2, y2, angle, arrowSize);
  drawArrowHead(x1, y1, angle + PI, arrowSize);
  
  // direction vector (along the line)
  let dx = cos(angle);
  let dy = sin(angle);

  // perpendicular vector
  let px = cos(angle + HALF_PI);
  let py = sin(angle + HALF_PI);
  
  if (labelTop !== "") {
    push();

    // move near arrow tip
    translate(
      x2 - dx * offsetAlong,
      y2 - dy * offsetAlong
    );
    
    textAlign(CENTER, CENTER);

    // offset away from line
    text(labelTop, 0, -offsetPerp);

    pop();
  }


  if (labelBottom !== "") {
    push();

    translate(
      x1 + dx * offsetAlong,
      y1 + dy * offsetAlong
    );

    textAlign(CENTER, CENTER);

    text(labelBottom, 0, offsetPerp);

    pop();
  }
     
}