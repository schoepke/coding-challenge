// Design an application that, given a set of coordinates [(x1,y1), .., (xn,yn)], determines:
//   - the two closest points between each other
//   - the two most distant points between each other
// Use your knowledge of clean and maintainable code to create an application with automated tests.
// Start with tests or implementation, whatever is better for you.

const assert = require('assert').strict;

const calculateDistance = (coord1, coord2, squared = false) => {
    [coord1, coord2].forEach(c => {
        if (c == null) throw Error('coordinate missing');
        if (c.x == null || c.y == null) throw Error('invalid coordinate');
        if (!Number.isInteger(c.x) || !Number.isInteger(c.y)) throw Error('invalid coordinate point');
    });
    const squaredDist = Math.pow(coord2.x - coord1.x, 2) + Math.pow(coord2.y - coord1.y, 2);
    return squared ? squaredDist : Math.sqrt(squaredDist);
}

const calculateDistances = coords => {
    if (coords == null) throw new Error('coordinates array missing');
    if (coords.length < 2) throw new Error('need at least 2 coordinates');
    let distances = [];
    coords.forEach((coord1, index) => {
        coords.forEach((coord2, index2) => {
            if (index2 > index) {
                // we can skip the sqrt, as the squared distance is enough to determine the min/max
                const dist = calculateDistance(coord1, coord2);
                distances.push({ coord1, coord2, dist });
            };
        });
    });
    return distances;
}

const determineMinMaxDistance = distances => {
    const sorted = distances.sort((o1, o2) => o1.dist - o2.dist);
    const maxIndex = sorted.length - 1;
    const shortest = [ sorted[0].coord1, sorted[0].coord2 ];
    const longest = [ sorted[maxIndex].coord1, sorted[maxIndex].coord2 ];
    return { shortest, longest };
}

const coords = [
    { x: 1, y: 4 },
    { x: 4, y: 4 },
    { x: 3, y: 2 },
    { x: 5, y: 1 },
];

const main = () => {
    const distances = calculateDistances(coords);
    return determineMinMaxDistance(distances);
}

const res = main();
console.log(res);

const tests = () => {
    console.log('running tests ...');
    assert.equal(calculateDistance(coords[0], coords[1]), 3);
    assert.equal(calculateDistance(coords[0], coords[1], false), 3);
    assert.equal(calculateDistance(coords[0], coords[1], true), 9);
    assert.throws(() => calculateDistance(null, coords[1]), new Error('coordinate missing'));
    assert.throws(() => calculateDistance(coords[0], null), new Error('coordinate missing'));
    assert.throws(() => calculateDistance({ x: 0, foo: 1 }, { baz: 0, y: 1 }), new Error('invalid coordinate'));
    assert.throws(() => calculateDistance({ x: 0, y: NaN }, { x: 1, y: 1 }), new Error('invalid coordinate point'));
    assert.throws(() => calculateDistance({ x: 0, y: 1 }, { x: false, y: '1' }), new Error('invalid coordinate point'));

    const distances = calculateDistances(coords);
    assert.equal(distances.length, 6);
    assert.deepEqual(distances[0], { coord1: { x: 1, y: 4 }, coord2: { x: 4, y: 4 }, dist: 3 });
    assert.throws(() => calculateDistances(null), new Error('coordinates array missing'));
    assert.throws(() => calculateDistances([]), new Error('need at least 2 coordinates'));
    assert.throws(() => calculateDistances([{ x: 0, y: 0 }]), new Error('need at least 2 coordinates'));
}
tests();
