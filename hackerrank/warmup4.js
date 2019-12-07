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

function countLetter(s, letter) {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        const l = s[i];
        if (l == letter) {
            count++;
        }
    }
    return count;
}

function stupidRepeat(s, n) {
    let a = 0;
    const len = s.length;
    let srep;
    if (len < n) {
        let reps = Math.ceil(n / len);
        srep = s.repeat(reps);
    } else srep = s;
    const letters = srep.substring(0, n); // first n letters
    return countLetter(letters, 'a');
};

function cleverRepeat(s, n) {
    const len = s.length;
    let reps = 0;
    let rem;
    if (len < n) {
        reps = Math.floor(n / len);
        rem = n % len;
    } else {
        rem = n;
    }
    const aRep = countLetter(s, 'a');
    const remString = s.substring(0, rem);
    const aRem = countLetter(remString, 'a');
    return aRep * reps + aRem;
};

// Complete the repeatedString function below.
function repeatedString(s, n) {
    const maxStringLen = Math.pow(2, 52) - 1;
    try {
        return stupidRepeat(s, n);
    } catch (e) {
        console.log(e.name, ':', e.message);
        console.log('Note: max ECMAScript 2016 string length is', maxStringLen, 'but other implementation restrictions may apply');
        console.log('falling back to clever method ...');
        return cleverRepeat(s, n);
    }
}

function main() {
    const ws = fs.createWriteStream('out.txt');

    const s = readLine();
    // const s = 'aba';

    const n = parseInt(readLine(), 10);
    // const n = 10;

    let result = repeatedString(s, n);
    console.log(result);
    ws.write(result + "\n");
    ws.end();
}
