let hits = 0;
let totalScore = 0;
const scoreList = document.getElementById('score-list');
const totalScoreDisplay = document.getElementById('total-score');
const hitsDisplay = document.getElementById('score');

function hitTarget(event) {
  if (hits >= 10) {
    alert("You've reached 10 hits! Game over.");
    return; // Prevent further hits
  }

  const dartboard = document.querySelector('.dartboard');
  const rect = dartboard.getBoundingClientRect();
  const x = event.clientX - rect.left; // Get the x position of the click
  const y = event.clientY - rect.top; // Get the y position of the click
  const distance = Math.sqrt(Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2)); // Calculate the distance from the center
  
  // Now we adjust the scoring based on the correct ring distances.
  const radius1 = rect.width / 2; // outermost ring radius
  const radius2 = rect.width / 2 * 0.8; // second ring
  const radius3 = rect.width / 2 * 0.6; // third ring
  const radius4 = rect.width / 2 * 0.4; // fourth ring
  const radius5 = rect.width / 2 * 0.2; // innermost ring

  let scoreForHit = 0;

  // Score based on the distance from the center
  if (distance <= radius5) {
    scoreForHit = 5; // Innermost ring
  } else if (distance <= radius4) {
    scoreForHit = 4; // Fourth ring
  } else if (distance <= radius3) {
    scoreForHit = 3; // Third ring
  } else if (distance <= radius2) {
    scoreForHit = 2; // Second ring
  } else if (distance <= radius1) {
    scoreForHit = 1; // Outer ring
  }

  // Increase the total score by the score for this hit
  totalScore += scoreForHit;

  // Add the hit score to the scoreboard
  const listItem = document.createElement('li');
  listItem.textContent = `Hit ${hits + 1}: ${scoreForHit} points`;
  scoreList.appendChild(listItem);

  // Update the score and hit count
  hits++;
  hitsDisplay.innerText = `Hits: ${hits}/10`;
  totalScoreDisplay.innerText = `Total Score: ${totalScore}`;
}