document.addEventListener("DOMContentLoaded", function() {
  let hits = 0;
  let totalScore = 0;
  let maxHits = 15; // Default number of hits is 15

  const scoreList = document.getElementById('score-list');
  const dartboard = document.querySelector('.dartboard');

  // Start the game with the chosen number of hits
  function startGame() {
    maxHits = parseInt(document.getElementById('hit-count').value);
    if (isNaN(maxHits) || maxHits < 1) {
      alert('Please choose at least 1 hit.');
      return;
    }

    // Reset hits and scores
    hits = 0;
    totalScore = 0;

    document.getElementById('miss-btn').disabled = false;

    // Remove all red dots
    const redDots = document.querySelectorAll('.red-dot');
    redDots.forEach(dot => dot.remove());

    // Reset all score boxes to empty
    const scoreBoxes = document.querySelectorAll('.score-box');
    scoreBoxes.forEach(box => {
      box.textContent = '';
    });
  }

  // Handle a hit on the target
  function hitTarget(event) {
    if (hits >= maxHits) {
      alert("You've reached the maximum number of hits. Hit Start to restart.");
      return;
    }

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

    // Update the shot history score boxes
    const scoreBoxes = document.querySelectorAll('.score-box');
    if (hits < scoreBoxes.length) {
      scoreBoxes[hits].textContent = scoreForHit;
    }

    // Create and add a red dot to the clicked position
    const redDot = document.createElement('div');
    redDot.classList.add('red-dot');
    redDot.style.position = 'absolute';
    redDot.style.left = `${x - 5}px`; 
    redDot.style.top = `${y - 5}px`;
    dartboard.appendChild(redDot);

    // Update hit count
    hits++;
  }

  // Handle a missed shot
  function missHit() {
    if (hits >= maxHits) {
      alert("You've reached the maximum number of hits. Hit Start to restart.");
      return;
    }

    // Update the shot history score boxes for a miss
    const scoreBoxes = document.querySelectorAll('.score-box');
    if (hits < scoreBoxes.length) {
      scoreBoxes[hits].textContent = '0';
    }

    hits++;
  }

  // Remove inline event handlers from HTML and attach them here
  document.getElementById('start-btn').addEventListener("click", startGame);
  document.getElementById('miss-btn').addEventListener("click", missHit);
  dartboard.addEventListener("click", hitTarget);
});
