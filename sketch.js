let touchStartTime = 0;
let held = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  stroke(255);
  fill(255);
  textSize(18);
  
  // 50px from edges
  // |
  let s = 'social class'
  let w = textWidth(s);
  text(s, (windowWidth/2)-(w/2), 30);
  line(windowWidth/2, 50, windowWidth/2, windowHeight-50);
  // arrow
  line(windowWidth/2, 50, windowWidth/2-15, 50+25);
  line(windowWidth/2, 50, windowWidth/2+15, 50+25);
  
  // -
  line(50, windowHeight/2, windowWidth-50, windowHeight/2);
  // arrow
  triangle(50, windowHeight/2, 50+15, windowHeight/2-15, 50+15, windowHeight/2+15);
  
  // \
  line(100, 100, windowWidth-100, windowHeight-100);
  // /
  line(windowWidth-100, 100, 100, windowHeight-100);
  
}

function draw() {
  if (held) {
    let duration = millis() - touchStartTime;

    if (duration >= 1000) {
      circle(mouseX, mouseY, 30);
      held = false; // prevent repeated triggering
    }
  }
}

function touchStarted() {
  touchStartTime = millis();
  held = true;
}

function touchEnded() {
  held = false; // cancel if released early
}
