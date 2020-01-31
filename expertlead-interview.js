// Design an application that, given a set of coordinates [(x1,y1), .., (xn,yn)], determines:
//   - the two closest points between each other
//   - the two most distant points between each other
// Use your knowledge of clean and maintainable code to create an application with automated tests.
// Start with tests or implementation, whatever is better for you.

const calculateDistance = (coord1, coord2) => {
    return Math.sqrt(Math.pow(coord2.x - coord1.x, 2) + Math.pow(coord2.y - coord1.y, 2));
}

const calculateDistance2 = (coord1, coord2) => {
    return Math.pow(coord2.x - coord1.x, 2) + Math.pow(coord2.y - coord1.y, 2);
}

const calculateDistances = coords => {
    let distances = [];
    coords.forEach((coord1, index) => {
        coords.forEach((coord2, index2) => {
            if (index2 > index) {
                // we can skip the sqrt, as the squared distance is enough to determine the min/max
                const dist = calculateDistance2(coord1, coord2);
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

const main = () => {
    const coords = [
        { x: 1, y: 4 },
        { x: 4, y: 4 },
        { x: 3, y: 2 },
        { x: 5, y: 1 },
    ];
    const distances = calculateDistances(coords);
    return determineMinMaxDistance(distances);
}

const res = main();
console.log(res);
