// Monica wants to buy a keyboard and a USB drive from her favorite electronics store.
// The store has several models of each.
// Monica wants to spend as much as possible for the 2 items, given her budget.

// Given the price lists for the store's keyboards and USB drives, and Monica's budget,
// find and print the amount of money Monica will spend.
// If she doesn't have enough money to both a keyboard and a USB drive, print -1 instead.
// She will buy only the two required items.

// Complete the getMoneySpent function in the editor below.
// It should return the maximum total price for the two items within Monica's budget,
// or -1 if she cannot afford both items.

// getMoneySpent has the following parameter(s):
//   * keyboards: an array of integers representing keyboard prices
//   * drives: an array of integers representing drive prices
//   * b: the units of currency in Monica's budget

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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the getMoneySpent function below.
 */
function getMoneySpent(keyboards, drives, b) {
    let max_k_index = -1;
    let max_sum = -1;
    let max_d_index = -1;
    for (let i = 0; i < keyboards.length; i++) {
        const k = keyboards[i];
        if (k > b) continue;
        // console.log('affordable keyboard candidate:', i, '->', k);
        for (let j = 0; j < drives.length; j++) {
            const d = drives[j];
            if (d > b) continue;
            // console.log('affordable drive candidate:', j, '->', d);
            const sum = k + d;
            if (sum > b) continue;
            console.log('affordable combo:', i, ',', j, '=>', k, '+', d, '=', sum);
            if (sum > max_sum) {
                max_sum = sum;
                max_k_index = i;
                max_d_index = j;
                console.log('max affordable combo:', max_k_index, ',', max_d_index, '=>', k, '+', d, '=', max_sum);
            }
        }
    }
    if (max_sum === -1) return -1; // can't find any keyboard+drive combo that fits the budget
    return keyboards[max_k_index] + drives[max_d_index];
}

function mainInteractive() {
    const ws = fs.createWriteStream('out.txt');

    const bnm = readLine().split(' ');

    const b = parseInt(bnm[0], 10);

    const n = parseInt(bnm[1], 10);

    const m = parseInt(bnm[2], 10);

    const keyboards = readLine().split(' ').map(keyboardsTemp => parseInt(keyboardsTemp, 10));

    const drives = readLine().split(' ').map(drivesTemp => parseInt(drivesTemp, 10));

    /*
     * The maximum amount of money she can spend on a keyboard and USB drive, or -1 if she can't purchase both items
     */

    let moneySpent = getMoneySpent(keyboards, drives, b);

    ws.write(moneySpent + "\n");

    ws.end();
}

function main() {
    mainInteractive();
    // const b = 10;
    // const keyboards = [3, 1];
    // const drives = [5, 2, 8];
    // const b = 5;
    // const keyboards = [];
    // const drives = [];
    // let moneySpent = getMoneySpent(keyboards, drives, b);
    // console.log('moneySpent:', moneySpent);
}
