import { map, filter, tap, debounceTime } from 'rxjs/operators';
import CommandGenerator from './command-generator';
import LayerManager from './layer-manager';
import { LayerCommandType, InstrumentType } from './types';
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

    const drawCommand$ = this.commandGenerator.canvasCommand$.pipe(
      filter(() => !!this.layerManager.activeLayer),
      map((command) => {
        if (!this.layerManager.activeLayer?.uuid) {
          throw new Error('Active layer needed to store history');
        }

        return {
          ...command,
          activeLayerUuid: this.layerManager.activeLayer?.uuid
        };
      }),
      tap((command) => {
        switch (command.instrument) {
          case InstrumentType.PEN:
            this.layerManager.activeLayer?.pixelCanvas.draw(command.x, command.y, command.color);
            break;
          case InstrumentType.ERASER:
            this.layerManager.activeLayer?.pixelCanvas.erase(command.x, command.y);
            break;
          default:
            break;
        }
      })
    );

    const layerCommand$ = this.commandGenerator.layerCommand$.pipe(
      map((command) => {
        switch (command.type) {
          case LayerCommandType.ADD_AFTER: {
            const { uuid: generatedUuid } = this.layerManager.addLayerAfter({
              uuid: command.uuid
            });
            return { ...command, generatedUuid };
          }
          case LayerCommandType.ADD_BEFORE: {
            console.log(command);
            const { uuid: generatedUuid } = this.layerManager.addLayerBefore({
              uuid: command.uuid
            });
            return { ...command, generatedUuid };
          }
          case LayerCommandType.DELETE: {
            this.layerManager.deleteLayer({ uuid: command.uuid });
            return command;
          }
          case LayerCommandType.HIDE: {
            this.layerManager.hideLayer({ uuid: command.uuid });
            return command;
          }
          case LayerCommandType.SHOW: {
            this.layerManager.showLayer({ uuid: command.uuid });
            return command;
          }
          default:
            throw new Error('Layer command not supported');
        }
      })
    );

    this.commandHistory = new CommandHistory({
      drawCommand$,
      layerCommand$
    });

    drawCommand$.pipe(debounceTime(2500)).subscribe({
      next: () => {
        this.layerManager.updateLayerPreview();
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  cleanUp(): void {
    this.commandHistory.cleanUp();
    console.info('clean up for execution pipeline called');
  }
}

export default ExecutionPipeline;
