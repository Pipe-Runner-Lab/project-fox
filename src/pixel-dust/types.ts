/** Pixel Canvas types */

export enum CanvasType {
  X50 = 50,
  X64 = 64,
  X100 = 100
}

/** Layer Manager types */

export type LayerMetaData = {
  uuid: string;
};

export enum LayerCommandType {
  ADD_AFTER = 'ADD_AFTER',
  ADD_BEFORE = 'ADD_BEFORE',
  DELETE = 'DELETE',
  REARRANGE = 'REARRANGE'
}

export type AddLayerAfter = {
  type: LayerCommandType.ADD_AFTER;
  uuid?: string;
};

export type AddLayerBefore = {
  type: LayerCommandType.ADD_BEFORE;
  uuid: string;
};

export type DeleteLayer = {
  type: LayerCommandType.DELETE;
  uuid: string | undefined;
};

/** Command Generator types */

export enum InstrumentType {
  PEN = 'PEN',
  RANDOM_WIDTH_PEN = 'RANDOM_WIDTH_PEN',
  BUCKET = 'BUCKET',
  ERASER = 'ERASER',
  PIXEL_SQUARE = 'PIXEL_SQUARE',
  PIXEL_CIRCLE = 'PIXEL_CIRCLE',
  PIXEL_FRAME = 'PIXEL_FRAME',
  COLOR_PICKER = 'COLOR_PICKER'
}

type BaseCommand = {
  x: number;
  y: number;
};

export type PenCommand = BaseCommand & {
  instrument: InstrumentType.PEN;
  color: string;
};

export type EraserCommand = BaseCommand & {
  instrument: InstrumentType.ERASER;
};

/** Command History types */
export type ExtendedPenCommand = PenCommand & {
  activeLayerUuid: string;
};

export type ExtendedEraseCommand = EraserCommand & {
  activeLayerUuid: string;
};