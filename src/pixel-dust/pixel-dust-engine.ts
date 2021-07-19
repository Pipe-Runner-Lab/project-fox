import CommandGenerator from './command-generator';
import EventManager from './event-manager';
import ExecutionPipeline from './execution-pipeline';
import LayerManager from './layer-manager';
import { CanvasType } from './pixel-canvas';
import './pixel-dust.css';

type PixelDustEngineProps = {
  mountTarget: HTMLDivElement;
  dimension: number;
  initializeWithLayer?: true;
  canvasType: CanvasType;
};

class PixelDustEngine {
  mountTarget: HTMLDivElement;

  pixelDustCanvasContainer: HTMLDivElement | undefined;

  dimension: number;

  eventManager: EventManager | undefined;

  layerManager: LayerManager | undefined;

  commandGenerator: CommandGenerator | undefined;

  executionPipeline: ExecutionPipeline | undefined;

  containerPosition = {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    height: 0,
    width: 0
  };

  computationCache = {
    containerX: 0,
    containerY: 0
  };

  constructor({ mountTarget, dimension, canvasType }: PixelDustEngineProps) {
    this.dimension = dimension;
    this.mountTarget = mountTarget;
    this.initializeDrawingStage(canvasType, dimension);
  }

  initializeDrawingStage(canvasType: CanvasType, dimension: number): void {
    const stage = document.createElement('div');
    stage.classList.add('pixel-dust-stage');

    this.pixelDustCanvasContainer = document.createElement('div');
    this.pixelDustCanvasContainer.classList.add('pixel-dust-canvas-container');
    this.pixelDustCanvasContainer.style.setProperty('height', `${dimension}px`);
    this.pixelDustCanvasContainer.style.setProperty('width', `${dimension}px`);

    stage.appendChild(this.pixelDustCanvasContainer);
    this.mountTarget.appendChild(stage);

    this.resetCoordinates();

    this.eventManager = new EventManager({
      canvasContainerElement: this.pixelDustCanvasContainer
    });

    this.eventManager.canvasMove$.subscribe({
      next: (arg) => {
        if (arg) {
          const { x, y } = arg;
          this.pixelDustCanvasContainer?.style.setProperty('--stage-pos-x', String(x));
          this.pixelDustCanvasContainer?.style.setProperty('--stage-pos-y', String(y));
        }
      },
      complete: () => {},
      error: (error) => console.error(error)
    });

    this.eventManager.canvasScale$.subscribe({
      next: (arg) => {
        if (arg) {
          this.pixelDustCanvasContainer?.style.setProperty('--stage-scale', String(arg.scale));
        }
      },
      complete: () => {},
      error: (error) => console.error(error)
    });

    this.layerManager = new LayerManager({
      canvasType,
      canvasContainerElement: this.pixelDustCanvasContainer,
      dimension
    });

    this.commandGenerator = new CommandGenerator({
      dimension: this.dimension,
      canvasType,
      drawStream: this.eventManager.canvasDraw$
    });

    this.executionPipeline = new ExecutionPipeline({
      layerManager: this.layerManager,
      commandGenerator: this.commandGenerator
    });
  }

  resetCoordinates(): void {
    const rect = this.pixelDustCanvasContainer?.getBoundingClientRect();

    this.containerPosition = {
      ...this.containerPosition,
      top: rect?.top ?? 0,
      left: rect?.left ?? 0,
      height: rect?.height ?? this.dimension,
      width: rect?.width ?? this.dimension
    };
  }
}

export default PixelDustEngine;
