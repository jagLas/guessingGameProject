const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function randomInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//Defines target number
secretNumber = randomInRange(0,100);


//function to evaluate the number and respond with a hint or closes if correct.
const checkGuess = (num) => {
    if (num > secretNumber) {
        console.log('Too high');
        askGuess();

    } else if (num < secretNumber) {
        console.log('Too low');
        askGuess();

    } else {
        console.log('Correct!');
        console.log('You win!');
        rl.close();
    }
};

const askGuess = () => {
    rl.question('Enter a guess: ', checkGuess)
}

// askGuess()