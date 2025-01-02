const particleCount = 70;
const particlePropCount = 9;
const particlePropsLength = particleCount * particlePropCount;
const baseTTL = 100;
const rangeTTL = 500;
const baseSpeed = 0.1;
const rangeSpeed = 1;
const baseSize = 30;
const rangeSize = 10;
const baseHue = 10;
const rangeHue = 100;
const noiseSteps = 2;
const xOff = 0.0025;
const yOff = 0.005;
const zOff = 0.0005;
const backgroundColor = 'hsla(60,10%,1%,1)';

let images = [new Image(), new Image(), new Image(), new Image(), new Image()]
images[0].src = "assets/happi_sprite.png";
images[1].src = "assets/think_sprite.png";
images[2].src = "assets/sad_sprite.png";
images[3].src = "assets/questionMark.png";
images[4].src = "assets/exclamation.png";

let container;
let canvas;
let ctx;
let center;
let gradient;
let tick;
let particleProps;
let positions;
let velocities;
let lifeSpans;
let speeds;
let sizes;
let hues;

function setup() {
  createCanvas();
  resize();
  initParticles();
  draw();
}

function initParticles() {
  tick = 0;
  particleProps = new Float32Array(particlePropsLength);

  let i;

  for (i = 0; i < particlePropsLength; i += particlePropCount) {
    initParticle(i);
  }
}

function initParticle(i) {
  let theta, x, y, vx, vy, life, ttl, speed, size, hue;

  x = rand(canvas.a.width);
  y = rand(canvas.a.height);
  theta = angle(x, y, center[0], center[1]);
  vx = Math.cos(theta) * 6; // Use Math.cos() here
  vy = Math.sin(theta) * 6; // Use Math.sin() here
  life = 0;
  ttl = baseTTL + rand(rangeTTL);
  speed = baseSpeed + rand(rangeSpeed);
  size = baseSize + rand(rangeSize);
  hue = baseHue + rand(rangeHue);

  particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i);
}

function drawParticles() {
  let i;

  for (i = 0; i < particlePropsLength; i += particlePropCount) {
    updateParticle(i);
  }
}

function updateParticle(i) {
  let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i, i9=8+i;
  let x, y, theta, vx, vy, life, ttl, speed, x2, y2, size, hue;

  x = particleProps[i];
  y = particleProps[i2];
  theta = angle(x, y, center[0], center[1]) + 0.75 * Math.PI / 2; // Use Math.PI here
  vx = lerp(particleProps[i3], 2 * Math.cos(theta), 0.05); // Use Math.cos() here
  vy = lerp(particleProps[i4], 2 * Math.sin(theta), 0.05); // Use Math.sin() here
  life = particleProps[i5];
  ttl = particleProps[i6];
  speed = particleProps[i7];
  x2 = x + vx * speed;
  y2 = y + vy * speed;
  size = particleProps[i8];
  hue = particleProps[i9];

  drawParticle(x, y, theta, life, ttl, size, hue);

  life++;

  particleProps[i] = x2;
  particleProps[i2] = y2;
  particleProps[i3] = vx;
  particleProps[i4] = vy;
  particleProps[i5] = life;

  life > ttl && initParticle(i);
}

function drawParticle(x, y, theta, life, ttl, size, hue) {
  let xRel = x - (0.5 * size), yRel = y - (0.5 * size);

  ctx.a.save();
  ctx.a.lineCap = 'round';
  ctx.a.lineWidth = 1;
  ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
  ctx.a.beginPath();
  ctx.a.translate(xRel, yRel);
  ctx.a.rotate(theta);
  ctx.a.translate(-xRel, -yRel);
  ctx.a.drawImage(images[0], xRel, yRel, size, size);
  ctx.a.strokeRect(xRel, yRel, size, size);
  ctx.a.closePath();
  ctx.a.restore();
}

function createCanvas() {
  container = document.querySelector('.content--canvas');
  canvas = {
    a: document.createElement('canvas'),
    b: document.createElement('canvas')
  };
  canvas.b.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `;
  container.appendChild(canvas.b);
  ctx = {
    a: canvas.a.getContext('2d'),
    b: canvas.b.getContext('2d')
  };
  center = [];
}

function resize() {
  const { innerWidth, innerHeight } = window;

  canvas.a.width = innerWidth;
  canvas.a.height = innerHeight;

  ctx.a.drawImage(canvas.b, 0, 0);

  canvas.b.width = innerWidth;
  canvas.b.height = innerHeight;

  ctx.b.drawImage(canvas.a, 0, 0);

  center[0] = 0.5 * canvas.a.width;
  center[1] = 0.5 * canvas.a.height;
}

function renderGlow() {
  ctx.b.save();
  // ctx.b.filter = 'blur(8px) brightness(200%)';
  // ctx.b.globalCompositeOperation = 'lighter';
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();

  ctx.b.save();
  // ctx.b.filter = 'blur(4px) brightness(200%)';
  // ctx.b.globalCompositeOperation = 'lighter';
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}

function render() {
  ctx.b.save();
  ctx.b.globalCompositeOperation = 'lighter';
  ctx.b.drawImage(canvas.a, 0, 0);
  ctx.b.restore();
}

function draw() {
  tick++;

  ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

  ctx.b.fillStyle = backgroundColor;
  ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

  drawParticles();
  renderGlow();
  render();

  window.requestAnimationFrame(draw);
}

window.addEventListener('load', setup);
window.addEventListener('resize', resize);

function rand(max) {
  return Math.random() * max;
}

function angle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function fadeInOut(life, ttl) {
  let progress = life / ttl;

  if (progress < 0.5) {
    return progress * 2;
  } else {
    return 1 - (progress - 0.5) * 2;
  }
}