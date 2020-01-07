// Lexicographical order is often known as alphabetical order when dealing with strings.
// A string is greater than another string if it comes later in a lexicographically sorted list.
// Given a word, create a new word by swapping some or all of its characters.
// This new word must meet two criteria:
//   * It must be greater than the original word
//   * It must be the smallest word that meets the first condition
// For example, given the word w = abcd, the next largest word is abdc.

// Function Description
// Complete the biggerIsGreater function in the editor below.
// It should return the smallest lexicographically higher string possible from the given string or "no answer".
// biggerIsGreater has the following parameter(s):
//   * w: a string, with max length 100 and containing only letters in the range ascii[a..z].

'use strict';

const fs = require('fs');
const { performance } = require('perf_hooks');

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

function isSortedInverse(str) {
    if (str.length === 1) return true;
    return str[0] >= str[1] && isSortedInverse(str.slice(1));
}

function stringPermutations(str) {
    if (str.length === 1) return [str];
    if (str.length === 2) return str[1] === str[0] ? [str] : [str, str[1] + str[0]];
    console.log('permutating ', str);
    let letters = [];
    return str.split('').reduce((acc, letter, i) => {
        if (!letters.includes(letter)) {
            letters.push(letter);
            return acc.concat(stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val));
        } else console.log('skipping', letter, 'because we already have this subtree');
        return acc;
    }, []);
}

function biggerIsGreaterBruteForce(w) {
    // generate all letter permutations (deduplicated) and sort them lexicographically
    const permutations = stringPermutations(w).sort();
    console.log('permutations:', permutations.length, permutations);
    // look for w
    if (permutations.length > 1) {
        const i = permutations.indexOf(w);
        // must be lexicographically greater
        // if w is at end of the sorted array there is no answer
        if (i < permutations.length - 1) {
            // must be lexicographically different
            // this is always the case because we have no dupes
            return permutations[i + 1];
        }
    }
    return 'no answer';
}

const bruteForceLimit = 2;

function biggerIsGreaterPermutation(w) {
    if (isSortedInverse(w)) return 'no answer';
    if (w.length <= bruteForceLimit + 1) return biggerIsGreaterBruteForce(w);
    let answer = 'no answer';
    let head, tail, tailTip;
    let len = bruteForceLimit;
    while (answer === 'no answer' && ++len <= w.length) {
        const newLetter = w[w.length - len];
        if (newLetter === tailTip) continue // same letter again won't change answer
        else tailTip = newLetter;
        head = w.slice(0, w.length - len);
        tail = w.slice(w.length - len);
        console.log('trying suffix method:', head, tail);
        answer = biggerIsGreaterBruteForce(tail);
        console.log('suffix res:', answer);
    }
    if (answer !== 'no answer') answer = head + answer;
    return answer;
}

function biggerIsGreaterScan(str) {
    let w = str.split('');
    // Find non-increasing suffix
    let i = w.length - 1;
    let j = i;
    let k = i;
    while (i > 0 && w[i - 1] >= w[i]) {
        i--;
    }
    if (i > 0) {
        // find swap element, which is the smallest in the suffix that is bigger than the pivot
        let pivot = w[i - 1];
        while (w[j] <= pivot) {
            j--;
        }
        // swapping these will minimally increase the permutation
        w[i - 1] = w[j];
        w[j] = pivot;
        // reverse the suffix
        while (i < k) {
            const temp = w[i];
            w[i] = w[k];
            w[k] = temp;
            i++;
            k--;
        }
        return w.join('');
    }
    return 'no answer';
}

// Complete the biggerIsGreater function below.
function biggerIsGreater(w) {
    // console.log('working on:', w);
    // return biggerIsGreaterPermutation(w);
    return biggerIsGreaterScan(w);
}

function mainInteractive() {
    let times = [];
    const ws = fs.createWriteStream('out.txt');

    const T = parseInt(readLine(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        let t0 = performance.now();
        let result = biggerIsGreater(w);
        let t1 = performance.now();
        times.push({ word: w, time: t1 - t0 });

        ws.write(result + "\n");
    }

    ws.end();
    console.log(times.sort((a, b) => b.time - a.time).slice(0, 4));
}

function mainTest() {
    const words = [
        // 'ab',
        // 'bb',
        // 'hefg',
        // 'dhck',
        // 'dkhc',
        // 'lmno',
        // 'dcba',
        // 'dcbb',
        // 'abdc',
        // 'adbc',
        // 'abcd',
        // 'fedcbabcdef', // fedcbabcdfe
        // 'zedawdvyyfumwpupuinbdbfndyehircmylbaowuptgmw', // should not crash with heap OOM error
        // 'byrmihg', // gbhimry
        'xvkyxtrrrpobb', // should not be slow, xvobbkprrrtxy
    ];
    words.forEach(word => {
        // console.log(biggerIsGreaterBruteForce(word));
        console.log(biggerIsGreater(word));
    });
}

function main() {
    console.time('all');
    mainInteractive();
    // mainTest();
    console.timeEnd('all');
}
