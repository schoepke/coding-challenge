// Karl has an array of integers.
// He wants to reduce the array until all remaining elements are equal.
// Determine the minimum number of elements to delete to reach his goal.

// For example, if his array is [1,2,2,3], we see that he can delete the 2 elements 1 and 3 leaving [2,2].
// He could also delete both twos and either the 1 or the 3, but that would take 3 deletions.
// The minimum number of deletions is 2.

// Complete the equalizeArray function in the editor below.
// It must return an integer that denotes the minimum number of deletions required.
// equalizeArray has the following parameter(s):
//   * arr: an array of integers

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

function countElements(arr, elem) {
    return arr.reduce((count, e) => e === elem ? ++count : count, 0);
}

// Complete the equalizeArray function below.
function equalizeArray(arr) {
    const n = arr.length;
    let minToRemove = n;
    let processed = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (processed.includes(element)) continue;
        processed.push(element);
        const count = countElements(arr, element);
        const toRemove = n - count;
        if (toRemove < minToRemove) minToRemove = toRemove;
    }
    return minToRemove;
}

function mainInteractive() {
    const ws = fs.createWriteStream('out.txt');

    const n = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = equalizeArray(arr);

    ws.write(result + "\n");

    ws.end();
}

function main() {
    mainInteractive();
    // const arr = [3, 3, 2, 1, 3];
    // let result = equalizeArray(arr);
    // console.log('result:', result);
}
