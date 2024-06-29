const t_draw = {
  color: "#1F0954", // INDIGO
  drawTetrisCanvas(ctx, w, h, grid, dim, colors) {
    ctx.fillStyle = t_draw.color;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        let grid_color = grid[i][j] == -1 ? t_draw.color : colors[grid[i][j]];
        this.drawBlock(j * dim, i * dim, grid_color, ctx, dim);
      }
    }



  },
  drawStatsCanvas(ctx, canvas, w, h, dim, colors) {
    ctx.fillStyle = t_draw.color;
    ctx.fillRect(0, 0, 0.75 * w, h);

    let newDim = (2 / 3) * dim;
    const x = 0.5 * canvas.width - 1.5 * newDim;
    const y = 2.5 * newDim;

    this.drawO(x, y + 0.25 * newDim, ctx, colors, newDim);
    this.drawI(x - newDim, y + 4.5 * newDim, ctx, colors, newDim);
    this.drawS(x - 0.5 * newDim, y + 7.75 * newDim, ctx, colors, newDim);
    this.drawZ(x - 0.5 * newDim, y + 11.55 * newDim, ctx, colors, newDim);
    this.drawL(x - 0.5 * newDim, y + 16.25 * newDim, ctx, colors, newDim);
    this.drawJ(x - 0.5 * newDim, y + 20 * newDim, ctx, colors, newDim);
    this.drawT(x - 0.5 * newDim, y + 22.75 * newDim, ctx, colors, newDim);
  },
  drawMiscCanvas(ctx, canvas, w, h, dim, colors, next_color) {
    ctx.fillStyle = t_draw.color;
    ctx.fillRect(0, 0, 0.75 * w, h);
    this.drawNextBlock(ctx, canvas, dim, next_color, colors);
  },
  drawNextBlock(ctx, canvas, dim, next_color, colors) {
    const x = 0.5 * canvas.width - 1.5 * dim;
    const y = canvas.height - 5.35 * dim;
    ctx.fillStyle = "black";
    ctx.fillRect(x - dim, y, 5 * dim, 3.5 * dim);

    const newDim = (2 / 3) * dim;

    switch (next_color) {
      case 0:
        this.drawO(x + 1.25 * newDim, y + 1.5 * newDim, ctx, colors, newDim);
        break;
      case 1:
        this.drawI(x + 0.25 * newDim, y + 2 * newDim, ctx, colors, newDim);
        break;
      case 2:
        this.drawS(x + 0.75 * newDim, y + 1.5 * newDim, ctx, colors, newDim);
        break;
      case 3:
        this.drawZ(x + 0.75 * newDim, y + 1.5 * newDim, ctx, colors, newDim);
        break;
      case 4:
        this.drawL(x + 0.75 * newDim, y + 2.5 * newDim, ctx, colors, newDim);
        break;
      case 5:
        this.drawJ(x + 0.75 * newDim, y + 2.5 * newDim, ctx, colors, newDim);
        break;
      case 6:
        this.drawT(x + 0.75 * newDim, y + 1.5 * newDim, ctx, colors, newDim);
    }
  },
  drawBlock(x, y, color, ctx, dim) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, dim, dim);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, dim, dim);
  },

  drawCurrentBlock(curr_block, dim, colors, tetris_ctx) {
    // Function body...
  },

  drawO(x, y, ctx, colors, dim) {
    this.drawBlock(x, y, colors[0], ctx, dim);
    this.drawBlock(x + dim, y, colors[0], ctx, dim);
    this.drawBlock(x, y + dim, colors[0], ctx, dim);
    this.drawBlock(x + dim, y + dim, colors[0], ctx, dim);
  },
  drawI(x, y, ctx, colors, dim) {
    for (let i = 0; i < 4; i++) {
      this.drawBlock(x + i * dim, y, colors[1], ctx, dim);
    }
  },
  drawS(x, y, ctx, colors, dim) {
    this.drawBlock(x + dim, y, colors[2], ctx, dim);
    this.drawBlock(x + 2 * dim, y, colors[2], ctx, dim);
    this.drawBlock(x, y + dim, colors[2], ctx, dim);
    this.drawBlock(x + dim, y + dim, colors[2], ctx, dim);
  },
  drawZ(x, y, ctx, colors, dim) {
    this.drawBlock(x, y, colors[3], ctx, dim);
    this.drawBlock(x + dim, y, colors[3], ctx, dim);
    this.drawBlock(x + dim, y + dim, colors[3], ctx, dim);
    this.drawBlock(x + 2 * dim, y + dim, colors[3], ctx, dim);
  },
  drawL(x, y, ctx, colors, dim) {
    this.drawBlock(x, y, colors[4], ctx, dim);
    this.drawBlock(x + dim, y, colors[4], ctx, dim);
    this.drawBlock(x + 2 * dim, y, colors[4], ctx, dim);
    this.drawBlock(x + 2 * dim, y - dim, colors[4], ctx, dim);
  },
  drawJ(x, y, ctx, colors, dim) {
    this.drawBlock(x, y, colors[5], ctx, dim);
    this.drawBlock(x, y - dim, colors[5], ctx, dim);
    this.drawBlock(x + dim, y, colors[5], ctx, dim);
    this.drawBlock(x + 2 * dim, y, colors[5], ctx, dim);
  },
  drawT(x, y, ctx, colors, dim) {
    this.drawBlock(x, y, colors[6], ctx, dim);
    this.drawBlock(x + dim, y, colors[6], ctx, dim);
    this.drawBlock(x + 2 * dim, y, colors[6], ctx, dim);
    this.drawBlock(x + dim, y + dim, colors[6], ctx, dim);
  },
  drawCurrBlock(ctx, grid, dim, colors, piece) {
    const color = colors[grid[piece.A.x][piece.A.y]];
    if (color == -1) return;
    piece.forEach(block => {
        this.drawBlock(block.y, block.x, color, ctx, dim);
    })
  }
};

export default t_draw;
