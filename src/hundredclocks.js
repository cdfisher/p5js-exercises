var t = 0;
var d = 50;

var offsets = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    offsets[i] = [];
    for (let j = 0; j < 10; j++) {
            offsets[i][j] = random(0,11);
        }
    }
}

function draw() {
  background(220);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        var localX = i * d + 25;
        var localY = j * d + 25;
        circle(localX, localY, 40);
        translate(localX, localY);
        rotate(0.02 * t + offsets[i][j]);
        line(0, 0, 10, 10);
        rotate(-(0.02 * t + offsets[i][j]));
        translate(-localX, -localY);
    }
  }
  t += 1;
}