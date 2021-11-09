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
let max = 100;

/* ---------------Function Block------------*/

function randomNum(min, max) {
  let range = max - min + 1;
  return min + Math.floor(Math.random() * range);
}
randomNum(1, 100);

function smartGuess(min, max) {
  return Math.floor((min + max) / 2)
}


start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number between " +
      min +
      " " +
      "and " +
      max +
      " , and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  let compGuess = smartGuess(min, max);
  let answer = await ask("Is your number " + compGuess + "? ");

  if (answer === "y") {
    console.log("Woohoo!! ");
    process.exit();
  } else {
    while (answer !== "y") {
      let highLow = await ask("Is it higher or lower? (h/l) ");
      if (highLow === "h") {
        min = compGuess + 1
        compGuess = smartGuess(min, max)
      }
      else if (highLow === "l") {
        max = compGuess - 1
        compGuess = smartGuess(min, max)
      }
      answer = await ask("Is your number " + compGuess + "? ");
    }
  }
process.exit();
}