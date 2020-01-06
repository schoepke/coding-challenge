// Two cats and a mouse are at various positions on a line.
// You will be given their starting positions.
// Your task is to determine which cat will reach the mouse first,
// assuming the mouse doesn't move and the cats travel at equal speed.
// If the cats arrive at the same time, the mouse will be allowed to move and it will escape while they fight.

// You are given q queries in the form of x, y, and z
// representing the respective positions for cats A and B, and for mouse C.
// Complete the function catAndMouse to return the appropriate answer to each query,
// which will be printed on a new line.

// If cat A catches the mouse first, print "Cat A".
// If cat B catches the mouse first, print "Cat B".
// If both cats reach the mouse at the same time,
// print "Mouse C" as the two cats fight and mouse escapes.

// Function Description

// Complete the catAndMouse function in the editor below.
// It should return one of the three strings as described.
// catAndMouse has the following parameter(s):
//   * x: an integer, Cat A's position
//   * y: an integer, Cat B's position
//   * z: an integer, Mouse C's position

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

// Complete the catAndMouse function below.
function catAndMouse(x, y, z) {
    const distAM = Math.abs(z - x);
    const distMB = Math.abs(y - z);
    if (distAM < distMB) return 'Cat A';
    else if (distAM > distMB) return 'Cat B';
    else return 'Mouse C';
}

function mainInteractive() {
    const ws = fs.createWriteStream('out.txt');

    const q = parseInt(readLine(), 10);
    // console.log(q);

    for (let qItr = 0; qItr < q; qItr++) {
        const xyz = readLine().split(' ');

        const x = parseInt(xyz[0], 10);

        const y = parseInt(xyz[1], 10);

        const z = parseInt(xyz[2], 10);

        let result = catAndMouse(x, y, z);
        // console.log(result);

        ws.write(result + "\n");
    }

    ws.end();
}

function main() {
    mainInteractive();
    // const queries = [
    //     [1, 2, 3],
    //     [1, 3, 2],
    //     [84, 17, 18],
    // ];
    // queries.forEach(q => console.log(catAndMouse(...q)));
}