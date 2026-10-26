function shouldMergeRight(result, shiftConfigs, i) {
    const isZeroIndexInvalid = shiftConfigs.indexOfZero < result.length - 1;
    const areAdjucentsEqual = result[shiftConfigs.indexOfZero + 1] === result[i];
    return !shiftConfigs.isAdditionHappened && isZeroIndexInvalid && areAdjucentsEqual;
}

function moveOrMergeElementRight(result, shiftConfigs, i) {
    if (shouldMergeRight(result, shiftConfigs, i)) {
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
            moveOrMergeElementRight(result, shiftConfigs, i);
            result[i] = 0;
        }
    }
    return result;
}

function shouldMergeLeft(result, shiftConfigs, i) {
    const isZeroIndexInvalid = shiftConfigs.indexOfZero > 0;
    const areAdjucentsEqual = result[shiftConfigs.indexOfZero - 1] === result[i];
    return !shiftConfigs.isAdditionHappened && isZeroIndexInvalid && areAdjucentsEqual;
}

function moveOrMergeElementLeft(result, shiftConfigs, i) {
    if (shouldMergeLeft(result, shiftConfigs, i)) {
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
            moveOrMergeElementLeft(result, shiftConfigs, i);
            result[i] = 0;
        }
    }
    return result;
}

function getCol(arr, colNumber) {
    let col = [];
    for (let i = 0; i < arr.length; i++) {
        col.push(arr[i][colNumber]);
    }
    return col;
}

function transpose(arr) {
    const transposeArr = [];

    for (let i = 0; i < arr.length; i++) {
        const rowArr = [];
        for (let j = 0; j < arr[i].length; j++) {
            rowArr.push(arr[j][i]);
        }
        transposeArr.push(rowArr);
    }
    return transposeArr;
}

function upShift(arr) {
    const result = [];

    for (let i = 0; i < arr[0].length; i++) {
        const colElements = getCol(arr, i);
        const leftShift = shiftElesLeft(colElements);
        result.push(leftShift);
    }

    return transpose(result);
}

function downShift(arr) {
    const result = [];

    for (let i = 0; i < arr[0].length; i++) {
        const colElements = getCol(arr, i);
        const rightShift = shiftElesRight(colElements);
        result.push(rightShift);
    }

    return transpose(result);
}

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

module.exports = {
    upShift,
    downShift,
    leftShift,
    rightShift,
}