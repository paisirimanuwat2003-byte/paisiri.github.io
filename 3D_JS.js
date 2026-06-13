// 1. Store the event data in an Array of Objects
const eventsData = [
  { year: "2015", title: "Introduction to 3D Modeling", desc: "I started my journey in 3D modeling in 2015 with Techne for minecraft." },
  { year: "2016", title: "Mine imator", desc: "in early 2016, I commenced my animation journey with Mine imator." },
  { year: "2016", title: "Incorporating SketchUp", desc: "I later incorporated SketchUp for more complex architectural models in 2016." },
  { year: "2016", title: "Cinema 4D Adoption", desc: "In 2016, I began using Cinema 4D for more advanced 3D modeling, rigging and animation." },
  { year: "2017", title: "Blender Experimentation", desc: "I also experimented with Blender due to its open-source nature." },
  { year: "2025", title: "Onshape Exploration", desc: "Most recently, in 2025, I have been exploring Onshape for its cloud-based collaboration features." },

];

// 2. Select HTML elements
const dots = document.querySelectorAll('.dot');
const progressLine = document.getElementById('progress-line');
const yearEl = document.getElementById('event-year');
const titleEl = document.getElementById('event-title');
const descEl = document.getElementById('event-desc');
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