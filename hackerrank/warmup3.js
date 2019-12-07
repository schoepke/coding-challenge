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
function jumpingOnClouds(c) {
    if (c.length <= 3) {
        // since it's always possible to win the game, plus first and last clouds are 0
        // only one jump is needed for 2 or 3 clouds total
        return 1;
    }
    if (c.length === 4) {
        // always needs 2 jumps for cases 0000 0100 0010 (0110 is not winnable)
        return 2;
    }
    // general case, using recursion
    let end = c.length - 1;
    function jumpFrom(pos) {
        if (pos === end) return 0; // reached the end
        if (pos === end - 1) return 1; // need one last jump
        const nextCloud = c[pos + 1];
        if (nextCloud === 1) {
            // jump 2
            return 1 + jumpFrom(pos + 2);
        } else {
            // 0 -> look ahead for another 0 to make 2-jump
            const nextNextCloud = c[pos + 2];
            if (nextNextCloud === 0) {
                // jump 2
                return 1 + jumpFrom(pos + 2);
            } else {
                // can only jump 1
                return 1 + jumpFrom(pos + 1);
            }
        }
    };
    return jumpFrom(0);
}

function main() {
    const ws = fs.createWriteStream('out.txt');

    const n = parseInt(readLine(), 10);
    // const n = 7;

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));
    // const c = [0, 0, 1, 0, 0, 1, 0];

    let result = jumpingOnClouds(c);
    console.log(result);
    ws.write(result + "\n");
    ws.end();
}