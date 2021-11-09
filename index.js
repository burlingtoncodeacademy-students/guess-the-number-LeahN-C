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

start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number between " + min + " " + "and " + max + " , and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  let compGuess = randomNum(min, max);
  let answer = await ask("Is your number " + compGuess + "? ");

  // Now try and complete the program.
  if (answer === "y") {
    console.log("Woohoo!! ");
    process.exit();
  } else {
    while (answer !== "y") {
      let highLow = await ask("Is it higher or lower? ");
      console.log(highLow);
      compGuess = randomNum(min, max);
      let answer = await ask("Is your number " + compGuess + "? ");
    }
  }
}
