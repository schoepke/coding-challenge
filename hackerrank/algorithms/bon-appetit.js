// Anna and Brian are sharing a meal at a restaurant and they agree to split the bill equally.
// Brian wants to order something that Anna is allergic to though,
// and they agree that Anna won't pay for that item.
// Brian gets the check and calculates Anna's portion.
// You must determine if his calculation is correct.

// For example, assume the bill has the following prices: bill = [2,4,6].
// Anna declines to eat item k = bill[2] which costs 6.
// If Brian calculates the bill correctly, Anna will pay (2+4)/2 = 3.
// If he includes the cost of bill[2], he will calculate (2+4+6)/2 = 6.
// In the second case, he should refund 3 to Anna.
// The amount of money due Anna will always be an integer.

// Function Description
// Complete the bonAppetit function in the editor below.
// It should print "Bon Appetit" if the bill is fairly split.
// Otherwise, it should print the integer amount of money that Brian owes Anna.
// bonAppetit has the following parameter(s):
//   * bill: an array of integers representing the cost of each item ordered
//   * k: an integer representing the zero-based index of the item Anna doesn't eat
//   * b: the amount of money that Anna contributed to the bill

'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function calculateFairShare(bill, k) {
    const sumWithoutK = bill.reduce((sum, v, i) => i === k ? sum : sum + v, 0);
    return sumWithoutK / 2;
}

// Complete the bonAppetit function below.
function bonAppetit(bill, k, b) {
    const bFair = calculateFairShare(bill, k);
    if (b === bFair) {
        console.log('Bon Appetit');
    } else {
        console.log(b - bFair);
    }
}

function mainInteractive() {
    const nk = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const bill = readLine().replace(/\s+$/g, '').split(' ').map(billTemp => parseInt(billTemp, 10));

    const b = parseInt(readLine().trim(), 10);

    bonAppetit(bill, k, b);
}

function main() {
    mainInteractive();
    // const n = 4;
    // const k = 1;
    // const bill = [3, 10, 2, 9];
    // const bCharged = 12;
    // bonAppetit(bill, k, bCharged);
}