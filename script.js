'use strict';

// Selecting the elements
const player0Elem = document.querySelector('.player--0');
const player1Elem = document.querySelector('.player--1');
const player0ScoreElem = document.querySelector('#score--0');
const player1ScoreElem = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const newBtnElem = document.querySelector('.btn--new');
const rollBtnElem = document.querySelector('.btn--roll');
const holdBtnElem = document.querySelector('.btn--hold');
const diceElem = document.querySelector('.dice');
const gameMessage = document.querySelector('.game--message');
const winnerMessage = document.querySelector('.winner--message');


const message = (displayMessage) => {
    winnerMessage.textContent = displayMessage;
}

// Starting condition
let score, currentScore, playing, activePlayer;

let gameReset = () => {
    score = [0, 0];
    currentScore = 0;
    playing = true;
    activePlayer = 0;

    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    player0ScoreElem.textContent = 0;
    player1ScoreElem.textContent = 0;

    diceElem.classList.add('hidden');
    player0Elem.classList.add('player--active');
    gameMessage.classList.remove('hidden');
    player1Elem.classList.remove('player--active');
    player0Elem.classList.remove('player--winner');
    player1Elem.classList.remove('player--winner');
    winnerMessage.classList.remove(message());
}
gameReset();

//  Switching players
const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Elem.classList.toggle('player--active');
    player1Elem.classList.toggle('player--active');
}

// ROlling dice functionality
rollBtnElem.addEventListener('click', () => {

    if (playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display dice
        diceElem.classList.remove('hidden');
        diceElem.src = `dice-${dice}.png`;

        //Removing text 
        gameMessage.classList.add('hidden');

        //3. Check for roll the dice and if its 1, switch the player
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
})

holdBtnElem.addEventListener('click', () => {
    if (playing) {
        //  Add score to the active players score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        // check if players score >=100
        if (score[activePlayer] >= 100) {
            playing = false;
            diceElem.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            message(`player ${activePlayer + 1} won the match`);
        } else {
            //  Switch to the next player
            switchPlayer();
        }
    }
});

newBtnElem.addEventListener('click', gameReset);