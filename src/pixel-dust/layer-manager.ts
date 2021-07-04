import { v4 as uuidv4 } from 'uuid';
import PixelCanvas, { CanvasType } from './pixel-canvas';

export type Layer = {
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

  layerStackUpdateCB: undefined | ((arg: Layer[]) => void) = undefined;

  activeLayerUpdateCB: undefined | ((arg: Layer | null) => void) = undefined;

  constructor(options: LayerManagerProps) {
    this.layerStack = [];
    this.dimension = options.dimension;
    this.canvasType = options.canvasType;
    this.canvasContainerElement = options.canvasContainerElement;
  }

  setActiveLayer(arg: { uuid: string } | null): void {
    if (arg) {
      const filterOutput = this.layerStack.filter((layer) => layer.uuid === arg.uuid);

      if (filterOutput.length > 1) {
        throw Error('uuid matches more than one layer');
      } else if (filterOutput.length < 1) {
        throw Error('uuid does not match any layer');
      } else {
        const [layer] = filterOutput;
        this.activeLayer = layer;
      }
    } else {
      this.activeLayer = null;
    }

    if (this.activeLayerUpdateCB) this.activeLayerUpdateCB(this.activeLayer);
  }

  getActiveLayer(): Layer | null {
    return this.activeLayer;
  }

  getActiveLayerUUID(): string | null {
    return this.activeLayer?.uuid ?? null;
  }

  addLayerAfter(arg?: { uuid?: string }): Layer {
    if (!arg?.uuid) {
      const uuid = uuidv4();
      const layer = {
        pixelCanvas: new PixelCanvas(
          this.canvasType,
          this.dimension,
          this.canvasContainerElement,
          uuid
        ),
        uuid
      };
      this.layerStack.push(layer);
      if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack);
      return layer;
    }
    // TODO
    const uuid = uuidv4();
    const layer = {
      pixelCanvas: new PixelCanvas(
        this.canvasType,
        this.dimension,
        this.canvasContainerElement,
        uuid
      ),
      uuid
    };
    this.layerStack.push(layer);
    return layer;
  }

  addLayerBefore(arg: { uuid: string }): void {
    if (!arg.uuid) {
      const uuid = uuidv4();
      this.layerStack.push({
        pixelCanvas: new PixelCanvas(
          this.canvasType,
          this.dimension,
          this.canvasContainerElement,
          uuid
        ),
        uuid
      });
    }
    // TODO
  }

  deleteLayer(arg: { uuid: string | undefined }): void {
    if (arg.uuid) {
      const [selectedLayer, ...rest] = this.layerStack.filter((layer) => layer.uuid === arg.uuid);
      if (rest.length > 0) {
        throw Error('uuid matches more than one layer');
      }
      if (!selectedLayer) {
        throw Error('uuid does not match any layer');
      }
      selectedLayer.pixelCanvas.deRegister(this.canvasContainerElement);
      this.layerStack = this.layerStack.filter((layer) => layer.uuid !== selectedLayer.uuid);
      if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack);
      this.setActiveLayer(null);
    }
  }
}

export default LayerManager;
