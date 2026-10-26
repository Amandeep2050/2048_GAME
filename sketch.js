const r = require("raylib");
const b = require("./board");
const t = require("./tiles");
const s = require("./shifts");

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

    const tilesConfig = {
        Tiles: t.createTiles(numberOfRows),
        defaultValues: [2, 4],
        posPercent: {
            x: 35 / 100 * size,
            y: 30 / 100 * size,
        },
        fontSize: size / 2,
    }

    const board = b.createBoard(numberOfRows, startPos, size, lineThickness);

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
    if (r.IsKeyPressed(r.KEY_UP)) {
        const up = s.upShift(world.tilesConfig.Tiles);
        t.updateTiles(world.tilesConfig, up);
    }

    if (r.IsKeyPressed(r.KEY_DOWN)) {
        const down = s.downShift(world.tilesConfig.Tiles);
        t.updateTiles(world.tilesConfig, down);
    }

    if (r.IsKeyPressed(r.KEY_LEFT)) {
        const left = s.leftShift(world.tilesConfig.Tiles);
        t.updateTiles(world.tilesConfig, left);
    }

    if (r.IsKeyPressed(r.KEY_RIGHT)) {
        const right = s.rightShift(world.tilesConfig.Tiles);
        t.updateTiles(world.tilesConfig, right);
    }
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