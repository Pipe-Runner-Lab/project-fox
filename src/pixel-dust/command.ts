/* eslint-disable max-classes-per-file */
// TODO spread out into different files
export enum CommandType {
  DRAW = 'DRAW',
  ERASE = 'ERASE',
  ADD_LAYER = 'ADD_LAYER',
  DELETE_LAYER = 'DELETE_LAYER',
  FILL = 'FILL'
}

export class DrawCommand {
  type = CommandType.DRAW;

  u: number;

  v: number;

  color: string;

  constructor(u: number, v: number, color: string) {
    this.u = u;
    this.v = v;
    this.color = color;
  }
}

export class EraseCommand {
  type = CommandType.ERASE;

  u: number;

  v: number;

  constructor(u: number, v: number) {
    this.u = u;
    this.v = v;
  }
}
export class FillCommand {
  type = CommandType.FILL;

  u: number;

  v: number;

  color: string;

  constructor(u: number, v: number, color: string) {
    this.u = u;
    this.v = v;
    this.color = color;
  }
}
