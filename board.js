const r = require("raylib");

function createCell(boardConfig, col, row) {
    const x = col * (boardConfig.cellSize + boardConfig.lineThickness) + boardConfig.startPos.x;
    const y = row * (boardConfig.cellSize + boardConfig.lineThickness) + boardConfig.startPos.y;
    return { x, y, width: boardConfig.cellSize, height: boardConfig.cellSize };
}

function createBoard(boardConfig) {
    const board = [];

    for (let row = 0; row < boardConfig.numberOfRows; row++) {
        const boardRow = [];
        for (let col = 0; col < boardConfig.numberOfRows; col++) {
            const cell = createCell(boardConfig, col, row);
            boardRow.push(cell);
        }
        board.push(boardRow);
    }
    return board;
}

function drawCell(board, row, col) {
    r.DrawRectangleLinesEx(board[row][col], 2, r.BLACK);
}

function drawCellValue(tilesConfig, row, col) {
    if (tilesConfig.Tiles[row][col] !== 0) {
        r.DrawText(`${tilesConfig.Tiles[row][col]}`, board[row][col].x + tilesConfig.posPercent.x, board[row][col].y + tilesConfig.posPercent.y, tilesConfig.fontSize, r.BLACK);
    }
}

function drawBoard(board, tilesConfig) {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            drawCell(board, row, col);
            drawCellValue(tilesConfig, row, col);
        }
    }
}

module.exports = {
    createBoard,
    drawBoard,
}