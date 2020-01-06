// see ../warmup3.js for the original challenge with simpler premise

// Aerith is playing a cloud hopping game.
// In this game, there are sequentially numbered clouds that can be thunderheads or cumulus clouds.
// Her character must jump from cloud to cloud until it reaches the start again.

// To play, Aerith is given an array of clouds, c and an energy level e = 100.
// She starts from c[0] and uses 1 unit of energy to make a jump of size k to cloud c[(i+k)%n].
// If Aerith lands on a thundercloud, c[i] = 1, her energy (e) decreases by 2 additional units.
// The game ends when Aerith lands back on cloud 0.
// If Aerith is at c[n-1] and jumps 1, she will arrive at c[0].

// Given the values of n, k, and the configuration of the clouds as an array c,
// can you determine the final value of e after the game ends?

// Function Description
// Complete the jumpingOnClouds function in the editor below.
// It should return an integer representing the energy level remaining after the game.
// jumpingOnClouds has the following parameter(s):
//   * c: an array of integers representing cloud types
//   * k: an integer representing the length of one jump

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

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c, k) {
    const n = c.length;
    let e = 100;
    let index = 0;
    do {
        index = (index + k) % n; // jump k steps, circling back to array start if necessary
        e = e - 1 - c[index] * 2; // subtract 1 and 2 if c[index] is 1 i.e. a thunder cloud
    } while (e >= 0 && index !== 0);

    return e;
}

function mainInteractive() {
    const ws = fs.createWriteStream('out.txt');

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c, k);

    ws.write(result + "\n");

    ws.end();
}

function main() {
    mainInteractive();
    // const c = [0, 0, 1, 0, 0, 1, 1, 0];
    // const k = 2;
    // let result = jumpingOnClouds(c, k); // should be 92
    // console.log('result:', result);
}