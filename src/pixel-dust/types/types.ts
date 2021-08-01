/** Pixel Canvas types */

export enum CanvasType {
  X50 = 50,
  X64 = 64,
  X100 = 100,
  X200 = 200,
  X500 = 500
}

/** Layer Manager types */

export type LayerMetaData = {
  uuid: string;
  imagePreview?: string;
  hidden: boolean;
};

export enum LayerCommandType {
  ADD_AFTER = 'ADD_AFTER',
  ADD_BEFORE = 'ADD_BEFORE',
  DELETE = 'DELETE',
  REARRANGE = 'REARRANGE',
  HIDE = 'HIDE',
  SHOW = 'SHOW',
  INSERT_BEFORE = 'INSERT_BEFORE',
  INSERT_AFTER = 'INSERT_AFTER'
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
  uuid: string;
};

export type HideLayer = {
  type: LayerCommandType.HIDE;
  uuid: string;
};

export type ShowLayer = {
  type: LayerCommandType.SHOW;
  uuid: string;
};

export type InsertLayerBefore = {
  type: LayerCommandType.INSERT_BEFORE;
  uuid: string;
  destinationUuid: string;
};

export type InsertLayerAfter = {
  type: LayerCommandType.INSERT_AFTER;
  uuid: string;
  destinationUuid: string;
};

export type ExtendedAddLayerAfter = AddLayerAfter & {
  generatedUuid: string;
};

export type ExtendedAddLayerBefore = AddLayerBefore & {
  generatedUuid: string;
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

export type CanvasCommands = PenCommand | EraserCommand;

/** Command History types */
export type HistoryPenCommand = {
  instrument: InstrumentType.PEN;
  color: string;
  activeLayerUuid: string;
  cartesianArray: { x: number; y: number }[];
};

export type HistoryEraseCommand = {
  instrument: InstrumentType.ERASER;
  activeLayerUuid: string;
  cartesianArray: { x: number; y: number }[];
};

// export type HistoryCommands = HistoryPenCommand | HistoryEraseCommand;

export type HistoryCommands = {
  instrument: InstrumentType.PEN | InstrumentType.ERASER;
  color: string | undefined;
  activeLayerUuid: string;
  cartesianArray: { x: number; y: number }[];
};
