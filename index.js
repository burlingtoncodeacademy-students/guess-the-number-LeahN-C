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

function randomNum(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}

function smartGuess(min, max) {
  return Math.floor((min + max) / 2);
}

start();

async function start() {
  console.log(
    "Let's play a game where you (human) think of a number, and I (computer) try to guess it."
  );
  max = await ask(
    "First, pick a number greater than 1 to be your maximum range. "
  );
  max = parseInt(max);
  //console.log(typeof max);
  let secretNumber = await ask(
    "Now, choose a number between " +
      min +
      " and " +
      max +
      "." +
      " \nWhat is your secret number? \nI won't peek, I promise...\n"
  );
    while (secretNumber > max) {
      secretNumber = await ask("Please choose a number within the range. ")
    }
  console.log("You entered: " + secretNumber);
  let compGuess = smartGuess(min, max);
  let answer = await ask("Is your number " + compGuess + "? ");

  if (answer === "y" || answer === "yes") {
    console.log("Woohoo! I guessed it on the first try!! ");
  } else {
    while (answer !== "y" || answer !== "yes") {
      let highLow = await ask("Is it higher or lower? (h/l) ");
      if (highLow === "h") {
        min = compGuess + 1;
        compGuess = smartGuess(min, max);
      } else if (highLow === "l") {
        max = compGuess - 1;
        compGuess = smartGuess(min, max);
      } else if (highLow === "l" && highLow < min) {
        console.log(
          "You said your number is higher than " +
            min +
            ", so it can't also be lower than " +
            (min + 1) +
            "! "
        );
      } else if (highLow === "h" && highLow > max) {
        console.log(
          "You said your number is lower than " +
            max +
            ", so it can't also be higher than " +
            (max - 1) +
            "! "
        );
      } else if (answer === "y" || answer === "yes") {
        console.log("Yay! I finally got it! ")
      }
      answer = await ask("Is your number " + compGuess + "? ");
    } console.log(
    "Yay! I finally guessed it! \nIt took me " +
      +" tries to guess your number. "
    );
  }

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

  process.exit();
}
