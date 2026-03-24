// Adapted from https://editor.p5js.org/mfranz/sketches/RZLbzF0bB

// ml5.js: Object Detection with COCO-SSD (Webcam)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

let video;
let detector;
let detections = [];

let MAX_ITERS = 5;
let segments = [];
let vertices = [];
var startPoint, endPoint;
var v1, v2;

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

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

function drawSnowflake(x, y, w, h) {
  vertices = [new Vertex(0.4 * w, 0.05 *h), new Vertex(0.05 * w, 0.75 * h), new Vertex(0.75 * w, 0.75*h)]

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

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  detector.detect(video, gotDetections);
}

function draw() {
  background(255);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    if(object.label == "person"){
      fill(100,100,0);
      drawSnowflake(object.x + object.width/2, object.y + object.height/2, object.width, object.height)
    }
  }
}