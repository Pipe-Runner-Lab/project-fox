import { map, filter, tap, finalize, repeat, share, reduce } from 'rxjs/operators';
import CommandGenerator from './command-generator';
import LayerManager from './layer-manager';
import { HistoryCommands, InstrumentType, LayerCommandType } from '../types/types';
import CommandHistory from './command-history';
import PreviewCanvas from '../canvas/preview-canvas';

type ExecutionPipelineProps = {
  layerManager: LayerManager;
  commandGenerator: CommandGenerator;
  previewCanvas: PreviewCanvas;
};

class ExecutionPipeline {
  layerManager: LayerManager;

  previewCanvas: PreviewCanvas;

  commandGenerator: CommandGenerator;

  commandHistory: CommandHistory;

  constructor(options: ExecutionPipelineProps) {
    this.layerManager = options.layerManager;
    this.commandGenerator = options.commandGenerator;
    this.previewCanvas = options.previewCanvas;

    this.commandGenerator.previewCanvasCommand$
      .pipe(
        finalize(() => {
          this.previewCanvas.refresh();
        }),
        repeat()
      )
      .subscribe({
        next: (command) => {
          this.previewCanvas.preview(command);
        }
      });

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
        this.layerManager.activeLayer?.pixelCanvas.execute(command);
      }),
      reduce(
        (acc: HistoryCommands, command) => {
          if (command.instrument === InstrumentType.PEN) {
            acc.color = command.color;
          }

          acc.instrument = command.instrument;
          acc.activeLayerUuid = command.activeLayerUuid;
          acc.cartesianArray.push({ x: command.x, y: command.y });
          return acc;
        },
        {
          instrument: InstrumentType.PEN,
          color: undefined,
          activeLayerUuid: '',
          cartesianArray: []
        }
      ),
      repeat(),
      share()
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
          case LayerCommandType.INSERT_AFTER: {
            this.layerManager.insertLayerAfter({
              uuid: command.uuid,
              destinationUuid: command.destinationUuid
            });
            return command;
          }
          case LayerCommandType.INSERT_BEFORE: {
            this.layerManager.insertLayerBefore({
              uuid: command.uuid,
              destinationUuid: command.destinationUuid
            });
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

    drawCommand$.subscribe({
      next: () => {
        this.layerManager.updateLayerPreview();
        this.layerManager.exportImage();
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
