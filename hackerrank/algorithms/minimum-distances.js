// We define the distance between two array values as the number of indices between the two values.
// Given a, find the minimum distance between any pair of equal elements in the array.
// If no such value exists, print -1.

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

// Complete the minimumDistances function below.
function minimumDistances(a) {
    let minDiff = a.length;
    for (let i = 0; i < a.length; i++) {
        const next = a.indexOf(a[i], i + 1); // scan for same value to the right of current position
        if (next !== -1) {
            const diff = next - i;
            if (diff < minDiff) minDiff = diff;
        }
    }
    return minDiff === a.length ? -1 : minDiff;
}

function mainInteractive() {
    const ws = fs.createWriteStream('out.txt');

    const n = parseInt(readLine(), 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    let result = minimumDistances(a);

    ws.write(result + "\n");

    ws.end();
}

function main() {
    mainInteractive();
    // const a = [7, 1, 3, 4, 1, 7];
    // let result = minimumDistances(a);
    // console.log('result:', result);
}
