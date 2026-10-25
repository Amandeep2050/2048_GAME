const r = require("raylib");

function createCell(x, y, size) {
    return { x, y, width: size, height: size };
}

function createBoard(numberOfRows, startPos, size, lineThickness) {
    const board = [];

    for (let row = 0; row < numberOfRows; row++) {
        const arr = [];
        for (let col = 0; col < numberOfRows; col++) {
            const x = col * (size + lineThickness) + startPos.x;
            const y = row * (size + lineThickness) + startPos.y;
            const cell = createCell(x, y, size);
            arr.push(cell);
        }
        board.push(arr);
    }
    return board;
}

function drawBoard(board) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            r.DrawRectangleLinesEx(board[row][col], 2, r.BLACK);
        }
    }
}

module.exports = {
    createBoard,
    drawBoard,
}