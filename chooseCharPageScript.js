// Canvas Variables
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Load Assets

// Start Page Variables
let pageNum = 0;

// Choose Character Variables
let chooseCharacterContainer = document.querySelector('.chooseCharacterContainer')
let welcomeButton = document.getElementById("introduceJonButton")
let continueButton = document.getElementById("continueButton")
document.getElementById("continueButton").style.display = "none"

let init = () => {
    // Block Everything Not Page 1 and then progressively unhide
    chooseCharacterContainer.style.display = 'none';
}

let textIndex = -1;
let typing = false
// Introduce Jon and possibly mutiple Characters
let txt = [
  "Hello, my name is Jon",
  "I'll be guiding you through ethical questions about college",
  "Let's Begin"
]
let i = 0;
let speed = 90; 
let jonImage = document.querySelector(".jonImage")
let shakeIntensity = 2;
let shakeDirection = 1;

function typeWriter() {
  if (i < txt[textIndex].length) {
    document.getElementById("typeText").innerHTML += txt[textIndex].charAt(i);
    jonImage.style.transform = `translateY(${shakeIntensity * shakeDirection}px)`;
    shakeDirection *= -1;
    i++;
    setTimeout(typeWriter, speed);
  } else {
    shakeDirection = 1;
    jonImage.style.transform = 'translateY(0)';
    typing = false
    i = 0;
  }
}

welcomeButton.addEventListener('click', () => {
  if(!typing){
    document.getElementById('typeText').innerHTML = "";
    textIndex++;
  }
  console.log("CLICKED")
  if(!typing && textIndex != 3){
    typing = true;
    typeWriter();
  }
  //Next Page
  if(textIndex == 3){
    document.getElementById("continueButton").style.display = "block"
  }
})

continueButton.addEventListener('click', () => {
  // 1. Grow animation:
  continueButton.style.transform = 'scale(1000)'; // Increase size
  
  // 2. Delay before redirecting:
  setTimeout(() => {
  // 3. Redirect to next page:
      window.location.href = "question.html"; // Replace with your next page
      pageNum == 1;
  }, 1000); // 500 milliseconds delay

  // 4. Reset button size:
  setTimeout(() => {
      continueButton.style.transform = 'scale(1)'; // Reset size
  }, 1000); // 1 second delay (after the redirect)
});




/**
 * Animation Background
 */
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