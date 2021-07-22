import { v4 as uuidv4 } from 'uuid';
import PixelCanvas from './pixel-canvas';
import { LayerMetaData, CanvasType } from './types';

export type Layer = {
  pixelCanvas: PixelCanvas;
  uuid: string;
  imagePreview?: string;
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

  canvasLayerWrapperElement: HTMLDivElement;

  activeLayer: Layer | null = null;

  layerStackUpdateCB: undefined | ((arg: LayerMetaData[]) => void) = undefined;

  activeLayerUpdateCB: undefined | ((arg: LayerMetaData | null) => void) = undefined;

  constructor(options: LayerManagerProps) {
    this.layerStack = [];
    this.dimension = options.dimension;
    this.canvasType = options.canvasType;

    this.canvasLayerWrapperElement = document.createElement('div');
    this.canvasLayerWrapperElement.classList.add('canvas-layer-wrapper');

    options.canvasContainerElement.appendChild(this.canvasLayerWrapperElement);
  }

  // eslint-disable-next-line class-methods-use-this
  cleanUp(): void {
    console.info('clean up for layer manager called');
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
        pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid),
        uuid
      };
      this.canvasLayerWrapperElement.appendChild(layer.pixelCanvas.canvas);
      this.layerStack.push(layer);

      if (this.layerStackUpdateCB)
        this.layerStackUpdateCB(
          this.layerStack.map((_layer) => ({
            uuid: _layer.uuid,
            imagePreview: _layer.imagePreview
          }))
        );

      return layer;
    }

    // TODO: If uuid provided
    const uuid = uuidv4();
    const layer = {
      pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid),
      uuid
    };
    this.layerStack.push(layer);
    return layer;
  }

  addLayerBefore(arg: { uuid: string }): Layer {
    console.log(arg);
    const uuid = uuidv4();
    const layer = {
      pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid),
      uuid
    };

    for (let idx = 0, { length } = this.layerStack; idx < length; idx += 1) {
      if (this.layerStack[idx].uuid === arg.uuid) {
        this.canvasLayerWrapperElement.insertBefore(
          layer.pixelCanvas.canvas,
          this.layerStack[idx].pixelCanvas.canvas
        );
        this.layerStack.splice(idx, 0, layer);
        break;
      }
    }

    if (this.layerStackUpdateCB)
      this.layerStackUpdateCB(
        this.layerStack.map((_layer) => ({
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview
        }))
      );

    return layer;
  }

  deleteLayer(arg: { uuid: string }): void {
    const [selectedLayer, ...rest] = this.layerStack.filter((layer) => layer.uuid === arg.uuid);
    if (rest.length > 0) {
      throw Error('uuid matches more than one layer');
    }
    if (!selectedLayer) {
      throw Error('uuid does not match any layer');
    }
    this.canvasLayerWrapperElement.removeChild(selectedLayer.pixelCanvas.canvas);
    this.layerStack = this.layerStack.filter((layer) => layer.uuid !== selectedLayer.uuid);

    if (this.layerStackUpdateCB)
      this.layerStackUpdateCB(
        this.layerStack.map((_layer) => ({
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview
        }))
      );

    this.setActiveLayer(null);
  }

  updateLayerPreview(): void {
    for (let idx = 0, { length } = this.layerStack; idx < length; idx += 1) {
      const layer = this.layerStack[idx];
      layer.imagePreview = layer.pixelCanvas.canvas.toDataURL('img/png');
    }

    if (this.layerStackUpdateCB) this.layerStackUpdateCB(this.layerStack);
  }
}

export default LayerManager;
