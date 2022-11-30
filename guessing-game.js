const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function randomInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//Defines target number
secretNumber = 0;
numAttempts = 5;


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
    numAttempts--;  //decreases num of turns remaining

    if (numAttempts >= 0) {
    rl.question('Enter a guess: ', checkGuess)

    //ends the game if no attempts are left.
    } else {
        console.log('Game over. You lose!');
        rl.close();
    }
}

function askLimit() {
    rl.question('Enter number of turns: ', turns => {
        numAttempts = Number(turns);
        console.log('You have chosen ' + turns + ' turns.');
        askRange()
    })
}

function askRange() {
    rl.question('Enter a min number: ', (min) => {
        rl.question('Enter a max number: ', (max) => {

            secretNumber = randomInRange(Number(min), Number(max)); //sets secret number to random int

            //rates the difficulty of the parameters
            const difficulty = findDifficulty(min, max, numAttempts);

            //prints difficulty and min and max
            console.log(`This game should be ${difficulty}. Good luck!`)
            console.log(`I'm thinking of a number between ${min} and ${max}...`)

            askGuess();
        })
    })
};

function findDifficulty(min, max, turns) {
    min = Number(min);
    max = Number(max);
    let range = max - min;
    let avgTurns = 0;

    //divides decision space by two and counts how many times it needs to be halved to find solution.
    while (range > 1) {
        range /= 2;
        avgTurns ++;
    }

    //rates difficulty by comparing avgTurns to completion
    if (turns < avgTurns) {
        return 'harder than average'
    } else if ( turns > avgTurns) {
        return 'easier than average'
    } else {
        return 'average difficulty'
    }
}

askLimit();