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


// Functions
function init() {

}

function drawCanvas() {
  ctx.fillStyle = "#1F0954";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBlock(x, y, colorA, colorB) {
    ctx.fillStyle = colorA;
    ctx.fillRect(x, y, block_dim, block_dim);

    ctx.lineWidth = 10;
    ctx.strokeStyle = colorB;
    ctx.strokeRect(x, y, block_dim, block_dim);

    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, block_dim, block_dim);

    ctx.lineWidth = 1;
}

function drawBlocks() {

}

drawCanvas();
