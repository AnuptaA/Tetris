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

const NUM_BLOCKS = 10;
const dim = width / NUM_BLOCKS;

// JavaScript (O, I, S, Z, L, J, T)
const colors = [
  "#FFEA00",
  "#53e3d4",
  "#50C878",
  "#D70040",
  "#FFAC1C",
  "#0000FF",
  "#DA70D6",
];

var curr_score;

function init() {
  curr_score = 0;
}

function drawCanvas() {
  tetris_ctx.fillStyle = "#1F0954";
  tetris_ctx.fillRect(0, 0, width, height);

  stats_ctx.fillStyle = "#1F0954";
  stats_ctx.fillRect(0, 0, (width * 3) / 4, height);

  misc_ctx.fillStyle = "#1F0954";
  misc_ctx.fillRect(0, 0, (width * 3) / 4, height);
}

function drawBlock(x, y, color, ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, dim, dim);
    
}

drawCanvas();

// document.addEventListener("DOMContentLoaded", () => {});
