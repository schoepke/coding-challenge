// Good morning! Here's your coding interview problem for today.
// This problem was recently asked by Google.
// Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
// For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.
// Bonus: Can you do this in one pass?

function addsUp(summands, k) {
    if (summands.length < 2) return false;
    const diffs = summands.map(s => k - s); // [7, 2, 14, 10]
    return summands.some(e => diffs.includes(e));
}

function addsUpAllSums(summands, k) {
    if (summands.length < 2) return false;
    let sums = []; // [25, 13, 17, 18, 22, 10]
    for (let i = 0; i < summands.length; i++) {
        const s1 = summands[i];
        for (let j = 0; j < summands.length; j++) {
            if (j <= i) continue;
            sums.push(s1 + summands[j]);
        }
    }
    return sums.includes(k);
}

const a = [10, 15, 3, 7];
const k = 17;
console.log('adds up:', addsUpAllSums(a, k));
// performance test: map+some is faster
// const hrstart = process.hrtime();
// for (let index = 0; index < 1e6; index++) {
//     addsUp(a, k);
// }
// const hrend = process.hrtime(hrstart);
// console.log('Execution time (hr): %dms', (hrend[1] * 1e-6).toFixed(3));
// const hrstart2 = process.hrtime();
// for (let index = 0; index < 1e6; index++) {
//     addsUpAllSums(a, k)
// }
// const hrend2 = process.hrtime(hrstart2);
// console.log('Execution time (hr): %dms', (hrend2[1] * 1e-6).toFixed(3));
