'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let scores, currentScore, activePlayer, playing;
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// Switch player functionality (if the active player is player 0 then switch to player 1 else stay on player 0).

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  // If the game is active
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3.Check for rolled 1 : if true,switch to next player
    if (dice !== 1) {
      // Add dice roll to current score
      currentScore += dice;
      // Change the textContent of the active player to the current score in the UI.
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Player switch
      switchPlayer();
    }
  }
});

// Hold button functionality (hold the current score).

btnHold.addEventListener('click', () => {
  // If the game is active
  if (playing) {
    // 1.Add current score to active player's score and update the textContent of the active player to the current score in the UI.
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2.Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // If the active player's score is more or equal than one hundred stop the game
      playing = false;
      // Remove the dice from the UI and disable the roll dice functionality.
      diceEl.classList.add('hidden');
      // To the active player who scored one hundred or more points add the class of winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // To the active player who scored one hundred or more points remove the active class.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // If the score is not more or equal than one hundred keep playing (switch between players, toggle the active class).
    else {
      switchPlayer();
    }
  }
});

// Reset the game when the 'New Game' button is clicked (set everything to the initial values).

btnNew.addEventListener('click', init);
