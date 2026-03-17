/* animatedTree.js
2026, cdfisher
----------------
Draws a fractal tree using p5.js
Adapted from the implementation of the tree in
The Nature of Code: Simulating Natural Systems with JavaScript by
Daniel Shiffman
*/
let angle;

function branch(len) {
  line(0,0,0,-len);
  translate(0, -len);
  len *= 0.67;

  if (len > 2) {
    push();
    rotate(angle);
    branch(len);

    pop();

    push();
    rotate(-angle);
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
  angle = map(mouseX, 0, width, 0, 90);
  translate(width/2, height);
  stroke(0);
  strokeWeight(2);
  branch(100)


}