import { CommandType, DrawCommand, EraseCommand } from './command';
import CommandGenerator from './command-generator';
import LayerManager from './layer-manager';

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

    this.commandGenerator.canvasCommandStream.subscribe({
      next: this.canvasCommandObserver.bind(this),
      error: (error) => console.error(error),
      complete: () => console.info('canvas command stream completed')
    });
  }

  // eslint-disable-next-line class-methods-use-this
  canvasCommandObserver(command: DrawCommand | EraseCommand): void {
    const activeLayer = this.layerManager.getActiveLayer();

    if (!activeLayer) {
      return;
    }

    switch (command.type) {
      case CommandType.DRAW:
        activeLayer.pixelCanvas.draw(command.u, command.v, (command as DrawCommand).color);
        break;

      default:
        break;
    }
  }
}

export default ExecutionPipeline;
