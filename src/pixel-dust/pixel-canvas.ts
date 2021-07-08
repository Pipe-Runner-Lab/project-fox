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

  matrix: string[][];

  constructor(
    canvasType: CanvasType,
    dimension: number,
    mountTarget: HTMLDivElement,
    matrix: string[][],
    id?: string
  ) {
    this.dimension = dimension;
    this.canvasType = canvasType;
    this.tileDimension = dimension / canvasType;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('pixel-canvas');
    this.canvas.height = dimension;
    this.canvas.width = dimension;
    this.matrix = Array.from(Array(this.canvasType), () => new Array(this.canvasType));
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

  draw(u: number, v: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      Math.round(Math.floor(u * this.canvasType) * this.tileDimension),
      Math.round(Math.floor(v * this.canvasType) * this.tileDimension),
      this.tileDimension,
      this.tileDimension
    );
    this.updatematrix(u, v, color);
  }

  erase(u: number, v: number): void {
    this.ctx.clearRect(
      Math.round(Math.floor(u * this.canvasType) * this.tileDimension),
      Math.round(Math.floor(v * this.canvasType) * this.tileDimension),
      this.tileDimension,
      this.tileDimension
    );
    // this.updatematrix(u, v, );
  }

  updatematrix(u: number, v: number, color: string): void {
    const a: number = Math.round(Math.floor(u * this.canvasType) * this.tileDimension);
    const b: number = Math.round(Math.floor(v * this.canvasType) * this.tileDimension);
    if (color === 'color') {
      this.matrix[a][b] = '1';
    } else {
      this.matrix[a][b] = 'o';
      console.log(this.matrix);
    }
  }

  floodfillutil(matrix: string[][], u: number, v: number, color: string): void {
    this.ctx.fillStyle = color;
    if (u < 0 || u >= this.canvasType || v < 0 || v >= this.canvasType) return;
    if (this.matrix[u][v] !== '0') return;
    if (this.matrix[u][v] === '1') return;
    // Replace the color at (u, v)
    this.matrix[u][v] = '1';
    // Recursion
    this.floodfillutil(matrix, u + 1, v, color);
    this.floodfillutil(matrix, u - 1, v, color);
    this.floodfillutil(matrix, u, v + 1, color);
    this.floodfillutil(matrix, u, v - 1, color);
  }

  floodFill(matrix: string[][], u: number, v: number, color: string): void {
    this.matrix[u][v] = '0';
    this.floodfillutil(matrix, u, v, color);
  }

  fill(matrix: string[][], u: number, v: number, color: string): void {
    this.ctx.fillStyle = color;
    this.floodFill(matrix, u, v, color);
    this.draw(u, v, color);
  }
}

export default PixelCanvas;
