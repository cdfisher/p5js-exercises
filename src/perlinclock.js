var t = 0;
var d = 50;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  colorMode(HSL);
}

function draw() {
  background(220);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
        var localX = i * d + 25;
        var localY = j * d + 25;
        circle(localX, localY, 40);
        push();
        translate(localX, localY);
        let rotAngle = scaleVal(noise(i * 0.06,j*0.06,t*0.01));
        rotate(rotAngle);
        stroke(color(abs(rotAngle), 100, 50));
        strokeWeight(6); // just to help make the color more visible
        line(0, 0, 10, 10);
        pop();
    }
  }
  t += 1;
}

function scaleVal(n) {
  let pct = n / 1.0;
  return (pct * 720) - 360;
}