/* ---------------Boiler Plate--------------- */

const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

/* ----------------Globals--------------- */

let min = 1;
let max;

/* ---------------Function Block------------*/

//Funtion for comp to guess a random number.
/*
function randomNum(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}
*/

//Function for computer to make a smarter guess.
function smartGuess(min, max) {
  return Math.floor((min + max) / 2);
}

//Call the async function.
start();

async function start() {
  min = 1;
  console.log(
    "Let's play a game where you (human) think of a number, and I (computer) try to guess it."
  );
  //Computer asks human to choose the max number for range.
  max = await ask(
    "First, pick a number greater than 1 to be your maximum range. "
  );
  //Turn max into an integer.
  max = parseInt(max);
  //Computer asks human to choose a secret number.
  let secretNumber = await ask(
    "Now, choose a number between " +
      min +
      " and " +
      max +
      "." +
      " \nWhat is your secret number? \nI won't peek, I promise...\n"
  );
  //If human chooses secret number outside of range, computer prompts human to choose again.
  while (secretNumber > max || secretNumber < min) {
    secretNumber = await ask("Please choose a number within the range. ");
  }
  //Computer repeats human's secret number.
  console.log("You entered: " + secretNumber);
  //Name computer's guess.
  let compGuess = smartGuess(min, max);
  //Computer makes a smart guess.
  let answer = await ask("Is your number " + compGuess + "? ");
  //let guessCount = ;

  //If computer guesses correctly on the first try, it rejoices!
  //Otherwise, it enters 'while' loop below.
  if (answer === "y" || answer === "yes") {
    console.log("Woohoo! I guessed it on the first try!! ");
    startAgain();
  } else {
    while (answer !== "y" || answer !== "yes") {
      //If computer guesses incorrectly, it asks if the number is higher or lower.
      if (answer === "y" || answer === "yes") {
        //If computer finally guesses correctly, it celbrates!
        //console.log("Yay! I finally guessed it! ");
        console.log(
          "Yay! I finally guessed it! \nIt took me " +
             +
            " tries to guess your number. "
        );
        startAgain();
      }
      let highLow = await ask("Is it higher or lower? (h/l) ");
      //If human lies, computer catches human.
      if (compGuess - 1 < min && highLow === "l") {
        console.log(
          "Your number is higher than " +
            (compGuess - 1) +
            ", so it can't also be lower than " +
            compGuess +
            "! "
        );
      } else if (compGuess + 1 > max && highLow === "h") {
        console.log(
          "Your number is lower than " +
            (compGuess + 1) +
            ", so it can't also be higher than " +
            compGuess +
            "! "
        );
      } else if (highLow === "h") {
        min = compGuess + 1;
        //If guess is too high, comuter guesses lower.
        compGuess = smartGuess(min, max);
      } else if (highLow === "l") {
        max = compGuess - 1;
        //If guess is too low, computer guesses higher.
        compGuess = smartGuess(min, max);
      } 

      //process.exit();
      answer = await ask("Is your number " + compGuess + "? ");
    }
  }
}

//Callback function to start game over if human says yes.
async function startAgain() {
  let playAgain = await ask("Do you want to play again? ");
  if (playAgain === "y" || playAgain === "yes") {
    start();
  } else {
    process.exit();
  }
}
startAgain(start());

/* Play again */
/*
    async function playAgain(callback) {

    }
    playAgain(start)

    ???
      await ask("Do you want to play again? ");
      while (answer === "y" || answer === "yes") {
        secretNumber = await ask("What is your new secret number? ");
        console.log("You entered: " + secretNumber);


      } else if (answer === "n" || answer === "no") {
        process.exit();
      }
        */
