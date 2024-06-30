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
const NUM_ROWS = 2 * NUM_BLOCKS;
const INDIGO = "#1F0954";

const start_btn = document.getElementsByClassName("pause-play-btn")[0];
const reset_btn = document.getElementsByClassName("reset-btn")[0];

const colors = [
  "#FFEA00", // O
  "#53e3d4", // I
  "#50C878", // S
  "#D70040", // Z
  "#FFAC1C", // L
  "#0000FF", // J
  "#DA70D6", // T
];

// DOWN, LEFT, RIGHT
const MOVE_KEYS = [40, 83, 37, 65, 39, 68];
// const ROT

var curr_score;
var dim;
var piece;
var curr_color;
var next_color;
var first_gen;
var grid;
var timeout;
var gameOver;
var gameStarted;

function init() {
  gameOver = false;
  first_gen = false;
  dim = w / NUM_BLOCKS;
  piece = [
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: -1 },
  ];
  clearGrid();
  generateBlocks();
  t_draw.drawStatsCanvas(stats_ctx, stats_canvas, w, h, dim, colors);
  t_draw.drawMiscCanvas(misc_ctx, misc_canvas, w, h, dim, colors, next_color);
  t_draw.drawTetrisCanvas(tetris_ctx, w, h, grid, dim, colors);
}

function clearGrid() {
  grid = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    const row = [];
    for (let j = 0; j < NUM_BLOCKS; j++) row.push(-1);
    grid.push(row);
  }
}

function generateBlocks() {
  if (!first_gen) {
    first_gen = true;
    next_color = Math.floor(Math.random() * colors.length);
    t_draw.drawNextBlock(misc_ctx, misc_canvas, dim, next_color, colors);
    return;
  }
  curr_color = next_color;
  next_color = Math.floor(Math.random() * colors.length);

  switch (curr_color) {
    case 0:
      assignCoord(4, 0, 5, 0, 4, 1, 5, 1);
      break;
    case 1:
      assignCoord(3, 0, 4, 0, 5, 0, 6, 0);
      break;
    case 2:
      assignCoord(4, 0, 5, 0, 3, 1, 4, 1);
      break;
    case 3:
      assignCoord(3, 0, 4, 0, 4, 1, 5, 1);
      break;
    case 4:
      assignCoord(5, 0, 3, 1, 4, 1, 5, 1);
      break;
    case 5:
      assignCoord(3, 0, 3, 1, 4, 1, 5, 1);
      break;
    case 6:
      assignCoord(4, 1, 3, 0, 4, 0, 5, 0);
      break;
  }
  if (piece.some((p) => grid[p.y][p.x] != -1)) {
    clearTimeout(timeout);
    gameOver = true;
    handleGameOver();
    return;
  }
  assignColor(curr_color);
  counts[curr_color].textContent = parseInt(counts[curr_color].textContent) + 1;
  t_draw.drawNextBlock(misc_ctx, misc_canvas, dim, next_color, colors);
}

function assignCoord(x1, y1, x2, y2, x3, y3, x4, y4) {
  let args = [x1, x2, x3, x4, y1, y2, y3, y4];
  for (let i = 0; i < piece.length; i++)
    piece[i] = { x: args[i], y: args[i + 4] };
}

function assignColor(colorIdx) {
  piece.forEach((p) => (grid[p.y][p.x] = colorIdx));
}

function checkFloor() {
  return piece.some((p) => p.y >= NUM_ROWS - 1);
}

function checkVerticalCollision() {
  let c;
  let idx = -10;
  piece.forEach((p) => (grid[p.y][p.x] = idx));
  c = piece.some((p) => grid[p.y + 1][p.x] != -1 && grid[p.y + 1][p.x] != idx);
  piece.forEach((p) => (grid[p.y][p.x] = curr_color));
  return c;
}

// Left = -1, Right = 1;
function checkHorizontalCollision(dir) {
  let c;
  let idx = -10;
  piece.forEach((p) => (grid[p.y][p.x] = idx));
  c = piece.some(
    (p) => grid[p.y][p.x + dir] != -1 && grid[p.y][p.x + dir] != idx
  );
  piece.forEach((p) => (grid[p.y][p.x] = curr_color));
}

function checkWall(dir) {
  return piece.some((p) => p.x + dir < 0 || p.x + dir > NUM_BLOCKS - 1);
}

function move(event) {
  const key = event.keyCode;
  if (key == MOVE_KEYS[0] || key == MOVE_KEYS[1]) moveDown();
  if (key == MOVE_KEYS[2] || key == MOVE_KEYS[3]) moveHorizontal(-1);
  if (key == MOVE_KEYS[4] || key == MOVE_KEYS[5]) moveHorizontal(1);
  t_draw.drawTetrisCanvas(tetris_ctx, w, h, grid, dim, colors);
  if (MOVE_KEYS.includes(key)) event.preventDefault();
}

function moveDown() {
  if (checkFloor() || checkVerticalCollision()) {
    assignColor(curr_color);
    generateBlocks();
    return;
  }
  assignColor(-1);
  piece.forEach((p) => (p.y += 1));
  assignColor(curr_color);
}

function moveHorizontal(dir) {
  if (checkHorizontalCollision || checkHorizontalCollision(dir)) {
    assignColor(curr_color);
    generateBlocks();
    return;
  }
  if (checkWall(dir)) return;
  assignColor(-1);
  piece.forEach((p) => (p.x = p.x + dir));
  assignColor(curr_color);
}

function handleGameOver() {
  tetris_ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  tetris_ctx.fillRect(0, 0, w, h);
  tetris_ctx.fillStyle = "white";
  tetris_ctx.font = "30px Arial";
  tetris_ctx.fillText("Game Over!", w / 2 - 70, h / 2);

  if (curr_score > parseInt(high_span.textContent)) {
    high_span.textContent = curr_score;
  }
}

function refresh() {
  if (gameOver) return;
  t_draw.drawTetrisCanvas(tetris_ctx, w, h, grid, dim, colors);
  moveDown();
  timeout = setTimeout(refresh, 750);
}

function startGame() {
  gameOver = false;
  curr_score = 0;
  generateBlocks();
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(refresh, 750);
}

// Add functions to elements
document.addEventListener("DOMContentLoaded", () => {
  gameStarted = false;
  init();
});

document.addEventListener("keydown", move);

start_btn.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    startGame();
  }
});

reset_btn.addEventListener("click", () => {
  if (!gameStarted) gameStarted = true;
  gameOver = false;
  init();
  for (let count of counts) count.textContent = "000";
  clearTimeout(timeout);
  startGame();
});
