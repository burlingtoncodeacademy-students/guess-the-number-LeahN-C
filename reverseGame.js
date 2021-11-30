/* ---------------- Boiler Plate ----------------- */
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
/* ---------------- Global Variables ---------------- */

let minimum = 1;
let maximum;
let range = maximum - minimum + 1;

/* ------------------ Function block ---------------- */

//Call the async function.
compChooses();

//Function to start the game
async function compChooses() {
  console.log(
    "Let's play a game where I (computer) think of a number and you (human) guess it."
  );
  //Computer asks human to choose a maximum.
  maximum = await ask(
    "First, pick a number greater than 1 to be my maximum range. "
  );
  //Turns max into integer.
  maximum = parseInt(maximum);
  //Computer chooses a number between the minimum and maximum.
  let compNumber = Math.floor(Math.random() * maximum);
  //Computer asks human to guess a number.
  let humanGuess = await ask(
    "Okay, hmmm, let me think of a number between " +
      minimum +
      " and " +
      maximum +
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
      if (humanGuess > maximum || humanGuess < minimum) {
        humanGuess = await ask(
          "Your guess is outside of the range, please pick a guess between " +
            minimum +
            " and " +
            maximum +
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
  //Exit the program.
  process.exit();
}