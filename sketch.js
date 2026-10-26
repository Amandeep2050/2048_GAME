const r = require("raylib");
const b = require("./board");
const t = require("./tiles");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const screen = {
        WIDTH: 500,
        HEIGHT: 500,
        TITLE: "2048 Game",
        FPS: 40,
    };

    const boardConfig = {
        numberOfRows: 5,
        startPos: {
            x: 100,
            y: 100,
        },
        cellSize: 50,
        lineThickness: 2,
    }

    board = b.createBoard(boardConfig);

    const tilesConfig = {
        Tiles: t.createTiles(boardConfig.numberOfRows),
        defaultValues: [2, 4],
        posPercent: {
            x: 35 / 100 * boardConfig.cellSize,
            y: 30 / 100 * boardConfig.cellSize,
        },
        fontSize: boardConfig.cellSize / 2,
    }


    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.WIDTH, screen.HEIGHT, screen.TITLE);
    r.SetTargetFPS(screen.FPS);

    return {
        screen,
        board,
        tilesConfig,
    };
}

function update(world) {
    t.updateTiles(world.tilesConfig);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    b.drawBoard(world.board, world.tilesConfig);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};