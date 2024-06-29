// Block stats canvas
const stats_canvas = document.getElementById("stats-canvas");
const stats_ctx = stats_canvas.getContext("2d");

// Game canvas
const tetris_canvas = document.getElementById("tetris-canvas");
const tetris_ctx = tetris_canvas.getContext("2d");

// Scores, level, next block canvas
const misc_canvas = document.getElementById("misc-canvas");
const misc_ctx = misc_canvas.getContext("2d");

const width = tetris_canvas.width;
const height = tetris_canvas.height;
const curr_span = document.getElementsByClassName("curr-score")[0];
const high_span = document.getElementsByClassName("high-score")[0];

const counts = document.getElementsByClassName("cnt");
const curr_level = document.getElementsByClassName("level")[0];

const NUM_BLOCKS = 10;
const INDIGO = "#1F0954";

// JavaScript (O, I, S, Z, L, J, T)
const colors = [
  "#FFEA00", // O
  "#53e3d4", // I
  "#50C878", // S
  "#D70040", // Z
  "#FFAC1C", // L
  "#0000FF", // J
  "#DA70D6", // T
];

var curr_score;
var dim;
var curr_block;
var curr_color;
var next_color;
var first_gen;

function init() {
  curr_score = 0;
  first_gen = false;
  dim = width / NUM_BLOCKS;
  grid = [];
  curr_block = [];

  for (let i = 0; i < NUM_BLOCKS; i++) {
    for (let j = 0; j < 2 * NUM_BLOCKS; j++) {
      const grid_block = { x: i, y: j, color: "X" };
      grid.push(grid_block);
    }
  }

  generateBlocks();
  drawStatsCanvas();
  drawMiscCanvas();

  drawTetrisCanvas();
  drawCurrentBlock();
}

function drawTetrisCanvas() {
  tetris_ctx.fillStyle = INDIGO;
  tetris_ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < grid.length; i++) {
    let color = grid[i].color;
    if (grid[i].color == "X") color = INDIGO;
    drawBlock(dim * grid[i].x, dim * grid[i].y, color, tetris_ctx);
  }
}

function drawStatsCanvas() {
  stats_ctx.fillStyle = INDIGO;
  stats_ctx.fillRect(0, 0, 0.75 * width, height);

  dim = (2 / 3) * dim;
  const x = 0.5 * stats_canvas.width - 1.5 * dim;
  const y = 2.5 * dim;

  drawO(x, y + 0.25 * dim, stats_ctx);
  drawI(x - dim, y + 4.5 * dim, stats_ctx);
  drawS(x - 0.5 * dim, y + 7.75 * dim, stats_ctx);
  drawZ(x - 0.5 * dim, y + 11.55 * dim, stats_ctx);
  drawL(x - 0.5 * dim, y + 16.25 * dim, stats_ctx);
  drawJ(x - 0.5 * dim, y + 20 * dim, stats_ctx);
  drawT(x - 0.5 * dim, y + 22.75 * dim, stats_ctx);

  dim = width / NUM_BLOCKS;
}

function drawMiscCanvas() {
  misc_ctx.fillStyle = "#1F0954";
  misc_ctx.fillRect(0, 0, 0.75 * width, height);

  drawNextBlock();
}

function drawNextBlock() {
  const x = 0.5 * misc_canvas.width - 1.5 * dim;
  const y = misc_canvas.height - 5.35 * dim;
  misc_ctx.fillStyle = "black";
  misc_ctx.fillRect(x - dim, y, 5 * dim, 3.5 * dim);

  dim = (2 / 3) * dim;

  switch (next_color) {
    case 0:
      drawO(x + 1.25 * dim, y + 1.5 * dim, misc_ctx);
      break;
    case 1:
      drawI(x + 0.25 * dim, y + 2 * dim, misc_ctx);
      break;
    case 2:
      drawS(x + 0.75 * dim, y + 1.5 * dim, misc_ctx);
      break;
    case 3:
      drawZ(x + 0.75 * dim, y + 1.5 * dim, misc_ctx);
      break;
    case 4:
      drawL(x + 0.75 * dim, y + 2.5 * dim, misc_ctx);
      break;
    case 5:
      drawJ(x + 0.75 * dim, y + 2.5 * dim, misc_ctx);
      break;
    case 6:
      drawT(x + 0.75 * dim, y + 1.5 * dim, misc_ctx);
  }

  dim = width / NUM_BLOCKS;
}

function drawBlock(x, y, color, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, dim, dim);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x, y, dim, dim);
}

function drawCurrentBlock() {
  curr_block.forEach((block) =>
    drawBlock(block.x * dim, block.y * dim, colors[block.color], tetris_ctx)
  );
}

function drawO(x, y, ctx) {
  drawBlock(x, y, colors[0], ctx);
  drawBlock(x + dim, y, colors[0], ctx);
  drawBlock(x, y + dim, colors[0], ctx);
  drawBlock(x + dim, y + dim, colors[0], ctx);
}

function drawI(x, y, ctx) {
  for (let i = 0; i < 4; i++) {
    drawBlock(x + i * dim, y, colors[1], ctx);
  }
}

function drawS(x, y, ctx) {
  drawBlock(x + dim, y, colors[2], ctx);
  drawBlock(x + 2 * dim, y, colors[2], ctx);
  drawBlock(x, y + dim, colors[2], ctx);
  drawBlock(x + dim, y + dim, colors[2], ctx);
}

function drawZ(x, y, ctx) {
  drawBlock(x, y, colors[3], ctx);
  drawBlock(x + dim, y, colors[3], ctx);
  drawBlock(x + dim, y + dim, colors[3], ctx);
  drawBlock(x + 2 * dim, y + dim, colors[3], ctx);
}

function drawL(x, y, ctx) {
  drawBlock(x, y, colors[4], ctx);
  drawBlock(x + dim, y, colors[4], ctx);
  drawBlock(x + 2 * dim, y, colors[4], ctx);
  drawBlock(x + 2 * dim, y - dim, colors[4], ctx);
}

function drawJ(x, y, ctx) {
  drawBlock(x, y, colors[5], ctx);
  drawBlock(x, y - dim, colors[5], ctx);
  drawBlock(x + dim, y, colors[5], ctx);
  drawBlock(x + 2 * dim, y, colors[5], ctx);
}

function drawT(x, y, ctx) {
  drawBlock(x, y, colors[6], ctx);
  drawBlock(x + dim, y, colors[6], ctx);
  drawBlock(x + 2 * dim, y, colors[6], ctx);
  drawBlock(x + dim, y + dim, colors[6], ctx);
}

function generateBlocks() {
  if (!first_gen) {
    first_gen = true;
    next_color = Math.floor(Math.random() * colors.length);
    return;
  }
  curr_color = next_color;
  next_color = Math.floor(Math.random() * colors.length);

  switch (curr_color) {
    // handle edge cases (end game) later
    case 0:
      curr_block = [
        { x: 4, y: 0, color: curr_color },
        { x: 5, y: 0, color: curr_color },
        { x: 4, y: 1, color: curr_color },
        { x: 5, y: 1, color: curr_color },
      ];
      break;
    case 1:
      curr_block = [
        { x: 3, y: 0, color: curr_color },
        { x: 4, y: 0, color: curr_color },
        { x: 5, y: 0, color: curr_color },
        { x: 6, y: 0, color: curr_color },
      ];
      break;
    case 2:
      curr_block = [
        { x: 4, y: 0, color: curr_color },
        { x: 5, y: 0, color: curr_color },
        { x: 3, y: 1, color: curr_color },
        { x: 4, y: 1, color: curr_color },
      ];
      break;
    case 3:
      curr_block = [
        { x: 3, y: 0, color: curr_color },
        { x: 4, y: 0, color: curr_color },
        { x: 4, y: 1, color: curr_color },
        { x: 5, y: 1, color: curr_color },
      ];
      break;
    case 4:
      curr_block = [
        { x: 5, y: 0, color: curr_color },
        { x: 3, y: 1, color: curr_color },
        { x: 4, y: 1, color: curr_color },
        { x: 5, y: 1, color: curr_color },
      ];
      break;
    case 5:
      curr_block = [
        { x: 3, y: 0, color: curr_color },
        { x: 3, y: 1, color: curr_color },
        { x: 4, y: 1, color: curr_color },
        { x: 5, y: 1, color: curr_color },
      ];
      break;
    case 6:
      curr_block = [
        { x: 4, y: 1, color: curr_color },
        { x: 3, y: 0, color: curr_color },
        { x: 4, y: 0, color: curr_color },
        { x: 5, y: 0, color: curr_color },
      ];
      break;
  }
}

init();
