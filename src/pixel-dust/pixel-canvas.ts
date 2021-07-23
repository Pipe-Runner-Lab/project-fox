import { CanvasType } from './types';

class PixelCanvas {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  dimension: number;

  tileDimension: number;

  canvasType: CanvasType;

  constructor(canvasType: CanvasType, dimension: number, uuid: string) {
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('pixel-canvas');
    this.canvas.height = dimension;
    this.canvas.width = dimension;
    this.canvas.setAttribute('id', uuid);

    const ctx = this.canvas.getContext('2d');
    if (ctx) {
      this.ctx = ctx;
    } else {
      throw Error('Context is null');
    }
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

  getCanvasBlob(type?: string, quality?: number): Promise<Blob | null> {
    return new Promise((resolve) => {
      this.canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        type ?? 'img/png',
        quality
      );
    });
  }
}

export default PixelCanvas;
