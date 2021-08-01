import { CanvasType } from '../types/types';

class PreviewCanvas {
  canvas: HTMLCanvasElement;

  dimension: number;

  ctx: CanvasRenderingContext2D;

  tileDimension: number;

  previousX: number;

  previousY: number;

  canvasType: CanvasType;

  constructor(canvasType: CanvasType, dimension: number, mountTarget: HTMLDivElement) {
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.previousX = -1;
    this.previousY = -1;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('preview-canvas');
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

  previewLayer(x: number, y: number, color: string): void {
    if (this.previousX === -1 || this.previousY === -1) {
      this.drawPreview(x, y, color);
      this.previousX = x;
      this.previousY = y;
    } else {
      this.erasePreview(this.previousX, this.previousY);
      this.drawPreview(x, y, color);
      this.previousX = x;
      this.previousY = y;
    }
  }

  drawPreview(x: number, y: number, color: string): void {
    this.ctx.fillStyle = color.replace(/[\d.]+\)$/g, '0.4)');
    this.ctx.fillRect(
      Math.round(x * this.tileDimension),
      Math.round(y * this.tileDimension),
      this.tileDimension,
      this.tileDimension
    );
  }

  erasePreview(x: number, y: number): void {
    if (Number.isNaN(x) || Number.isNaN(y)) {
      this.erasePreview(this.previousX, this.previousY);
    } else {
      this.ctx.clearRect(
        Math.round(x * this.tileDimension),
        Math.round(y * this.tileDimension),
        this.tileDimension,
        this.tileDimension
      );
    }
  }
}

export default PreviewCanvas;
