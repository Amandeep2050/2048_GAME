const r = require("raylib");
const b = require("./board");

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

    const numberOfRows = 3;
    const startPos = {
        x: 100,
        y: 100,
    }
    const size = 100;
    const lineThickness = 2;

    const board = b.createBoard(numberOfRows, startPos, size, lineThickness);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.WIDTH, screen.HEIGHT, screen.TITLE);
    r.SetTargetFPS(screen.FPS);

    return {
        screen,
        board,
    };
}

function update(world) {
    // change the state
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    b.drawBoard(world.board);

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