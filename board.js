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

function drawBoard(board, tilesConfig) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (tilesConfig.Tiles[row][col] === 0) {
                r.DrawRectangleLinesEx(board[row][col], 2, r.BLACK);
            } else {
                r.DrawRectangleLinesEx(board[row][col], 2, r.BLACK);
                r.DrawText(`${tilesConfig.Tiles[row][col]}`, board[row][col].x + tilesConfig.posPercent.x, board[row][col].y + tilesConfig.posPercent.y, tilesConfig.fontSize, r.BLACK);
            }
        }
    }
}

module.exports = {
    createBoard,
    drawBoard,
}