// HTML Elements
const canvas = document.getElementById("tetris-canvas");
const canvasContainer = document.querySelector(".canv-cont");
const ctx = canvas.getContext("2d");
canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;

// JavaScript variables and constants
const NUM_BLOCKS = 10;
const block_dim = canvas.width / NUM_BLOCKS;

const I_BLOCK_FILL = "#53e3d4";
const I_BLOCK_STROKE = "#c5f5f0";

const J_BLOCK_FILL = "#0000FF";
const J_BLOCK_STROKE = "#0096FF";

const L_BLOCK_FILL = "#FFAC1C";
const L_BLOCK_STROKE = "#FFE5B4";

const O_BLOCK_FILL = "#FFEA00";
const O_BLOCK_STROKE = "#FFFDD0";

const S_BLOCK_FILL = "#50C878";
const S_BLOCK_STROKE = "#AAFF00";

const T_BLOCK_FILL = "#DA70D6";
const T_BLOCK_STROKE = "#E6E6FA";

const Z_BLOCK_FILL = "#D70040";
const Z_BLOCK_STROKE = "#F88379";

// Functions
function init() {}

function drawCanvas() {
  ctx.fillStyle = "#1F0954";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBlock(x, y, colorA, colorB) {
  ctx.fillStyle = colorA;
  ctx.fillRect(x, y, block_dim, block_dim / 2);

  ctx.lineWidth = 10;
  ctx.strokeStyle = colorB;
  ctx.strokeRect(x, y, block_dim, block_dim / 2);

//   ctx.lineWidth = 2.5;
//   ctx.strokeStyle = "black";
//   ctx.strokeRect(x, y, block_dim, block_dim / 2);

  ctx.lineWidth = 1;
}

function drawI(x, y) {
  drawBlock(x, y, I_BLOCK_FILL, I_BLOCK_STROKE);
}

function drawJ(x, y) {
  drawBlock(x, y, J_BLOCK_FILL, J_BLOCK_STROKE);
}

function drawL(x, y) {
  drawBlock(x, y, L_BLOCK_FILL, L_BLOCK_STROKE);
}
function drawO(x, y) {
  drawBlock(x, y, O_BLOCK_FILL, O_BLOCK_STROKE);
}
function drawS(x, y) {
  drawBlock(x, y, S_BLOCK_FILL, S_BLOCK_STROKE);
}
function drawT(x, y) {
  drawBlock(x, y, T_BLOCK_FILL, T_BLOCK_STROKE);
}
function drawZ(x, y) {
  drawBlock(x, y, Z_BLOCK_FILL, Z_BLOCK_STROKE);
}

function createI() {
  for (let i = 0; i < NUM_BLOCKS; i++) {
    drawI(block_dim * i, 0);
  }
}
function createJ() {}
function createL() {}
function createO() {}
function createS() {}
function createT() {}
function createZ() {}

drawCanvas();
createI();