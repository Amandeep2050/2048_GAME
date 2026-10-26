const defaultValues = [2, 4];

function randomBetween(lower, upper) {
    return Math.floor(lower + Math.random() * (upper - lower));
}

function fill2DArr(noOfTiles, defaultValue) {
    const defaultArr = [];
    for (let i = 0; i < noOfTiles; i++) {
        const arr = new Array(noOfTiles).fill(defaultValue);
        defaultArr.push(arr);
    }
    return defaultArr;
}

function createTiles(noOfTiles) {
    const Tiles = fill2DArr(noOfTiles, 0);
    const rowOfFirstDefault = randomBetween(0, noOfTiles);
    const colOfFirstDefault = randomBetween(0, noOfTiles);
    const rowOfSecondDefault = randomBetween(0, noOfTiles);
    const colOfSecondDefault = randomBetween(0, noOfTiles);

    Tiles[rowOfFirstDefault][colOfFirstDefault] = defaultValues[randomBetween(0, 2)];
    Tiles[rowOfSecondDefault][colOfSecondDefault] = defaultValues[randomBetween(0, 2)];

    return Tiles;
}

function getZeroCoords(Tiles) {
    const arrOfZeroCoords = [];

    for (let i = 0; i < Tiles.length; i++) {
        for (let j = 0; j < Tiles.length; j++) {
            if (Tiles[i][j] === 0) arrOfZeroCoords.push([i, j]);
        }
    }

    return arrOfZeroCoords;
}

function addRandomValue(Tiles) {
    const zeroCoords = getZeroCoords(Tiles);
    const coord = zeroCoords[randomBetween(0, zeroCoords.length)];
    Tiles[coord[0]][coord[1]] = defaultValues[randomBetween(0, 2)];
}

function are2dArrayEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if (arr1[i][j] !== arr2[i][j]) return false;
        }
    }

    return true;
}

function updateTiles(tileConfigs, formatedTiles) {
    if (!are2dArrayEqual(tileConfigs.Tiles, formatedTiles)) {
        console.log("updated");
        tileConfigs.Tiles = formatedTiles;
        addRandomValue(tileConfigs.Tiles);
    }
}

module.exports = {
    createTiles,
    updateTiles,
}