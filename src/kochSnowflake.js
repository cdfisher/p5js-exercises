/* kochSnowflake.js
2026, cdfisher
----------------
Draws the Koch Snowflake using p5.js
Adapted from the implementation of the Koch curve in
The Nature of Code: Simulating Natural Systems with JavaScript by
Daniel Shiffman
*/

let MAX_ITERS = 5;
let segments = [];
var startPoint, endPoint;
var v1, v2;

class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class KochLine {
    constructor(a,b) {
        this.startPoint = a.copy();
        this.endPoint = b.copy();
    }

    show() {
        stroke(0);
        line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
    }

    kochPoints() {
        let a = this.startPoint.copy();
        let v = p5.Vector.sub(this.endPoint, this.startPoint);
        v.div(3);
        let b = p5.Vector.add(a, v);
        let d = p5.Vector.add(b, v);
        v.rotate(-PI / 3);
        let c = p5.Vector.add(b, v);
        let e = this.endPoint.copy();
        return [a, b, c, d, e];
    }
}

function generate() {
    let next = [];
    for (let segment of segments) {
    let [a, b, c, d, e] = segment.kochPoints();
        next.push(new KochLine(a, b));
        next.push(new KochLine(b, c));
        next.push(new KochLine(c, d));
        next.push(new KochLine(d, e));
    }
    segments = next;
}

function setup() {
  createCanvas(900, 1000);
  background(255);
  let vertices = [new Vertex(400, 50), new Vertex(50, 750), new Vertex(750, 750)]

  for (let i = 0; i < 3; i++) {
    segments = [];
    v1 = vertices[(i+1) % 3];
    v2 = vertices[i];

    startPoint = createVector(v1.x, v1.y);
    endPoint = createVector(v2.x, v2.y);

    segments.push(new KochLine(startPoint, endPoint));

    for (let j = 0; j < MAX_ITERS; j++) {
        generate();
    }
    for (let segment of segments) {
        segment.show();
    }
  }
}
