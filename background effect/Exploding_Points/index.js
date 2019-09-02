let props = { n: 100, scale: 30, speedx: 0.05, speedy: 0.05, explodetime: 100 };

let points = [];
let existing = [];

let fadetime = 0;

let pressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB, 1.0);
  background(0.05);
  stroke(1);
  strokeWeight(5);

  points.push(new ExpandingPoint(0, 0, 0, 0, 0));
  points[0].expand();

  // datGUI setup
  let gui = new dat.GUI();

  gui
    .add(props, "n", 50, 500)
    .step(1)
    .name("Number of points");

  gui.add(props, "scale", 10, 100).name("Point seperation");

  gui.add(props, "explodetime", 25, 500).name("Max explode time");

  gui.add(props, "speedx", 0, 0.2).name("x speed");

  gui.add(props, "speedy", 0, 0.2).name("y speed");
}

function draw() {
  translate(width / 2, height / 2);

  if (props.n - points.length < 3) background(0.05, 0.075);

  let completed = true;
  for (let i = 0; i < points.length; i++) {
    const p = points[i];

    p.step();
    p.draw();

    if (!p.completed) completed = false;
  }

  if (completed && !pressed) {
    points = [];
    existing = [];
    points.push(new ExpandingPoint(0, 0, 0, 0, 0));
    points[0].expand();
  }
}

function keyPressed() {
  pressed = !pressed;
}

function mousePressed() {
  background(0.05);
  points = [];
  existing = [];
  points.push(new ExpandingPoint(0, 0, 0, 0, 0));
  points[0].expand();
}

class ExpandingPoint {
  constructor(x, y, tx, ty, parenthue) {
    // Initial position
    this.ix = x;
    this.iy = y;

    // Current position
    this.x = x;
    this.y = y;

    // Target position
    this.tx = tx;
    this.ty = ty;

    this.expaned = false;

    this.time = 0;
    existing.push([this.tx, this.ty]);

    this.exploding = floor(random(props.explodetime));

    this.hue = parenthue + random(0.1);

    this.completed = false;
  }

  step() {
    this.x = lerp(this.x, this.tx, props.speedx);
    this.y = lerp(this.y, this.ty, props.speedy);

    if (this.time == this.exploding) {
      this.expand();
    }

    this.time++;
  }

  draw() {
    stroke(this.hue, 0.8, 1, constrain(1 - this.time / 50, 0, 1));
    strokeWeight(this.time / 10);
    point(this.x, this.y);
  }

  expand() {
    let current = [this.x, this.y];

    let targets = [
      [this.tx, this.ty + props.scale],
      [this.tx, this.ty - props.scale],
      [this.tx + props.scale, this.ty],
      [this.tx - props.scale, this.ty]
    ];

    for (const target of targets) {
      let repeat = false;
      for (const exist of existing) {
        if (exist[0] == target[0] && exist[1] == target[1]) repeat = true;
      }

      if (repeat) continue;

      if (points.length < props.n)
        points.push(new ExpandingPoint(...current, ...target, this.hue));
    }

    this.completed = true;
  }
}
