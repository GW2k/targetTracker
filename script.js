let hits = 0;
let totalScore = 0;
let maxHits = 10; // Default number of hits is 10
const scoreList = document.getElementById('score-list');
const totalScoreDisplay = document.getElementById('total-score');
const hitsDisplay = document.getElementById('score');

// Start the game with the chosen number of hits
function startGame() {
  maxHits = parseInt(document.getElementById('hit-count').value);
  if (maxHits < 1) {
    alert('Please choose at least 1 hit.');
    return;
  }
  
  hits = 0;
  totalScore = 0;
  scoreList.innerHTML = ''; // Clear previous scores
  totalScoreDisplay.innerText = `Total Score: ${totalScore}`;
  hitsDisplay.innerText = `Hits: ${hits}/${maxHits}`;
  document.getElementById('miss-btn').disabled = false; // Enable the miss button

  // Remove all red dots from the dartboard
  document.querySelectorAll('.red-dot').forEach(dot => dot.remove());
}

// Handle a hit on the target
function hitTarget(event) {
  if (hits >= maxHits) {
    alert("You've reached the maximum number of hits. Hit start button to restart.");
    return;
  }

  const dartboard = document.querySelector('.dartboard');
  const rect = dartboard.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const distance = Math.sqrt(Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2));

  const radius1 = rect.width / 2;
  const radius2 = rect.width / 2 * 0.8;
  const radius3 = rect.width / 2 * 0.6;
  const radius4 = rect.width / 2 * 0.4;
  const radius5 = rect.width / 2 * 0.2;

  let scoreForHit = 0;

  if (distance <= radius5) scoreForHit = 5;
  else if (distance <= radius4) scoreForHit = 4;
  else if (distance <= radius3) scoreForHit = 3;
  else if (distance <= radius2) scoreForHit = 2;
  else if (distance <= radius1) scoreForHit = 1;

  totalScore += scoreForHit;

  const listItem = document.createElement('li');
  listItem.textContent = `Hit ${hits + 1}: ${scoreForHit} points`;
  scoreList.appendChild(listItem);

  hits++;
  hitsDisplay.innerText = `Hits: ${hits}/${maxHits}`;
  totalScoreDisplay.innerText = `Total Score: ${totalScore}`;

  // Create the red dot
  const redDot = document.createElement('div');
  redDot.classList.add('red-dot');
  redDot.style.left = `${x - 5}px`; // Adjust for center alignment
  redDot.style.top = `${y - 5}px`;

  dartboard.appendChild(redDot);
}

// Handle a missed shot
function missHit() {
  if (hits >= maxHits) {
    alert("You've reached the maximum number of hits. Hit start to restart");
    return; // Prevent further hits
  }

  // Missed shot means 0 points
  totalScore += 0;

  const listItem = document.createElement('li');
  listItem.textContent = `Hit ${hits + 1}: Miss (0 points)`;
  scoreList.appendChild(listItem);

  hits++;
  hitsDisplay.innerText = `Hits: ${hits}/${maxHits}`;
  totalScoreDisplay.innerText = `Total Score: ${totalScore}`;
}
