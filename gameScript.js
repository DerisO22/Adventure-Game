// Canvas Variables
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Load Assets

const smileImg = document.createElement('img');
smileImg.src = 'assets/smile.png';

const questionImg = document.createElement('img');
questionImg.src = 'assets/questionMark.png'; 

const exclamationImg = document.createElement('img');
exclamationImg.src = 'assets/exclamation.png'; 

const percentImg = document.createElement('img');
percentImg.src = 'assets/percent.png'; 

const sadFaceImg = document.createElement('img');
sadFaceImg.src = 'assets/sadFace.png'; 

const moneyImg = document.createElement('img');
moneyImg.src = 'assets/money.png'; 

// Start Page Variables
let pageNum = 0;

// Choose Character Variables
let chooseCharacterContainer = document.querySelector('.chooseCharacterContainer')

let init = () => {
    // Block Everything Not Page 1 and then progressively unhide
    chooseCharacterContainer.style.display = 'none';
}

//Possibly Add Classes

//Text Based Game
/**
 * Start Page
 */
if(pageNum == 0){
    const startButton = document.getElementById('startButton');

    // Start Game Transition
    startButton.addEventListener('click', () => {
        // 1. Grow animation:
        startButton.style.transform = 'scale(100)'; // Increase size
        
        // 2. Delay before redirecting:
        setTimeout(() => {
        // 3. Redirect to next page:
            window.location.href = "chooseCharPage.html"; // Replace with your next page
            pageNum == 1;
        }, 500); // 500 milliseconds delay

        // 4. Reset button size:
        setTimeout(() => {
            startButton.style.transform = 'scale(1)'; // Reset size
        }, 1000); // 1 second delay (after the redirect)
    });

    //Background Stuff
    {
    percentImg.style.position = 'absolute'; 
    percentImg.style.top = '0vh';
    percentImg.style.left = '90%';
    percentImg.style.zIndex = '1'; 
    percentImg.style.transform = "rotate(10deg) scale(0.6)"
    // 5. Add image to the body
    document.body.appendChild(percentImg);

    exclamationImg.style.position = 'absolute'; 
    exclamationImg.style.top = '85vh';
    exclamationImg.style.left = '15rem';
    exclamationImg.style.zIndex = '1'; 
    exclamationImg.style.transform = "rotate(10deg) scale(0.6)"
    // 5. Add image to the body
    document.body.appendChild(exclamationImg);

    questionImg.style.position = 'absolute'; 
    questionImg.style.top = '12rem';
    questionImg.style.left = '80%';
    questionImg.style.zIndex = '1'; 
    questionImg.style.transform = "rotate(10deg) scale(0.6)"
    // 5. Add image to the body
    document.body.appendChild(questionImg);

    smileImg.style.position = 'absolute';
    smileImg.style.top = '12vh';
    smileImg.style.left = '6rem';
    smileImg.style.zIndex = '1';
    smileImg.style.transform = "rotate(50deg) scale(0.6)"
    // 5. Add image to the body
    document.body.appendChild(smileImg);

    sadFaceImg.style.position = 'absolute';
    sadFaceImg.style.top = '80vh';
    sadFaceImg.style.left = '85%';
    sadFaceImg.style.zIndex = '1';
    sadFaceImg.style.transform = "rotate(-220deg) scale(0.6)"
    // 5. Add image to the body
    document.body.appendChild(sadFaceImg);

    moneyImg.style.position = 'absolute';
    moneyImg.style.top = '63vh';
    moneyImg.style.left = '4%';
    moneyImg.style.zIndex = '1';
    moneyImg.style.transform = "rotate(-20deg) scale(0.6)"
    // 5. Add image to the body
    document.body.appendChild(moneyImg);
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