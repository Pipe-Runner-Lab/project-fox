import CommandGenerator from './command-generator';
import EventManager, { EventType } from './event-manager';
import ExecutionPipeline from './execution-pipeline';
import LayerManager from './layer-manager';
import { CanvasType } from './pixel-canvas';
import './pixel-dust.css';

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

  drawingState = {
    foregroundColor: 'black',
    backgroundColor: 'white',
    instrument: InstrumentType.PEN
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

    this.layerManager = new LayerManager({
      canvasType,
      canvasContainerElement: this.pixelDustCanvasContainer,
      dimension
    });

    this.resetCoordinates();

    this.commandGenerator = new CommandGenerator();

    this.executionPipeline = new ExecutionPipeline({
      layerManager: this.layerManager,
      commandGenerator: this.commandGenerator
    });

    this.eventManager = new EventManager({ canvasContainerElement: this.pixelDustCanvasContainer });

    this.eventManager.registerObserver({
      event: EventType.SPACE_CLICK_DOWN_DRAG,
      method: this.moveContainer.bind(this)
    });
    this.eventManager.registerObserver({
      event: EventType.SPACE_CLICK_DOWN,
      method: this.moveContainerStart.bind(this)
    });
    this.eventManager.registerObserver({
      event: EventType.SPACE_CLICK_DOWN_DRAG,
      method: this.moveContainer.bind(this)
    });
    this.eventManager.registerObserver({
      event: EventType.CLICK_UP,
      method: this.moveContainerEnd.bind(this)
    });
    this.eventManager.registerObserver({
      event: EventType.SPACE_DOWN,
      method: () => this.pixelDustCanvasContainer?.style.setProperty('cursor', 'grab')
    });
    this.eventManager.registerObserver({
      event: EventType.SPACE_UP,
      method: () => this.pixelDustCanvasContainer?.style.setProperty('cursor', 'unset')
    });
    this.eventManager.registerObserver({
      event: EventType.CLICK_DOWN_DRAG,
      method: (x, y) => {
        const { top, left, width, height } = this.containerPosition;
        const u = (x - left) / width;
        const v = (y - top) / height;
        switch (this.drawingState.instrument) {
          case InstrumentType.PEN:
            this.commandGenerator?.draw(u, v, this.drawingState.foregroundColor);
            break;
          case InstrumentType.ERASER:
            this.commandGenerator?.erase(u, v);
            break;
          default:
            break;
        }
      }
    });
  }

  moveContainerStart(x: number, y: number): void {
    this.containerPosition = {
      ...this.containerPosition,
      x: Number(this.pixelDustCanvasContainer?.style.getPropertyValue('--stage-pos-x')),
      y: Number(this.pixelDustCanvasContainer?.style.getPropertyValue('--stage-pos-y'))
    };
    this.computationCache = {
      containerX: x,
      containerY: y
    };
  }

  moveContainer(x: number, y: number): void {
    this.pixelDustCanvasContainer?.style.setProperty(
      '--stage-pos-x',
      String(x - this.computationCache.containerX + this.containerPosition.x)
    );
    this.pixelDustCanvasContainer?.style.setProperty(
      '--stage-pos-y',
      String(y - this.computationCache.containerY + this.containerPosition.y)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveContainerEnd(x: number, y: number): void {
    this.resetCoordinates();
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
