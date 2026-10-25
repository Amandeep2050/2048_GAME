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

    const defaultValues = [2, 4];
    const Tiles = t.createTiles(numberOfRows);
    const tilesConfig = {
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
        Tiles,
        tilesConfig,
        defaultValues,
    };
}

function update(world) {
    if (r.IsKeyPressed(r.KEY_UP)) {
        world.Tiles = s.upShift(world.Tiles);
        t.addRandomValue(world.Tiles);
    }

    if (r.IsKeyPressed(r.KEY_DOWN)) {
        world.Tiles = s.downShift(world.Tiles);
        t.addRandomValue(world.Tiles);
    }

    if (r.IsKeyPressed(r.KEY_LEFT)) {
        world.Tiles = s.leftShift(world.Tiles);
        t.addRandomValue(world.Tiles);
    }

    if (r.IsKeyPressed(r.KEY_RIGHT)) {
        world.Tiles = s.rightShift(world.Tiles);
        t.addRandomValue(world.Tiles);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    b.drawBoard(world.board, world.Tiles, world.tilesConfig);

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