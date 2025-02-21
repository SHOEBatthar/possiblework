const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, x) {
    let result = 0;
    let n = points.length;

    for (let i = 0; i < n; i++) {
        let term = points[i][1];
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (x - points[j][0]) / (points[i][0] - points[j][0]);
            }
        }
        result += term;
    }
    return result;
}

function findSecret(filename) {
    let data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    let points = [];
    let k = data.keys.k;
    
    for (let key in data) {
        if (key === "keys") continue;
        let x = parseInt(key);
        let y = decodeValue(parseInt(data[key].base), data[key].value);
        points.push([x, y]);
    }

    points.sort((a, b) => a[0] - b[0]);
    return Math.round(lagrangeInterpolation(points.slice(0, k), 0));
}

const file1 = "testcase1.json"; // Replace with actual file name
const file2 = "testcase2.json"; // Replace with actual file name
console.log("Secret for Test Case 1:", findSecret(file1));
console.log("Secret for Test Case 2:", findSecret(file2));
