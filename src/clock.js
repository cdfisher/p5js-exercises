var i = 0;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  circle(200, 200, 300);
  push();
  translate(200, 200);
  rotate(0.01 * i);
  line(0, 0, 120, 0);
  pop();
  i += 1;
}