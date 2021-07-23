import { Observable, Subject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import {
  CanvasType,
  PenCommand,
  EraserCommand,
  InstrumentType,
  AddLayerAfter,
  AddLayerBefore,
  DeleteLayer,
  HideLayer,
  ShowLayer
} from './types';

type CommandGeneratorProps = {
  drawStream: Observable<{
    x: number;
    y: number;
  }>;
  dimension: number;
  canvasType: CanvasType;
};
class CommandGenerator {
  canvasCommand$: Observable<PenCommand | EraserCommand>;

  layerCommand$ = new Subject<
    AddLayerAfter | AddLayerBefore | DeleteLayer | HideLayer | ShowLayer
  >();

  drawingState = {
    foregroundColor: 'black',
    backgroundColor: 'white',
    instrument: InstrumentType.PEN
  };

  constructor(options: CommandGeneratorProps) {
    this.canvasCommand$ = options.drawStream.pipe(
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
            throw new Error('Draw command not supported');
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

  // eslint-disable-next-line class-methods-use-this
  cleanUp(): void {
    console.info('clean up for command generator called');
  }
}

export default CommandGenerator;
