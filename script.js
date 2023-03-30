'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, scores, playing, activePlayer;

// initial conditions...
const init = function () {
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

// switching players...

const swicthPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// user rolls dice..

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. generating random number...
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log('hello');
    //2. displaying dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swicthPlayer();
    }
  }
});

//user hold score...

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to the active player's score

    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if score of active player is greater than 100..
    if (scores[activePlayer] >= 100) {
      //finish the game ..
      playing = false;

      //hide the dice
      diceEl.classList.add('hidden');
      // make active player winner...
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // remove active player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switchPlayer
      swicthPlayer();
    }
  }
});

// user resets the game..
btnNew.addEventListener('click', init);
