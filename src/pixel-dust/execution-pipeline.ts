import { map, filter } from 'rxjs/operators';
import CommandGenerator from './command-generator';
import LayerManager from './layer-manager';
import {
  AddLayerAfter,
  AddLayerBefore,
  DeleteLayer,
  LayerCommandType,
  InstrumentType,
  PenCommand,
  EraserCommand
} from './types';
import CommandHistory from './command-history';

type ExecutionPipelineProps = {
  layerManager: LayerManager;
  commandGenerator: CommandGenerator;
};

class ExecutionPipeline {
  layerManager: LayerManager;

  commandGenerator: CommandGenerator;

  commandHistory: CommandHistory;

  constructor(options: ExecutionPipelineProps) {
    this.layerManager = options.layerManager;
    this.commandGenerator = options.commandGenerator;
    this.commandHistory = new CommandHistory({
      drawCommand$: this.commandGenerator.canvasCommand$.pipe(
        filter(() => !!this.layerManager.activeLayer),
        map((command) => {
          if (!this.layerManager.activeLayer?.uuid) {
            throw new Error('Active layer needed to store history');
          }

          return {
            ...command,
            activeLayerUuid: this.layerManager.activeLayer?.uuid
          };
        })
      ),
      layerCommand$: this.commandGenerator.layerCommand$
    });

    this.commandGenerator.canvasCommand$.subscribe({
      next: this.canvasCommandObserver.bind(this),
      error: (error) => console.error(error),
      complete: () => console.info('canvas command stream completed')
    });

    this.commandGenerator.layerCommand$.subscribe({
      next: this.layerCommandObserver.bind(this),
      error: (error) => console.error(error),
      complete: () => console.info('layer command stream completed')
    });
  }

  // eslint-disable-next-line class-methods-use-this
  cleanUp(): void {
    console.info('clean up for execution pipeline called');
  }

  canvasCommandObserver(arg: PenCommand | EraserCommand | null): void {
    const activeLayer = this.layerManager.getActiveLayer();

    if (!activeLayer) {
      return;
    }

    if (arg) {
      switch (arg.instrument) {
        case InstrumentType.PEN:
          activeLayer.pixelCanvas.draw(arg.x, arg.y, arg.color);
          break;
        case InstrumentType.ERASER:
          activeLayer.pixelCanvas.erase(arg.x, arg.y);
          break;
        default:
          break;
      }
    }
  }

  layerCommandObserver(args: AddLayerAfter | AddLayerBefore | DeleteLayer): void {
    switch (args.type) {
      case LayerCommandType.ADD_AFTER:
        this.layerManager.addLayerAfter({ uuid: args.uuid });
        break;
      case LayerCommandType.ADD_BEFORE:
        this.layerManager.addLayerBefore({ uuid: args.uuid });
        break;
      case LayerCommandType.DELETE:
        this.layerManager.deleteLayer({ uuid: args.uuid });
        break;
      default:
        break;
    }
  }
}

export default ExecutionPipeline;
