const greetings = [
  "Namaste Baccho",
  "Vanakkam Baccha",
  "Namaskara Buddy ",
  "Namaskaram ",
  "Nomoskar",
  "Kem Cho ",
  "Ki hal chal",
  "Radhe Radhe",
  "Jai Shree Krishna",
  "Namo Namo",
  "Ram Ram",
];

let greetElement = document.getElementById("greet");
let greetingIndex = 0;

function typeGreeting(text, i = 0) {
  if (i < text.length) {
    greetElement.textContent = text.substring(0, i + 1);
    setTimeout(() => typeGreeting(text, i + 1), 50); // Adjust typing speed here
  }
}

function changeGreeting() {
  const randomGreeting = greetings[greetingIndex % greetings.length]; // Cycle through greetings
  greetingIndex++;

  // Start typing the new greeting
  greetElement.textContent = ""; // Clear previous text
  typeGreeting(randomGreeting);
}

// Change greeting every 20 seconds
setInterval(changeGreeting, 10000);

// Run once on page load
window.onload = changeGreeting;
