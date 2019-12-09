// This problem was asked by Uber.
// Given an array of integers, return a new array such that
// each element at index i of the new array is the product of all the numbers in the original array except the one at i.
// For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24].
// If our input was [3, 2, 1], the expected output would be [2, 3, 6].
// Follow-up: what if you can't use division?

const assert = require('assert').strict;

function foldDiv(arr) {
    const product = arr.reduce((acc, v) => acc * v, 1);
    return arr.map(el => product / el);
}

function foldNoDiv(arr) {
    return arr.map((el, i) => {
        return arr.reduce((acc, v, j) => j === i ? acc : acc * v, 1); // skip the value at index in the reducer
    });
}

function main(arr, exp) {
    const res = foldDiv(arr);
    if (exp) assert.deepStrictEqual(res, exp);
    return res;
}

const arr = [1, 2, 3, 4, 5];
console.log('result:', main(arr, [120, 60, 40, 30, 24]));
// performance test: foldDiv is 3x faster
// console.time('timer');
// for (let index = 0; index < 1e3; index++) {
//     main(arr);
// }
// console.timeEnd('timer');
