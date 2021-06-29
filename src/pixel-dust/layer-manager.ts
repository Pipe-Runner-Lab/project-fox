import { v4 as uuidv4 } from 'uuid';
import PixelCanvas, { CanvasType } from './pixel-canvas';

type Layer = {
  pixelCanvas: PixelCanvas;
  uuid: string;
};

type LayerManagerProps = {
  canvasContainerElement: HTMLDivElement;
  dimension: number;
  canvasType: CanvasType;
};

class LayerManager {
  layerStack: Layer[];

  dimension: number;

  canvasType: CanvasType;

  canvasContainerElement: HTMLDivElement;

  activeLayer: Layer | null = null;

  constructor(options: LayerManagerProps) {
    this.layerStack = [];
    this.dimension = options.dimension;
    this.canvasType = options.canvasType;
    this.canvasContainerElement = options.canvasContainerElement;
  }

  setActiveLayer({ uuid }: { uuid: string }): void {
    const filterOutput = this.layerStack.filter((layer) => layer.uuid === uuid);

    if (filterOutput.length > 1) {
      throw Error('uuid matches more than one layer');
    } else if (filterOutput.length < 1) {
      throw Error('uuid does not match any layer');
    } else {
      const [layer] = filterOutput;
      this.activeLayer = layer;
    }
  }

  getActiveLayer(): Layer | null {
    return this.activeLayer;
  }

  getActiveLayerUUID(): string | null {
    return this.activeLayer?.uuid ?? null;
  }

  addLayerAfter(args?: { uuid?: string }): Layer {
    if (!args?.uuid) {
      const layer = {
        pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, this.canvasContainerElement),
        uuid: uuidv4()
      };
      this.layerStack.push(layer);
      return layer;
    }
    // TODO
    const layer = {
      pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, this.canvasContainerElement),
      uuid: uuidv4()
    };
    this.layerStack.push(layer);
    return layer;
  }

  addLayerBefore({ uuid }: { uuid: string }): void {
    if (!uuid) {
      this.layerStack.push({
        pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, this.canvasContainerElement),
        uuid: uuidv4()
      });
    }
    // TODO
  }
}

export default LayerManager;
