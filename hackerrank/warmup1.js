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

// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
    const countsMap = ar.reduce((map, v) => {
        map[v] = map[v] === undefined ? 1 : map[v] + 1;
        return map;
    }, {});
    console.log('counts', countsMap);
    const counts = Object.values(countsMap);
    console.log(counts);
    const pairs = counts.reduce((pairs, count) => pairs + Math.floor(count / 2), 0);
    return pairs;
}

async function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const ws = fs.createWriteStream('out.txt');

    const n = parseInt(readLine(), 10);
    // const n = 9;

    const ar = readLine().split(' ').map(arTemp => parseInt(arTemp, 10));
    // const ar = [10, 20, 20, 10, 10, 30, 20, 10, 50];

    let result = sockMerchant(n, ar);
    console.log(result);
    ws.write(result + "\n");
    ws.end();
}
  