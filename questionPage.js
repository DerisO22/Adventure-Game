const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let topicText = document.querySelector('.topText');
let jonContinueButton = document.querySelector(".jonImage");
let button1 = document.getElementById("choice1");
let button2 = document.getElementById("choice2");
let button3 = document.getElementById("choice3");

let scenarioTopic = [
  "Witnessing a Friend Stealing",
  "Roommate Issues",
  "Cheating Temptation",
  "Group Project Dilemma",
  "Plagiarism Temptation",
  "Covering for a Friend’s Mistake",
  "Seeing Someone Being Bullied",
  "Conflicting Family Values",
  "Financial Pressure",
  "Unethical Internship"
];

let scenarios = [
    "Your friend shoplifts from a campus store, and the clerk mistakenly accuses another student. Your friend begs you not to say anything.",
    "Your roommate has a habit of 'borrowing' your things without asking, but you don't want to start drama.",
    "You’re struggling in a required class, and a friend offers to share the answers to the upcoming exam.",
    "In a group project, one team member hasn’t done any work but asks to be credited anyway so they won’t fail.",
    "You’re running out of time on an important essay, and you find a perfect online paper that’s tempting to 'borrow' from.",
    "A friend misses an assignment deadline because they were out partying and asks you to lie for them by saying they were sick.",
    "You see another student being bullied by a group on campus. No one else seems to be doing anything",
    "Your family expects you to major in a specific field, but you’re passionate about something else.",
    "Your job offers overtime, but it conflicts with an important study group session. Missing the session may hurt your grade, but you need the money.",
    "You’re offered an internship that could boost your career but requires promoting products you don’t fully believe in."
];

let choice1s = [
  "Defend the accused student by reporting what you saw",
  "Confront them directly and ask them to stop",
  "Accept the answers to pass the exam",
  "Let them have the credit to keep peace in the group",
  "Use parts of the paper to save time but risk getting caught",
  "Tell them they need to be honest with the professor",
  "Step in to defend the student, even if it risks conflict",
  "Follow your passion, risking family disappointment",
  "Take the extra hours and skip the study group",
  "Take the internship to build your resume and income"
];

let choice2s = [
  "Stay silent, hoping things will work out",
  "Ignore it to avoid tension, even if it bothers you",
  "Politely decline and try to study harder on your own",
  "Refuse to include their name, risking an argument",
  "Stay up all night writing the paper yourself, no matter what",
  "Cover for them by lying to the professor",
  "Ignore it and move along, hoping someone else helps",
  "Stick with the family's choice for a secure future",
  "Attend the study group, missing out on the extra money",
  "Decline, holding out for a position with values you align with"
];

let choice3s = [
  "Privately ask your friend to return what they took to clear things up",
  "Start hiding your belongings or keeping your door locked",
  "Report your friend for academic dishonesty",
  "Talk to the professor privately about the situation",
  "Request an extension and explain your situation honestly",
  "Refuse to lie but help them figure out a solution",
  "Record the situation to report it later",
  "Try to double-major to appease both your family and yourself",
  "Try to convince your professor to give you special help to balance work and college",
  "Accept the internship but try to subtly push for more ethical practices from within",
];

let ethicalImages = [
  "/assets/sad_sprite.png",
  "/assets/happi_sprite.png",
  "/assets/upset_Sprite.png",
  "/assets/game_sprited.png",
  "/assets/think_sprite.png"
];

const buttonReactions = [
  {
    button1: { image: 0, color: "red" }, 
    button2: { image: 3, color: "blue" }, 
    button3: { image: 1, color: "yellow" }  
  },
  {
    button1: { image: 1, color: "yellow" }, 
    button2: { image: 3, color: "blue" }, 
    button3: { image: 2, color: "red" }  
  },
  {
    button1: { image: 2, color: "red" }, 
    button2: { image: 1, color: "yellow" },  
    button3: { image: 3, color: "blue" }   
  },
  {
    button1: { image: 3, color: "blue" }, // "Let them have the credit"
    button2: { image: 0, color: "gray" },  // "Refuse to include their name"
    button3: { image: 1, color: "yellow" }   // "Talk to the professor"
  },
  {
    button1: { image: 2, color: "red" }, // "Use parts of the paper"
    button2: { image: 3, color: "blue" },   // "Stay up all night"
    button3: { image: 1, color: "yellow" }    // "Request an extension"
  },
  {
    button1: { image: 1, color: "yellow" }, // "Tell them to be honest"
    button2: { image: 0, color: "gray" },   // "Cover for them"
    button3: { image: 3, color: "blue" }    // "Refuse to lie"
  },
  {
    button1: { image: 1, color: "yellow" },   
    button2: { image: 3, color: "blue" },  
    button3: { image: 3, color: "blue" }   
  },
  {
    button1: { image: 3, color: "blue" }, 
    button2: { image: 3, color: "blue" },    
    button3: { image: 3, color: "blue" }     
  },
  {
    button1: { image: 3, color: "blue" },
    button2: { image: 3, color: "blue" }, 
    button3: { image: 1, color: "yellow" } 
  },
  {
    button1: { image: 3, color: "blue" }, 
    button2: { image: 3, color: "blue" },  
    button3: { image: 1, color: "yellow" } 
  }
];

let textIndex = -1;
let typing = false;
let i = 0;
let speed = 90;
let jonImage = document.querySelector(".jonImage");
let shakeIntensity = 2;
let shakeDirection = 1;

function typeWriter() {
  if (i < scenarios[textIndex].length) {
    document.querySelector(".scenarioText").innerHTML += scenarios[textIndex].charAt(i);
    jonImage.style.transform = `translateY(${shakeIntensity * shakeDirection}px)`;
    shakeDirection *= -1;
    i++;
    setTimeout(typeWriter, speed);
  } else {
    shakeDirection = 1;
    jonImage.style.transform = 'translateY(0)';
    typing = false;
    i = 0;
  }
}

jonContinueButton.addEventListener('click', () => {
  if(textIndex === 9){
    console.log("Wtf");
    window.location.href = "endPage.html";
  }
  if(textIndex === -1){
    topicText.innerHTML = scenarioTopic[textIndex + 1];
  }
  if(!typing){
    topicText.innerHTML = scenarioTopic[textIndex + 1];
    document.querySelector('.scenarioText').innerHTML = "";
    textIndex++;
  }
  if(!typing && textIndex !== 10){
    typing = true;
    typeWriter();
  }
  button1.innerHTML = choice1s[textIndex];
button2.innerHTML = choice2s[textIndex];
button3.innerHTML = choice3s[textIndex];
});

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

const button1Click = () => {
  jonImage.src = ethicalImages[buttonReactions[textIndex]?.button1?.image] || ethicalImages[4];
  jonImage.style.borderBottom = `3px solid ${buttonReactions[textIndex]?.button1?.color || "none"}`;
};

const button2Click = () => {
  jonImage.src = ethicalImages[buttonReactions[textIndex]?.button2?.image] || ethicalImages[4];
  jonImage.style.borderBottom = `3px solid ${buttonReactions[textIndex]?.button2?.color || "none"}`;
};

const button3Click = () => {
  jonImage.src = ethicalImages[buttonReactions[textIndex]?.button3?.image] || ethicalImages[4];
  jonImage.style.borderBottom = `3px solid ${buttonReactions[textIndex]?.button3?.color || "none"}`;
};

// Add new click event listeners
button1.addEventListener("click", button1Click);
button2.addEventListener("click", button2Click);
button3.addEventListener("click", button3Click);

// Function to update circle positions and draw
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update circle positions and remove off-screen circles
  circles = circles.filter(circle => {
    circle.y += circle.speed;
    
    if (circle.y > canvas.height + circle.radius) {
      return false;
    }
    // Otherwise, draw the circle and keep it
    drawCircle(circle);
    return true;
  });

  requestAnimationFrame(update); // Request the next frame
}

// Initialize animation
update();