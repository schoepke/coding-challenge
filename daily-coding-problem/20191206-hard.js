// This problem was asked by Stripe.
// Given an array of integers, find the first missing positive integer in linear time and constant space.
// In other words, find the lowest positive integer that does not exist in the array.
// The array can contain duplicates and negative numbers as well.
// For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.
// You can modify the input array in-place.

const assert = require('assert').strict;

function segregate(arr) {
    // move negatives and zeros to left of array
    const len = arr.length;
    let j = 0;
    for (let i = 0; i < len; i++) {
        const el = arr[i];
        if (el <= 0) {
            arr[i] = arr[j];
            arr[j] = el;
            j++;
        }
    }
    return j;
}

function findMissingIntOn(arrIn) {
    // solving this in linear time requires some preparation and array index magic
    const nonInts = segregate(arrIn); // move negs and zeros to the left
    const arr = arrIn.splice(nonInts, arrIn.length); // extract only the ints to work with

    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const el = arr[i];
        const absEl = Math.abs(el); // it may have been flipped before
        if (absEl > len) continue; // can't flip outside array
        // mark el as visited by flipping sign at index el
        let markerEl = arr[absEl - 1];
        if (markerEl > 0) {
            arr[absEl - 1] = -markerEl;
        }
    }
    for (let i = 0; i < len; i++) {
        if (arr[i] > 0) {
            return i + 1;
        }
    }
    return len + 1;
}

function findMissingIntOn2(arr) {
    // console.log(arr);
    // sorting first works, but is O(n log n)
    // plus we need to iterate the integers to find the lowest missing
    // so this solution doesn't fulfill the complexity requirements (time is not linear)
    arr.sort((a, b) => a - b); // Note: arr.sort() would sort lexicographically
    // console.log(arr);
    const max = arr[arr.length - 1];
    let lowestCandidate = max + 1;
    for (let i = 1; i < max; i++) {
        if (!arr.includes(i)) {
            lowestCandidate = i;
            break;
        }
    }
    return lowestCandidate;
}

function main() {
    const arr = [3, 4, -1, 1];
    // const arr = [3, 2, 0];
    const missing = findMissingIntOn([...arr]);
    const missingOn2 = findMissingIntOn2([...arr]);
    console.log(missing, missingOn2);
    assert.equal(missing, missingOn2);
    assert.equal(missing, 2);
    // assert.equal(missing, 1);
}

function* makeIntRangeIterator(start = 1, end = 101, step = 1, random = false) {
    for (let i = start; i < end; i += step) {
        yield random ? Math.floor(Math.random() * (end - 1)) + 1 : i;
    }
}

function test(num = 100, reps = 1) {
    const arr = [];
    for (let value of makeIntRangeIterator(1, num + 1, 1, true)) {
        arr.push(value);
    }
    const randomIndex = Math.floor(Math.random() * num);
    arr[randomIndex] = -42;
    // console.log(arr);
    let missing, missingOn2;
    console.time('On');
    for (let i = 0; i < reps; i++) {
        missing = findMissingIntOn([...arr]);
    }
    console.timeEnd('On');
    console.time('On2');
    for (let i = 0; i < reps; i++) {
        missingOn2 = findMissingIntOn2([...arr]);
    }
    console.timeEnd('On2');
    console.log(missing, missingOn2);
    assert.equal(missing, missingOn2);
    // assert.equal(missing, randomIndex + 1); // only for non-random int range

}

main();
// for (let i = 0; i < 1000; i++) {
//     test(1000, 1000);
// }
