import t_draw from "./drawFunctions.js";

// Block stats canvas
const stats_canvas = document.getElementById("stats-canvas");
const stats_ctx = stats_canvas.getContext("2d");

// Game canvas
const tetris_canvas = document.getElementById("tetris-canvas");
const tetris_ctx = tetris_canvas.getContext("2d");

// Scores, level, next block canvas
const misc_canvas = document.getElementById("misc-canvas");
const misc_ctx = misc_canvas.getContext("2d");

const w = tetris_canvas.width;
const h = tetris_canvas.height;
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
var grid;

function init() {
  curr_score = 0;
  first_gen = false;
  dim = w / NUM_BLOCKS;
  grid = [];
  curr_block = {
    A: { x: -1, y: -1 },
    B: { x: -1, y: -1 },
    C: { x: -1, y: -1 },
    D: { x: -1, y: -1 },
  };

  for (let i = 0; i < 2 * NUM_BLOCKS; i++) {
    const row = [];
    for (let j = 0; j < NUM_BLOCKS; j++) row.push(-1);
    grid.push(row);
  }

  generateBlocks();
  t_draw.drawStatsCanvas(stats_ctx, stats_canvas, w, h, dim, colors);
  t_draw.drawMiscCanvas(misc_ctx, misc_canvas, w, h, dim, colors, next_color);
  t_draw.drawTetrisCanvas(tetris_ctx, w, h, grid, dim, colors);
  t_draw.drawCurrBlock(tetris_ctx, grid, dim, colors, curr_block);
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
      Object.assign(curr_block.A, { x: 4, y: 0 });
      Object.assign(curr_block.B, { x: 5, y: 0 });
      Object.assign(curr_block.C, { x: 4, y: 1 });
      Object.assign(curr_block.D, { x: 5, y: 1 });
      break;
    case 1:
      Object.assign(curr_block.A, { x: 3, y: 0 });
      Object.assign(curr_block.B, { x: 4, y: 0 });
      Object.assign(curr_block.C, { x: 5, y: 0 });
      Object.assign(curr_block.D, { x: 6, y: 0 });
      break;
    case 2:
      Object.assign(curr_block.A, { x: 4, y: 0 });
      Object.assign(curr_block.B, { x: 5, y: 0 });
      Object.assign(curr_block.C, { x: 3, y: 1 });
      Object.assign(curr_block.D, { x: 4, y: 1 });
      break;
    case 3:
      Object.assign(curr_block.A, { x: 3, y: 0 });
      Object.assign(curr_block.B, { x: 4, y: 0 });
      Object.assign(curr_block.C, { x: 4, y: 1 });
      Object.assign(curr_block.D, { x: 5, y: 1 });
      break;
    case 4:
      Object.assign(curr_block.A, { x: 5, y: 0 });
      Object.assign(curr_block.B, { x: 3, y: 1 });
      Object.assign(curr_block.C, { x: 4, y: 1 });
      Object.assign(curr_block.D, { x: 5, y: 1 });
      break;
    case 5:
      Object.assign(curr_block.A, { x: 3, y: 0 });
      Object.assign(curr_block.B, { x: 3, y: 1 });
      Object.assign(curr_block.C, { x: 4, y: 1 });
      Object.assign(curr_block.D, { x: 5, y: 1 });
      break;
    case 6:
      Object.assign(curr_block.A, { x: 4, y: 1 });
      Object.assign(curr_block.B, { x: 3, y: 0 });
      Object.assign(curr_block.C, { x: 4, y: 0 });
      Object.assign(curr_block.D, { x: 5, y: 0 });
      break;
  }

  grid[curr_block.A.x][curr_block.A.y] = curr_color;
  grid[curr_block.B.x][curr_block.B.y] = curr_color;
  grid[curr_block.C.x][curr_block.C.y] = curr_color;
  grid[curr_block.D.x][curr_block.D.y] = curr_color;

}

init();
