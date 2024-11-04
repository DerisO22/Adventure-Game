// Canvas Variables
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Load Assets

// Start Page Variables
let pageNum = 0;

// Choose Character Variables
let chooseCharacterContainer = document.querySelector('.chooseCharacterContainer')

let init = () => {
    // Block Everything Not Page 1 and then progressively unhide
    chooseCharacterContainer.style.display = 'none';
}

// Introduce Jon and possibly mutiple Characters
let txt="Hello, My Name is Jon"
let i = 0;
let speed = 90; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("typeText").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}



const circleRadius = 0.5; 
const circleSpeed = 2; 
// Array to hold circles
let circles = [];
// Function to create a new circle
function createCircle() {
  let r = Math.floor(Math.random() * 256); // Random value for red (0-255)
  let g = Math.floor(Math.random() * 256); // Random value for green (0-255)
  let b = Math.floor(Math.random() * 256); // Random value for blue (0-255)

  const x = Math.random() * canvas.width;
  const y = Math.random() * -circleRadius; // Start off-screen
  return {
    x,
    y,
    radius: circleRadius,
    color: `rgba(${r}, ${g}, ${b}, 1)`,
    speed: circleSpeed
  };
}
// Function to draw a circle
function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
}
// Function to update circle positions and draw
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Update circle positions and remove off-screen circles
  circles = circles.filter((circle, index) => {
    circle.y += circle.speed;
    // If circle is off-screen, return false to filter it out
    if (circle.y > canvas.height + circle.radius) {
      return false;
    } 
    // Otherwise, draw the circle and return true to keep it
    drawCircle(circle);
    return true;
  });
  requestAnimationFrame(update); // Request the next frame
}
// Spawn a new circle
setInterval(() => {
  circles.push(createCircle());
}, 100);
// Initialize animation
update();