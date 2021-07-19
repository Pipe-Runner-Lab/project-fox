import CommandGenerator, { InstrumentType, PenCommand, EraserCommand } from './command-generator';
import LayerManager, {
  AddLayerAfter,
  AddLayerBefore,
  DeleteLayer,
  LayerCommandType
} from './layer-manager';

type ExecutionPipelineProps = {
  layerManager: LayerManager;
  commandGenerator: CommandGenerator;
};

class ExecutionPipeline {
  layerManager: LayerManager;

  commandGenerator: CommandGenerator;

  constructor(options: ExecutionPipelineProps) {
    this.layerManager = options.layerManager;
    this.commandGenerator = options.commandGenerator;

    this.commandGenerator.processedDraw$.subscribe({
      next: this.canvasCommandObserver.bind(this),
      error: (error) => console.error(error),
      complete: () => console.info('canvas command stream completed')
    });

    this.layerManager.layerCommand$.subscribe({
      next: this.layerCommandObserver.bind(this),
      error: (error) => console.error(error),
      complete: () => console.info('layer command stream completed')
    });
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
