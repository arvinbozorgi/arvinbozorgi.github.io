let particles = [];
let connections = [];
let maxDistance = 150;
let repelRadius = 100;

let particleColor;

function setup() {
  createCanvas(windowWidth, windowHeight);

  particleColor = color(47, 98, 194); 

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {

  background(22, 33, 62); 

  for (let p of particles) {
    p.applyRepel();
    p.move();
    p.display();
  }

  connections = [];
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let p1 = particles[i];
      let p2 = particles[j];
      let d = dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);

      if (d < maxDistance) {

        let alpha = map(d, 0, maxDistance, 255, 0);
        stroke(red(particleColor), green(particleColor), blue(particleColor), alpha);
        strokeWeight(map(d, 0, maxDistance, 2, 0.2));
        line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
      }
    }
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
  }

  applyRepel() {
    let mouse = createVector(mouseX, mouseY);
    let d = p5.Vector.dist(this.pos, mouse);
    if (d < repelRadius) {
      let repelForce = p5.Vector.sub(this.pos, mouse);
      repelForce.setMag(map(d, 0, repelRadius, 2, 0));
      this.vel.add(repelForce);
    }
  }

  move() {
    let randomDrift = p5.Vector.random2D().mult(0.1);
    this.vel.add(randomDrift);

    this.vel.limit(3);
    this.pos.add(this.vel);
    this.vel.mult(0.95);

    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  display() {
    noStroke();
    fill(particleColor);
    circle(this.pos.x, this.pos.y, 5);
  }
}
