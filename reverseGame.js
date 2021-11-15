/* ---------------- Boiler Plate ----------------- */
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
//Global Variables

let min = 1;
let max;
let range = max - min + 1;

//Function for computer coming up with a number.

/*
function secretNum(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}
*/

start();

//Computer asks me to guess a number.

async function start() {
  console.log(
    "Let's play a game where I (computer) think of a number and you (human) guess it."
  );
  max = await ask(
    "First, pick a number greater than 1 to be my maximum range. "
  );
  max = parseInt(max);
  let compNumber = Math.floor((min + max) / 2);
  let humanGuess = await ask(
    "Okay, hmmm, let me think of a number between " +
      min +
      " and " +
      max +
      "... " +
      "\n... " +
      "\n\nOkay, I picked one... " +
      "\nWhat is your guess? "
  );
  humanGuess = parseInt(humanGuess);
  while (humanGuess === compNumber) {
    console.log("Congratulations! You guessed it correctly!");
  }
  while (humanGuess !== compNumber) {
    console.log("You guessed " + humanGuess + ". ");
    if (humanGuess < compNumber) {
      console.log("Noooo, your guess is too low. ");
    } else if (humanGuess > compNumber) {
      console.log("Nope! Your number is too high. ");
    }
    humanGuess = await ask("Guess again! ");
  }

  process.exit();
}

//If the number I guess is too high, the computer tells me I guessed too high.

//If the number I guess is too low, the computer tells me I guessed too low.

//The computer tells me to guess again.

//If I guess the correct number, computer tells me congratulations and ends the game.
