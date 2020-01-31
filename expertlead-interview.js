// Design an application that, given a set of coordinates [(x1,y1), .., (xn,yn)], determines:
//   - the two closest points between each other
//   - the two most distant points between each other
// Use your knowledge of clean and maintainable code to create an application with automated tests.
// Start with tests or implementation, whatever is better for you.

const calculateDistance = (coord1, coord2) => {
    let distance;
    distance = Math.sqrt(Math.pow(coord2.x - coord1.x, 2) + Math.pow(coord2.y - coord1.y, 2));
    return distance;
}

const main = () => {
    const coords = [
        { x: 1, y: 4 },
        { x: 4, y: 4 },
        { x: 3, y: 2 },
        { x: 5, y: 1 },
    ];

    let distances = [];
    coords.forEach((coord1, index) => {
        coords.forEach((coord2, index2) => {
            if (index2 > index) {
                const d = calculateDistance(coord1, coord2);
                distances.push({ c1: coord1, c2: coord2, dist: d });
            };
        });
    });
    
    const sorted = distances.sort((o1, o2) => o1.dist - o2.dist);
    const shortest = [ sorted[0].c1, sorted[0].c2 ];
    const longest = [ sorted[sorted.length - 1].c1, sorted[sorted.length - 1].c2 ];
    return { shortest, longest };
}

const res = main();
console.log(res);
