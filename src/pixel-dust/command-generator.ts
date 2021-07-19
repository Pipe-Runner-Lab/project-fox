import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { CanvasType } from './pixel-canvas';

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

type CommandGeneratorProps = {
  drawStream: Observable<{
    x: number;
    y: number;
  }>;
  dimension: number;
  canvasType: CanvasType;
};
class CommandGenerator {
  rawDraw$: Observable<{
    x: number;
    y: number;
  }>;

  processedDraw$: Observable<PenCommand | EraserCommand | null>;

  drawingState = {
    foregroundColor: 'black',
    backgroundColor: 'white',
    instrument: InstrumentType.PEN
  };

  constructor(options: CommandGeneratorProps) {
    this.rawDraw$ = options.drawStream;

    this.processedDraw$ = this.rawDraw$.pipe(
      map(({ x, y }) => ({ u: x / options.dimension, v: y / options.dimension })),
      map(({ u, v }) => ({
        x: Math.floor(u * options.canvasType),
        y: Math.floor(v * options.canvasType)
      })),
      map(({ x, y }) => {
        switch (this.drawingState.instrument) {
          case InstrumentType.PEN:
            return {
              x,
              y,
              color: this.drawingState.foregroundColor,
              instrument: InstrumentType.PEN
            } as PenCommand;
          case InstrumentType.ERASER:
            return {
              x,
              y,
              instrument: InstrumentType.ERASER
            } as EraserCommand;
          default:
            return null;
        }
      }),
      distinctUntilChanged((prev, curr) => {
        if (prev && curr) {
          if (prev.x !== curr.x || prev.y !== curr.y || prev.instrument !== curr.instrument) {
            return false;
          }
          if ((prev as PenCommand).color && (curr as PenCommand).color) {
            if ((prev as PenCommand).color !== (curr as PenCommand).color) {
              return false;
            }
            return true;
          }
        }
        return true;
      })
    );
  }
}

export default CommandGenerator;
