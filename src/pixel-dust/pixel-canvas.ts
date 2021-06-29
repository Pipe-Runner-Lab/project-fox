export enum CanvasType {
  X50 = 50,
  X64 = 64,
  X100 = 100
}

class PixelCanvas {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  dimension: number;

  tileDimension: number;

  canvasType: CanvasType;

  constructor(canvasType: CanvasType, dimension: number, mountTarget: HTMLDivElement) {
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('pixel-canvas');
    this.canvas.height = dimension;
    this.canvas.width = dimension;

    mountTarget.appendChild(this.canvas);

    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      this.ctx = ctx;
    } else {
      throw Error('Context is null');
    }
  }

  draw(u: number, v: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      Math.round(Math.floor(u * this.canvasType) * this.tileDimension),
      Math.round(Math.floor(v * this.canvasType) * this.tileDimension),
      this.tileDimension,
      this.tileDimension
    );
  }
}

export default PixelCanvas;
