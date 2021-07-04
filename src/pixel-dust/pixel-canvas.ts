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

  constructor(canvasType: number, dimension: number, mountTarget: HTMLDivElement, id?: string) {
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
    const fillarr = Array.from(Array(this.canvasType), () => new Array(this.canvasType));
    console.info(fillarr);
  }

  deRegister(mountTarget: HTMLDivElement): void {
    mountTarget.removeChild(this.canvas);
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

  fill(u: number, v: number, color: string): void {
    this.ctx.fillStyle = color;
    // No content for now.
  }
}

export default PixelCanvas;
