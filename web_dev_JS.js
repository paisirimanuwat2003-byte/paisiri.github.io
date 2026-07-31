// 1. Store the event data in an Array of Objects
const eventsData = [
  { year: "2014", title: "Introduction to Web Development", desc: "I started my journey in web development in 2014, with adobe dreamweaver, and, hosted my first website ever on 5GBfree.", img: "./src/Dreamweaver.jpg" },
  { year: "2015", title: "Learning the convenience of web builders", desc: "In 2015, I discovered web builders and began using platforms such as Weebly and Wix.", img: "./src/web_1.png" },
  { year: "2019", title: "Realizing the limitations of web builders", desc: "In 2019, I realized the limitations of web builders and decided to dive deeper into front-end web development.", img: "./src/vatska_2021.png" },
  { year: "2025", title: "Docker, Websocket and SQLite", desc: "In 2025, I had the opportunity to work with Docker, Websocket and SQLite.", img: "./src/TicTacToe.png" },
  { year: "2021-Present", title: "Renovation and Maintenance of Vatska.com", desc: "Since 2021-Present, I spearheaded the initial renovation and the ongoing maintenance of Vatska Company Limited's website.", img: "./src/vatska_com.png" },
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