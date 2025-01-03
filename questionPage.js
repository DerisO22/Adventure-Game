const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let topicText = document.querySelector('.topText');
let jonContinueButton = document.querySelector(".jonImage");
let button1 = document.getElementById("choice1");
let button2 = document.getElementById("choice2");
let button3 = document.getElementById("choice3");

let ethicsBar = document.getElementById("ethicsBar");

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

let instructionsPrompts = [
  "Welcome to the Ethics Challenge!",
  "I'll be giving you a scenario and there will be three choices...",
  "I will judge each choice and the ethics meter will change based on your choice...",
  "These choices are based on my judgment, so it is okay to have a differnt opinion",
  "Let's begin!"
]

let ethicalImages = [
  "/assets/sad_sprite.png",
  "/assets/happi_sprite.png",
  "/assets/upset_Sprite.png",
  "/assets/game_sprited.png",
  "/assets/think_sprite.png"
];

const buttonReactions = [
  {
    button1: { image: 0, color: "gray" }, 
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
    button1: { image: 3, color: "blue" }, 
    button2: { image: 0, color: "gray" },  
    button3: { image: 1, color: "yellow" }  
  },
  {
    button1: { image: 2, color: "red" }, 
    button2: { image: 3, color: "blue" },  
    button3: { image: 1, color: "yellow" }   
  },
  {
    button1: { image: 1, color: "yellow" }, 
    button2: { image: 0, color: "gray" },  
    button3: { image: 3, color: "blue" }   
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

let textIndex = -5;
let typing = false;
let i = 0;
let j = 0;
let speed = 1;
let jonImage = document.querySelector(".jonImage");
let shakeIntensity = 2;
let shakeDirection = 1;

/**
 * red = -10
 * blue = 0
 * yellow = 10
 * gray
 */
let tempScore = 50;
let currentScore = 50;

function typeWriter() {
  if(textIndex < 0) {
    if (i < instructionsPrompts[textIndex + 5].length) {
      document.querySelector(".scenarioText").innerHTML += instructionsPrompts[textIndex + 5].charAt(i);
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
  } else {
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
}

jonContinueButton.addEventListener('click', () => {
  if(textIndex > -2){
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
      ethicsBar.style.width = `${tempScore}%`;
      ethicsBar.innerHTML = `${tempScore}%`
      currentScore = tempScore;
      textIndex++;
    }
    if(!typing && textIndex !== 10){
      typing = true;
      typeWriter();
    }
    button1.innerHTML = choice1s[textIndex];
    button2.innerHTML = choice2s[textIndex];
    button3.innerHTML = choice3s[textIndex];
 } else {
    console.log(textIndex);
    if(textIndex === -4){
      topicText.innerHTML = instructionsPrompts[textIndex + 5];
    }
    if(!typing){
      topicText.innerHTML = instructionsPrompts[textIndex + 5];
      document.querySelector('.scenarioText').innerHTML = "";
      textIndex++;
    }
    if(!typing && textIndex !== 10){
      typing = true;
      typeWriter();
    }
 }
});


function handleScore(color){
  console.log('In Handle Score Function');
  tempScore = currentScore;

  if(color == 'red'){
    tempScore = currentScore - 10;
  } else if (color == 'blue'){
    // No change for blue
  } else if (color == 'yellow'){
    tempScore = currentScore + 10;
  } else if (color == 'gray'){
    tempScore = currentScore - 20;
  }
  gsap.to(ethicsBar, { duration: 0.5, width: `${tempScore}%` });
  ethicsBar.innerHTML = `${tempScore}%`

  // Handle the Background Color and Text Color
  // Based on Score and Choice
  if(tempScore < 40){
    gsap.to(ethicsBar, { duration: 0.3, backgroundColor: `red` });
  } else if (tempScore < 60){
    gsap.to(ethicsBar, { duration: 0.3, backgroundColor: `blue` });
  } else if (tempScore < 100){
    gsap.to(ethicsBar, { duration: 0.3, backgroundColor: `green` });
  }
}

const button1Click = () => {
  jonImage.src = ethicalImages[buttonReactions[textIndex]?.button1?.image] || ethicalImages[4];
  jonImage.style.borderBottom = `3px solid ${buttonReactions[textIndex]?.button1?.color || "none"}`;

  // Ethics Bar Stuff
  ethicsBar.innerHTML = `${currentScore}%`
  gsap.to(ethicsBar, { duration: 0.5, width: `${currentScore}%` });
  button1.style.border = `3px solid ${buttonReactions[textIndex]?.button1?.color || "none"}`;
  button2.style.border = `1px solid black`
  button3.style.border = `1px solid black`

  handleScore(buttonReactions[textIndex]?.button1?.color)
};

const button2Click = () => {
  jonImage.src = ethicalImages[buttonReactions[textIndex]?.button2?.image] || ethicalImages[4];
  jonImage.style.borderBottom = `3px solid ${buttonReactions[textIndex]?.button2?.color || "none"}`;

  // Ethics Bar Stuff
  ethicsBar.innerHTML = `${currentScore}%`
  gsap.to(ethicsBar, { duration: 0.5, width: `${currentScore}%` });
  button2.style.border = `3px solid ${buttonReactions[textIndex]?.button2?.color || "none"}`;
  button1.style.border = `1px solid black`
  button3.style.border = `1px solid black`

  handleScore(buttonReactions[textIndex]?.button2?.color);
};

const button3Click = () => {
  jonImage.src = ethicalImages[buttonReactions[textIndex]?.button3?.image] || ethicalImages[4];
  jonImage.style.borderBottom = `3px solid ${buttonReactions[textIndex]?.button3?.color || "none"}`;

  // Ethics Bar Stuff
  ethicsBar.innerHTML = `${currentScore}%`
  gsap.to(ethicsBar, { duration: 0.5, width: `${currentScore}%` });
  button3.style.border = `3px solid ${buttonReactions[textIndex]?.button3?.color || "none"}`;
  button1.style.border = `1px solid black`
  button2.style.border = `1px solid black`

  handleScore(buttonReactions[textIndex]?.button3?.color);
};

// Add new click event listeners
button1.addEventListener("click", button1Click);
button2.addEventListener("click", button2Click);
button3.addEventListener("click", button3Click);

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