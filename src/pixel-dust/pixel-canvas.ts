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

  constructor(canvasType: CanvasType, dimension: number, mountTarget: HTMLDivElement, id?: string) {
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('pixel-canvas');
    this.canvas.height = dimension;
    this.canvas.width = dimension;
    if (id) this.canvas.setAttribute('id', id);

    mountTarget.appendChild(this.canvas);

    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      this.ctx = ctx;
    } else {
      throw Error('Context is null');
    }
  }

  deRegister(mountTarget: HTMLDivElement): void {
    mountTarget.removeChild(this.canvas);
  }

  draw(x: number, y: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      Math.round(x * this.tileDimension),
      Math.round(y * this.tileDimension),
      this.tileDimension,
      this.tileDimension
    );
  }

  erase(x: number, y: number): void {
    this.ctx.clearRect(
      Math.round(x * this.tileDimension),
      Math.round(y * this.tileDimension),
      this.tileDimension,
      this.tileDimension
    );
  }
}

export default PixelCanvas;
