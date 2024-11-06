const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let topicText = document.querySelector('.topText')
let jonContinueButton = document.querySelector(".jonImage");
let button1 = document.getElementById("choice1")
let button2 = document.getElementById("choice2")
let button3 = document.getElementById("choice3")

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
]

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
]

let choice1s = [
  "Defend the accused student by reporting what you saw",
  "Confront them directly and ask them to stop",
  "Accept the answers to pass the exam",
  "Let them have the credit to keep peace in the group",
  "Use parts of the paper to save time but risk getting caught",
  "Tell them they need to be honest with the professor",
  "Step in to defend the student, even if it risks conflict",
  "Follow your passion, risking family dissapointment",
  "Take the extra hours and skip the study group",
  "Take the internship to build your resume and income"
]

let choice2s = [
  "Stay silent, hoping things will work out",
  "Ignore it to avoid tension, even if it bother you",
  "politely decline and try to study harder on your own",
  "Refuse to include their name, risking an argument",
  "Stay up all night writing the paper yourself, no matter what",
  "Cover for them by lying to the professor",
  "Ignore it and move along, hoping someone else helps",
  "Stick with the family's choice for a secure future",
  "Attend the study group, missing out on the extra money",
  "Decline, holding out for a position with values you align with"
]

let choice3s = [
  "Privately ask your friend to return what they took to clear things up",
  "Start hiding your belongings or keeping your door locked",
  "report your friend for academic dishonesty",
  "Talk to the professor privately about the situation",
  "Request an extension and explain your situation honestly",
  "Refuse to lie but help them figure out a solution",
  "Record the situation to report it later",
  "Try to double-major to appease both your family and yourself",
  "Try to convince your professor to give you special help to balance work and college",
  "Accept the internship but try to subtly push for more ethical practices from within",
]

let ethicalImages = [
  "/assets/sad_sprite.png",
  "/assets/happi_sprite.png",
  "/assets/upset_Sprite.png",
  "/assets/game_sprited.png",
  "/assets/think_sprite.png"
];

let textIndex = -1;
let typing = false
// Introduce Jon and possibly mutiple Characters

let i = 0;
let speed = 90; /* The speed/duration of the effect in milliseconds */
let jonImage = document.querySelector(".jonImage")
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
    typing = false
    i = 0;
  }
}

jonContinueButton.addEventListener('click', () => {
  if(textIndex == -1){
    topicText.innerHTML = scenarioTopic[textIndex+1]
  }
  if(!typing){
    topicText.innerHTML = scenarioTopic[textIndex+1]
    document.querySelector('.scenarioText').innerHTML = "";
    textIndex++;
  }
  console.log(textIndex)
  if(!typing && textIndex != 11){
    typing = true;
    typeWriter();
  }
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

  /**
 * Answers 
 */
 // 0 - sad
 // 1 - happy
 // 2 - mad
 // 3 - neutral
 // 4 - think
switch(textIndex){
  case 0:
    //Set Text
    button1.innerHTML = choice1s[textIndex]
    button2.innerHTML = choice2s[textIndex]
    button3.innerHTML = choice3s[textIndex]

    //Button 1
    button1.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[2];
      jonImage.style.borderBottom = "3px solid red"
    });
    button1.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4]; 
      jonImage.style.borderBottom = "none"
    });

    //Button 2
    button2.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button2.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4];
      jonImage.style.borderBottom = "none"
    });

    //Button 3
    button3.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[1]
      jonImage.style.borderBottom = "3px solid yellow"
    });
    button3.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "none"
    });
    break;
  case 1:
    button1.innerHTML = choice1s[textIndex]
    button2.innerHTML = choice2s[textIndex]
    button3.innerHTML = choice3s[textIndex]

    //Button 1
    button1.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[2];
      jonImage.style.borderBottom = "3px solid red"
    });
    button1.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4]; 
      jonImage.style.borderBottom = "none"
    });

    //Button 2
    button2.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button2.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4];
      jonImage.style.borderBottom = "none"
    });

    //Button 3
    button3.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[1]
      jonImage.style.borderBottom = "3px solid yellow"
    });
    button3.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "none"
    });
    break;
  case 2:
    button1.innerHTML = choice1s[textIndex]
    button2.innerHTML = choice2s[textIndex]
    button3.innerHTML = choice3s[textIndex]

    //Button 1
    button1.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[2];
      jonImage.style.borderBottom = "3px solid red"
    });
    button1.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4]; 
      jonImage.style.borderBottom = "none"
    });

    //Button 2
    button2.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[1];
      jonImage.style.borderBottom = "3px solid yellow"
    });
    button2.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4];
      jonImage.style.borderBottom = "none"
    });

    //Button 3
    button3.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3]
      jonImage.style.borderBottom = "3px solid blue"
    });
    button3.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "none"
    });
    break;
  case 3:
    button1.innerHTML = choice1s[textIndex]
    button2.innerHTML = choice2s[textIndex]
    button3.innerHTML = choice3s[textIndex]

    //Button 1
    button1.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button1.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4]; 
      jonImage.style.borderBottom = "none"
    });

    //Button 2
    button2.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[0];
      jonImage.style.borderBottom = "3px solid gray"
    });
    button2.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4];
      jonImage.style.borderBottom = "none"
    });

    //Button 3
    button3.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[1]
      jonImage.style.borderBottom = "3px solid yellow"
    });
    button3.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "none"
    });
    break;
  case 4:
    button1.innerHTML = choice1s[textIndex]
    button2.innerHTML = choice2s[textIndex]
    button3.innerHTML = choice3s[textIndex]

    //Button 1
    button1.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[2];
      jonImage.style.borderBottom = "3px solid red"
    });
    button1.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4]; 
      jonImage.style.borderBottom = "none"
    });

    //Button 2
    button2.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button2.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4];
      jonImage.style.borderBottom = "none"
    });

    //Button 3
    button3.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[1]
      jonImage.style.borderBottom = "3px solid yellow"
    });
    button3.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "none"
    });
    break;
  case 5:
    button1.innerHTML = choice1s[textIndex]
    button2.innerHTML = choice2s[textIndex]
    button3.innerHTML = choice3s[textIndex]

    //Button 1
    button1.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[1];
      jonImage.style.borderBottom = "3px solid yellow"
    });
    button1.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4]; 
      jonImage.style.borderBottom = "none"
    });

    //Button 2
    button2.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[0];
      jonImage.style.borderBottom = "3px solid gray"
    });
    button2.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4];
      jonImage.style.borderBottom = "none"
    });

    //Button 3
    button3.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3]
      jonImage.style.borderBottom = "3px solid blue"
    });
    button3.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "none"
    });
    break;
  case 6:
    button1.innerHTML = choice1s[textIndex]
    button2.innerHTML = choice2s[textIndex]
    button3.innerHTML = choice3s[textIndex]

    //Button 1
    button1.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[1];
      jonImage.style.borderBottom = "3px solid yellow"
    });
    button1.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4]; 
      jonImage.style.borderBottom = "none"
    });

    //Button 2
    button2.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button2.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4];
      jonImage.style.borderBottom = "none"
    });

    //Button 3
    button3.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3]
      jonImage.style.borderBottom = "3px solid blue"
    });
    button3.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "none"
    });
    break;
  case 7:
    button1.innerHTML = choice1s[textIndex]
    button2.innerHTML = choice2s[textIndex]
    button3.innerHTML = choice3s[textIndex]

    //Button 1
    button1.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button1.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4]; 
      jonImage.style.borderBottom = "none"
    });

    //Button 2
    button2.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button2.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4];
      jonImage.style.borderBottom = "none"
    });

    //Button 3
    button3.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3]
      jonImage.style.borderBottom = "3px solid blue"
    });
    button3.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "none"
    });
    break;
  case 8:
    button1.innerHTML = choice1s[textIndex]
    button2.innerHTML = choice2s[textIndex]
    button3.innerHTML = choice3s[textIndex]

    //Button 1
    button1.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button1.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4]; 
      jonImage.style.borderBottom = "none"
    });

    //Button 2
    button2.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button2.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4];
      jonImage.style.borderBottom = "none"
    });

    //Button 3
    button3.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[1]
      jonImage.style.borderBottom = "3px solid yellow"
    });
    button3.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "none"
    });
    break;
  case 9:
    button1.innerHTML = choice1s[textIndex]
    button2.innerHTML = choice2s[textIndex]
    button3.innerHTML = choice3s[textIndex]

    //Button 1
    button1.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button1.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4]; 
      jonImage.style.borderBottom = "none"
    });

    //Button 2
    button2.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "3px solid blue"
    });
    button2.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[4];
      jonImage.style.borderBottom = "none"
    });

    //Button 3
    button3.addEventListener("mouseover", () => {
      jonImage.src = ethicalImages[1]
      jonImage.style.borderBottom = "3px solid yellow"
    });
    button3.addEventListener("mouseout", () => {
      jonImage.src = ethicalImages[3];
      jonImage.style.borderBottom = "none"
    });
    break;
}

  requestAnimationFrame(update); // Request the next frame
}
// Spawn a new circle
setInterval(() => {
  circles.push(createCircle());
}, 100);
// Initialize animation
update();