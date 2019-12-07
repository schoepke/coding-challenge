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

// Complete the countingValleys function below.
function countingValleys(n, s) {
    if (n === 0) return 0;
    const steps = s.split('');
    console.log('steps', steps);
    const res = steps.reduce((state, step, i, a) => {
        // console.log('state pre:', state);
        if (step === 'U') {
            state.level++;
            if (state.level === 0) {
                // valley completed
                state.valleys++;
            }
        } else if (step === 'D') {
            state.level--;
        } else throw Error('invalid step kind');
        console.log('state post', state);
        return state;
    }, { level: 0, valleys: 0 });
    return res.valleys;
}

function main() {
    const ws = fs.createWriteStream('out.txt');

    const n = parseInt(readLine(), 10);
    // const n = 8;

    const s = readLine();
    // const s = 'DUDDUDUU';

    let result = countingValleys(n, s);
    console.log('result:', result);
    ws.write(result + "\n");
    ws.end();
}
