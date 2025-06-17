// ----------------------------
// 🎵 Setlist Generator
// ----------------------------

const songs = [
  "No Body European Tour Intro",
  "A Marrow Escape",
  "The Final Pulse",
  "Shadow Over the Stage",
  "Encore: Lights Out",
];

function generateSetlist() {
  const shuffledSongs = songs.sort(() => Math.random() - 0.5);

  // This line updates the webpage by adding new HTML content using JavaScript.
  // Think of it like telling JavaScript: “Print this list onto the page.”
  document.getElementById("setlist").innerHTML = shuffledSongs
    .map((song) => `<li>${song}</li>`)
    .join("");
}

document
  .getElementById("generateSetlist")
  .addEventListener("click", generateSetlist);

// ----------------------------
// ⏳ Countdown Timer
// ----------------------------

const tourStart = new Date("2025-08-01T20:00:00");
const countdown = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  const diff = tourStart - now;

  if (diff <= 0) {
    countdown.textContent = "The tour has started!";
    clearInterval(timer);
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.textContent = `⏰ ${hours}h ${minutes}m ${seconds}s until showtime`;
}

const timer = setInterval(updateCountdown, 1000);

// ----------------------------
// 🛠️ Feature Scaffolds
// ----------------------------

// 1️⃣ VIP Ticket Winner Generator
document.getElementById("vipWinner").innerHTML = `
    <h3>VIP Ticket Winner</h3>
    <button id="pickWinner">Pick Winner</button>
    <div id="winnerOutput"></div>
  `;

document.getElementById("pickWinner").addEventListener("click", () => {
  // Add your code here
});

// 2️⃣ Fan Favorite Showdown
// Chart of songs from the Setlist Generator, centered with padding, percentages shown after voting
const fanFavoriteDiv = document.getElementById("fanFavorite");

const voteSongs = [
  "No Body European Tour Intro",
  "A Marrow Escape",
  "The Final Pulse",
  "Shadow Over the Stage",
  "Encore: Lights Out",
];

let votes = Array(voteSongs.length).fill(0);
let hasVoted = false;

// Try to load saved votes from localStorage
let savedVotes = localStorage.getItem("fanFavoriteVotes");
if (savedVotes) {
  votes = JSON.parse(savedVotes);
}

// Build the voting UI: collapsible section with a table for song choices, centered, with padding
let votingHTML = `<h3 style="text-align:center;">Fan Favorite Showdown</h3>
    <div style="display:flex; flex-direction:column; align-items:center;">
      <button id="toggleVoteSection" aria-expanded="false" aria-controls="voteSection">▼ Show Songs</button>
      <div id="voteSection" style="display:none; margin-top:10px;">
        <table id="voteTable" border="1" style="border-collapse:collapse; text-align:center; margin:auto;">
          <tr>`;
voteSongs.forEach((song, idx) => {
  votingHTML += `<th style='padding: 12px 18px;'>${song}</th>`;
});
votingHTML += `</tr><tr>`;
voteSongs.forEach((song, idx) => {
  votingHTML += `<td style='padding: 16px 18px;'><button class="voteBtn" data-idx="${idx}">Vote</button><br><span id="count-${idx}" style="display:none;">0</span> <span id="percent-${idx}" style="display:none;">(0%)</span></td>`;
});
votingHTML += `</tr></table>
        <div id="voteMsg" style="margin-top:10px;"></div>
      </div>
    </div>`;
fanFavoriteDiv.innerHTML = votingHTML;

// Collapsible logic
const toggleBtn = document.getElementById("toggleVoteSection");
const voteSection = document.getElementById("voteSection");
toggleBtn.addEventListener("click", () => {
  const isOpen = voteSection.style.display === "block";
  voteSection.style.display = isOpen ? "none" : "block";
  toggleBtn.textContent = isOpen ? "▼ Show Songs" : "▲ Hide Songs";
  toggleBtn.setAttribute("aria-expanded", !isOpen);
});

// Remove the localStorage flag so users can vote again after reload
// Add event listeners to all vote buttons
const voteButtons = document.querySelectorAll(".voteBtn");
voteButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (hasVoted) {
      document.getElementById("voteMsg").textContent =
        "You can only vote once!";
      return;
    }
    const idx = parseInt(btn.getAttribute("data-idx"));
    votes[idx] += 1;
    // Save updated votes to localStorage
    localStorage.setItem("fanFavoriteVotes", JSON.stringify(votes));
    hasVoted = true;
    document.getElementById(
      "voteMsg"
    ).textContent = `Thank you for voting for \"${voteSongs[idx]}\"!`;
    // Disable all vote buttons after voting
    voteButtons.forEach((b) => (b.disabled = true));
    updateVoteChart();
    // Show counts and percentages after voting
    voteSongs.forEach((song, i) => {
      document.getElementById(`count-${i}`).style.display = "inline";
      document.getElementById(`percent-${i}`).style.display = "inline";
    });
  });
});

function updateVoteChart() {
  const totalVotes = votes.reduce((a, b) => a + b, 0);
  voteSongs.forEach((song, idx) => {
    const percent =
      totalVotes > 0 ? ((votes[idx] / totalVotes) * 100).toFixed(1) : 0;
    document.getElementById(`count-${idx}`).textContent = votes[idx];
    document.getElementById(`percent-${idx}`).textContent = `(${percent}%)`;
  });
}

// Show saved vote counts and percentages if any votes exist
function showSavedVotesIfAny() {
  const totalVotes = votes.reduce((a, b) => a + b, 0);
  if (totalVotes > 0) {
    voteSongs.forEach((song, i) => {
      document.getElementById(`count-${i}`).style.display = "inline";
      document.getElementById(`percent-${i}`).style.display = "inline";
    });
    updateVoteChart();
  }
}
showSavedVotesIfAny();

// 3️⃣ Tour Date Spotlight
document.getElementById("tourHighlight").innerHTML = `
    <h3>Tour Date Spotlight</h3>
    <ul>
    <li id="cityOslo">Oslo</li>
    <li id="cityBerlin">Berlin</li>
    <li id="cityLondon">London</li>
    </ul>
  `;

// Sample event listener for one city
document.getElementById("cityOslo").addEventListener("click", () => {
  // Add your code here
});

// Students will need to add one for each remaining city (Berlin and London)

// 4️⃣ On the Road Again
document.getElementById("nextTourStop").innerHTML = `
    <h3>On the Road Again</h3>
    <div id="nextStop"></div>
  `;

// This logic can run on page load or refresh
function displayNextTourStop() {
  // Add your code here
}

// 5️⃣ Entry Checkpoint
document.getElementById("emailCheck").innerHTML = `
    <h3>Entry Checkpoint</h3>
    <input type="email" id="emailInput" placeholder="Enter email">
    <button id="checkEmail">Check</button>
    <div id="emailResult"></div>
  `;

document.getElementById("checkEmail").addEventListener("click", () => {
  // Add your code here
});

// 6️⃣ Band Bio Toggle
document.getElementById("bioToggle").innerHTML = `
    <h3>Band Bio Toggle</h3>
    <button id="toggleBio">Show/Hide Bio</button>
    <p id="bio" style="display:none;">Skullcapz is a heavy metal band from Norway, known for their dark, intense sound and high-energy shows.</p>
  `;

document.getElementById("toggleBio").addEventListener("click", () => {
  // Add your code here
});
