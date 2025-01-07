// Canvas Variables
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Load Assets

// Start Page Variables
let pageNum = 0;

// Choose Character Variables
let chooseCharacterContainer = document.querySelector('.chooseCharacterContainer')
let welcomeButton = document.querySelector(".jonImage")
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
  "I'll be guiding you through ethical scenarios relating to college",
  "Let's Begin!"
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
  if(!typing && textIndex != 3){
    typing = true;
    typeWriter();
  }
  //Next Page
  if(textIndex == 3){
    document.getElementById("continueButton").style.display = "block"
  }
})

// Scale animation to next page
continueButton.addEventListener('click', () => {
  continueButton.style.transform = 'scale(1000)'; 
  
  setTimeout(() => {
      window.location.href = "question.html"; 
      pageNum == 1;
  }, 1000); 
  
  setTimeout(() => {
      continueButton.style.transform = 'scale(1)'; 
  }, 1000); 
});


/**
 * Animation Background
 */
const circleRadius = .75; 
const circleSpeed = 2; 
let circles = [];

// Create Circles
function createCircle() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256); 
  let b = Math.floor(Math.random() * 256); 

  const x = Math.random() * canvas.width;
  const y = Math.random() * -circleRadius;
  return {
    x,
    y,
    radius: circleRadius,
    color: `rgba(${r}, ${g}, ${b}, 1)`,
    speed: circleSpeed
  };
}

// Draw Circle
function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
}

// Update and Draw Circle
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circles = circles.filter((circle, index) => {
    circle.y += circle.speed;

    // Delete circle if off the screen at bottom
    if (circle.y > canvas.height + circle.radius) {
      return false;
    } 

    drawCircle(circle);
    return true;
  });
  requestAnimationFrame(update); 
}

// Spawn a new circle
setInterval(() => {
  circles.push(createCircle());
}, 100);

update();