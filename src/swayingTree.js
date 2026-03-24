/* swayingTree.js
2026, cdfisher
----------------
Draws a swaying fractal tree using p5.js
Adapted from the implementation of the tree in
The Nature of Code: Simulating Natural Systems with JavaScript by
Daniel Shiffman
*/
let angle = 45;
let offset;
let t = 0;

function branch(len) {
  line(0,0,0,-len);
  translate(0, -len);
  len *= 0.67;

  if (len > 2) {
    push();
    rotate(angle + (offset));
    branch(len);

    pop();

    push();
    rotate(-angle + (offset));
    branch(len);
    pop();
  }
}

function setup() {
  createCanvas(620, 400);
  angleMode(DEGREES);

}

function draw() {
  background(255);
  t += (deltaTime * 0.1);
  offset = 5 * sin(t);
  translate(width/2, height);
  stroke(0);
  strokeWeight(2);
  branch(100)
}