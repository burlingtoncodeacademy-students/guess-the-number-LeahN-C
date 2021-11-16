/* ---------------- Boiler Plate ----------------- */
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
/* ---------------- Global Variables ---------------- */

let min = 1;
let max;
let range = max - min + 1;

/* ------------------ Function block ---------------- */

//Call the async function.
start();

//Function to start the game
async function start() {
  console.log(
    "Let's play a game where I (computer) think of a number and you (human) guess it."
  );
  //Computer asks human to choose a maximum.
  max = await ask(
    "First, pick a number greater than 1 to be my maximum range. "
  );
  //Turns max into integer.
  max = parseInt(max);
  //Computer chooses a number between the minimum and maximum.
  let compNumber = Math.floor(min + max);
  //Computer asks human to guess a number.
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
  //Name the human guess.
  humanGuess = parseInt(humanGuess);
  //Computer repeats user's guess.
  console.log("You guessed " + humanGuess + ". ");
  //If human guesses correctly on first try, computer returns this message.
  //Otherwise, computer goes into the 'while' loop below.
  if (humanGuess === compNumber) {
    console.log("Wow, you guessed it on the FIRST TRY! You're amazing. ");
  } else {
    while (humanGuess !== compNumber) {
      //If the guess is outside of the range, computer returns this message.
      if (humanGuess > max || humanGuess < min) {
        humanGuess = await ask(
          "Your guess is outside of the range, please pick a guess between " +
            min +
            " and " +
            max +
            ". "
        );
      } else if (humanGuess < compNumber) {
        //If human guess is too low.
        humanGuess = await ask("Noooo, your guess is too low. Guess again! ");
      } else if (humanGuess > compNumber) {
        //If human guess is too high.
        humanGuess = await ask("Nope! Your number is too high. Guess again! ");
      } else {
        //When human finally guesses correctly...
        console.log("Congratulations! You guessed it correctly! ");
        //Exit the program.
        process.exit();
      }
    }
  }

  process.exit();
}

/* ------------------ My initial outline below --------------- */

//If the number I guess is too high, the computer tells me I guessed too high.

//If the number I guess is too low, the computer tells me I guessed too low.

//The computer tells me to guess again.

//If I guess the correct number, computer tells me congratulations and ends the game.
