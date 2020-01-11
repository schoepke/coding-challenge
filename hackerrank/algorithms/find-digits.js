// An integer d is a divisor of an integer n if the remainder of n/d = 0.
// Given an integer, for each digit that makes up the integer determine whether it is a divisor.
// Count the number of divisors occurring within the integer.
// Note: Each digit is considered to be unique, so each occurrence of the same digit should be counted
// (e.g. for n = 111, 1 is a divisor of 111 each time it occurs so the answer is 3).

// Function Description
// Complete the findDigits function in the editor below.
// It should return an integer representing the number of digits of d that are divisors of d.

// findDigits has the following parameter(s):
//   * n: an integer to analyze

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the findDigits function below.
function findDigits(n) {
    const digits = n.toString().split('').map(s => parseInt(s, 10));
    const divisors = digits.filter(i => i !== 0 && (i === 1 || n % i === 0));
    return divisors.length;
}

function mainInteractive() {
    const ws = fs.createWriteStream('out.txt');

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        let result = findDigits(n);

        ws.write(result + "\n");
    }

    ws.end();
}

function main() {
    mainInteractive();
    // const n = 1012;
    // let result = findDigits(n);
    // console.log('result:', result);
}