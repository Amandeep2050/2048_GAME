function isAdditionRight(result, shiftConfigs, i) {
    const isZeroIndexInvalid = shiftConfigs.indexOfZero < result.length - 1;
    const areAdjucentsEqual = result[shiftConfigs.indexOfZero + 1] === result[i];
    return !shiftConfigs.isAdditionHappened && isZeroIndexInvalid && areAdjucentsEqual;
}

function shiftRight(result, shiftConfigs, i) {
    if (isAdditionRight(result, shiftConfigs, i)) {
        result[shiftConfigs.indexOfZero + 1] += result[i];
        shiftConfigs.isAdditionHappened = true;
        return;
    }

    result[shiftConfigs.indexOfZero] = result[i];
    shiftConfigs.indexOfZero = shiftConfigs.indexOfZero - 1;
    return;
}

function shiftElesRight(arr) {
    const result = arr.slice();
    const shiftConfigs = {
        indexOfZero: -1,
        isAdditionHappened: false,
    }

    for (let i = result.length - 1; i >= 0; i--) {
        if (result[i] === 0 && shiftConfigs.indexOfZero === -1) shiftConfigs.indexOfZero = i;

        else if (shiftConfigs.indexOfZero === -1 && result[i] === result[i - 1]) {
            result[i] = 2 * result[i];
            result[i - 1] = 0;
        }

        if (result[i] !== 0 && shiftConfigs.indexOfZero !== -1) {
            shiftRight(result, shiftConfigs, i);
            result[i] = 0;
        }
    }
    return result;
}

// console.log(shiftElesLeft([0, 0, 2]));
// console.log(shiftElesLeft([2, 2, 2]));
// console.log(shiftElesLeft([8, 8, 2]));
// console.log(shiftElesLeft([1, 0, 9, 4, 4, 0, 8, 4, 4, 0]))

function isAdditionLeft(result, shiftConfigs, i) {
    const isZeroIndexInvalid = shiftConfigs.indexOfZero > 0;
    const areAdjucentsEqual = result[shiftConfigs.indexOfZero - 1] === result[i];
    return !shiftConfigs.isAdditionHappened && isZeroIndexInvalid && areAdjucentsEqual;
}

function shiftLeft(result, shiftConfigs, i) {
    if (isAdditionLeft(result, shiftConfigs, i)) {
        result[shiftConfigs.indexOfZero - 1] += result[i];
        shiftConfigs.isAdditionHappened = true;
        return;
    }

    result[shiftConfigs.indexOfZero] = result[i];
    shiftConfigs.indexOfZero = shiftConfigs.indexOfZero + 1;
    return;
}

function shiftElesLeft(arr) {
    const result = arr.slice();
    const shiftConfigs = {
        indexOfZero: arr.length,
        isAdditionHappened: false,
    };

    for (let i = 0; i < arr.length; i++) {
        if (result[i] === 0 && shiftConfigs.indexOfZero > i) {
            shiftConfigs.indexOfZero = i;
        }

        else if (shiftConfigs.indexOfZero === arr.length && result[i] === result[i + 1]) {
            result[i] = 2 * result[i];
            result[i + 1] = 0;
        }
        if (result[i] !== 0 && shiftConfigs.indexOfZero !== arr.length) {
            shiftLeft(result, shiftConfigs, i);
            result[i] = 0;
        }
    }
    return result;
}


// console.log(shiftElesRight([2, 2, 0]));
// console.log(shiftElesRight([0, 4, 4]));
// console.log(shiftElesRight([8, 0, 0]));
// console.log(shiftElesRight([1, 0, 9, 4, 4, 0, 3, 4, 0, 3]))

function getCol(arr, colNumber) {
    let col = [];
    for (let i = 0; i < arr.length; i++) {
        col.push(arr[i][colNumber]);
    }
    return col;
}

function upShift(arr) {
    const result = arr.slice();

    for (let i = 0; i < arr[0].length; i++) {
        const colElements = getCol(arr, i);
        const leftShift = shiftElesLeft(colElements);

        for (let j = 0; j < arr.length; j++) {
            result[j][i] = leftShift[j];
        }
    }

    return result;
}

// console.log(upShift([[8, 2, 0], [0, 2, 4], [8, 2, 0]]));

function downShift(arr) {
    const result = arr.slice();

    for (let i = 0; i < arr[0].length; i++) {
        const colElements = getCol(arr, i);
        const leftShift = shiftElesRight(colElements);

        for (let j = 0; j < arr.length; j++) {
            result[j][i] = leftShift[j];
        }
    }

    return result;
}

// console.log(downShift([[8, 2, 0], [0, 2, 4], [8, 2, 0]]));

function leftShift(arr) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        const rowEle = [];
        for (let j = 0; j < arr[i].length; j++) {
            rowEle.push(arr[i][j]);
        }
        const leftShift = shiftElesLeft(rowEle);
        result.push(leftShift);
    }

    return result;
}

// console.log(leftShift([[0, 0, 2], [0, 2, 2], [8, 8, 8]]));

function rightShift(arr) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        const rowEle = [];
        for (let j = 0; j < arr[i].length; j++) {
            rowEle.push(arr[i][j]);
        }
        const rightShiftedRow = shiftElesRight(rowEle);
        result.push(rightShiftedRow);
    }

    return result;
}

// console.log(rightShift([[2, 0, 2], [4, 0, 0], [4, 4, 4]]));

module.exports = {
    upShift,
    downShift,
    leftShift,
    rightShift,
}