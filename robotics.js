// 1. Store the event data in an Array of Objects
const eventsData = [
  { year: "2017", title: "Introduction to Programmable Modules, Arduino Uno", desc: "I first encountered a microcontroller in the form of an Arduino Uno, during a classroom group project. Requiring me to use Scratch in the process, for beginner programming, my group and I were able to create a simple robot that could follow a line on the ground.", img: "./src/arduino.jpg" },
  { year: "2023", title: "Introduction to a new programmable module, Micro:bit", desc: "In 2023, I was introduced to a new programmable module, the Micro:bit. This module was introduced as part of the university's program which I was part of, and, allowed me to write my first bare-metal program.", img: "./src/microbit.jpg" },
  { year: "2024", title: "Self study of robotics and programming", desc: "In 2024, I began self-studying robotics and programming, which allowed me to gain a deeper understanding of the field. Consequently, I decided to plan my dissertation on the topic.", img: "./src/prototype_design.jpg" },
  { year: "2025", title: "Dissertation on Robotics and Programming", desc: "In 2025, I started my over a year long project, over the summer of my sophomore year, by creating a basic prototype/ first few iterations of my fire fighting robot or I-BO.", img: "./src/4th_iteration.jpg" },
  { year: "2026", title: "Finalizing the Fire Fighting Robot, I-BO", desc: "In 2026, I finalized my fire fighting robot, I-BO, and presented it to my university's faculty. The robot was able to successfully meet most of my expectations and all of the requirements and then some thanks to the help of my supervisor.", img: "./src/supervisor.jpg" },
];

// 1.1 resizing the image to fit the container

eventsData[0].style = "width: 100%; height: auto; object-fit: cover;";


// 2. Select HTML elements
const dots = document.querySelectorAll('.dot');
const progressLine = document.getElementById('progress-line');
const yearEl = document.getElementById('event-year');
const titleEl = document.getElementById('event-title');
const descEl = document.getElementById('event-desc');
const imgEl = document.getElementById('event-image');
const playBtn = document.getElementById('btn-play');
const resetBtn = document.getElementById('btn-reset');

let currentIndex = 0;
let playInterval = null;

// 3. The Core Function: Updates the whole UI based on the chosen index
function goToEvent(index) {
  currentIndex = index;

  // A. Calculate how wide the line should be (e.g., index 3 out of 6 total steps = 50%)
  const percentage = (currentIndex / (dots.length - 1)) * 100;
  progressLine.style.width = `${percentage}%`;

  // B. Light up the correct dots
  dots.forEach((dot, i) => {
    if (i <= currentIndex) {
      dot.classList.add('active'); // Turn blue
    } else {
      dot.classList.remove('active'); // Turn grey
    }
  });

  // C. Update the text below
  const event = eventsData[currentIndex];
  yearEl.innerText = event.year;
  titleEl.innerText = event.title;
  descEl.innerText = event.desc;
  imgEl.src = event.img;
}

// 4. Add Click Listeners to each Dot
dots.forEach((dot) => {
  dot.addEventListener('click', (e) => {
    // Stop auto-play if the user clicks manually
    clearInterval(playInterval);

    // Get the index number from the HTML 'data-index' attribute
    const clickedIndex = parseInt(e.target.getAttribute('data-index'));
    goToEvent(clickedIndex);
  });
});

// 5. Auto-Play Logic
playBtn.addEventListener('click', () => {
  // Clear any existing intervals so they don't overlap
  clearInterval(playInterval);

  // If we are already at the end, start over before playing
  if (currentIndex === dots.length - 1) {
    goToEvent(0);
  }

  // Trigger the next step every 1.5 seconds (1500 milliseconds)
  playInterval = setInterval(() => {
    if (currentIndex < dots.length - 1) {
      goToEvent(currentIndex + 1);
    } else {
      // Stop playing when we hit the end
      clearInterval(playInterval);
    }
  }, 4500); // 4500 milliseconds = 4.5 seconds
});

// 6. Reset Logic
resetBtn.addEventListener('click', () => {
  clearInterval(playInterval);
  goToEvent(0);
});