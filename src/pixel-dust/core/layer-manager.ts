import { v4 as uuidv4 } from 'uuid';
import PixelCanvas from '../canvas/pixel-canvas';
import { LayerMetaData, CanvasType } from '../types/types';

export type Layer = {
  pixelCanvas: PixelCanvas;
  uuid: string;
  imagePreview?: string;
  hidden: boolean;
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
        uuid,
        hidden: false
      };
      this.canvasLayerWrapperElement.appendChild(layer.pixelCanvas.canvas);
      this.layerStack.push(layer);

      if (this.layerStackUpdateCB)
        this.layerStackUpdateCB(
          this.layerStack.map((_layer) => ({
            uuid: _layer.uuid,
            imagePreview: _layer.imagePreview,
            hidden: _layer.hidden
          }))
        );

      return layer;
    }

    // TODO: If uuid provided
    const uuid = uuidv4();
    const layer = {
      pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid),
      uuid,
      hidden: false
    };
    this.layerStack.push(layer);
    return layer;
  }

  hideLayer(arg: { uuid: string }): void {
    const layer = this.layerStack.find((_layer) => _layer.uuid === arg.uuid);

    if (layer) {
      layer.hidden = true;
      layer.pixelCanvas.canvas.style.setProperty('opacity', '0');
    }

    if (this.layerStackUpdateCB)
      this.layerStackUpdateCB(
        this.layerStack.map((_layer) => ({
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        }))
      );
  }

  showLayer(arg: { uuid: string }): void {
    const layer = this.layerStack.find((_layer) => _layer.uuid === arg.uuid);

    if (layer) {
      layer.hidden = false;
      layer.pixelCanvas.canvas.style.setProperty('opacity', '1');
    }

    if (this.layerStackUpdateCB)
      this.layerStackUpdateCB(
        this.layerStack.map((_layer) => ({
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        }))
      );
  }

  addLayerBefore(arg: { uuid: string }): Layer {
    console.log(arg);
    const uuid = uuidv4();
    const layer = {
      pixelCanvas: new PixelCanvas(this.canvasType, this.dimension, uuid),
      uuid,
      hidden: false
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
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
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
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        }))
      );

    this.setActiveLayer(null);
  }

  insertLayerBefore(arg: { destinationUuid: string; uuid: string }): void {
    const destinationLayer = this.layerStack.find((_layer) => _layer.uuid === arg.destinationUuid);
    const layer = this.layerStack.find((_layer) => _layer.uuid === arg.uuid);

    if (layer && destinationLayer) {
      const filteredLayerStack = this.layerStack.filter((_layer) => _layer.uuid !== arg.uuid);

      for (let idx = 0, { length } = filteredLayerStack; idx < length; idx += 1) {
        if (filteredLayerStack[idx].uuid === arg.destinationUuid) {
          filteredLayerStack.splice(idx, 0, layer);

          this.layerStack = filteredLayerStack;

          this.canvasLayerWrapperElement.insertBefore(
            layer.pixelCanvas.canvas,
            destinationLayer.pixelCanvas.canvas
          );
          break;
        }
      }

      if (this.layerStackUpdateCB)
        this.layerStackUpdateCB(
          this.layerStack.map((_layer) => ({
            uuid: _layer.uuid,
            imagePreview: _layer.imagePreview,
            hidden: _layer.hidden
          }))
        );
    }
  }

  insertLayerAfter(arg: { destinationUuid: string; uuid: string }): void {
    const destinationLayer = this.layerStack.find((_layer) => _layer.uuid === arg.destinationUuid);
    const layer = this.layerStack.find((_layer) => _layer.uuid === arg.uuid);

    if (layer && destinationLayer) {
      const filteredLayerStack = this.layerStack.filter((_layer) => _layer.uuid !== arg.uuid);

      for (let idx = 0, { length } = filteredLayerStack; idx < length; idx += 1) {
        if (filteredLayerStack[idx].uuid === arg.destinationUuid) {
          if (idx === filteredLayerStack.length - 1) {
            filteredLayerStack.push(layer);
          } else {
            filteredLayerStack.splice(idx + 1, 0, layer);
          }

          this.layerStack = filteredLayerStack;

          this.canvasLayerWrapperElement.insertBefore(
            layer.pixelCanvas.canvas,
            destinationLayer.pixelCanvas.canvas.nextSibling
          );
          break;
        }
      }

      if (this.layerStackUpdateCB)
        this.layerStackUpdateCB(
          this.layerStack.map((_layer) => ({
            uuid: _layer.uuid,
            imagePreview: _layer.imagePreview,
            hidden: _layer.hidden
          }))
        );
    }
  }

  async updateLayerPreview(): Promise<void> {
    const promiseArray = [];

    for (let idx = 0, { length } = this.layerStack; idx < length; idx += 1) {
      const layer = this.layerStack[idx];
      promiseArray.push(layer.pixelCanvas.getCanvasBlob());
    }

    const blobArray = await Promise.all(promiseArray);

    for (let idx = 0, { length } = this.layerStack; idx < length; idx += 1) {
      const layer = this.layerStack[idx];
      layer.imagePreview = blobArray[idx] ? URL.createObjectURL(blobArray[idx]) : undefined;
    }

    if (this.layerStackUpdateCB)
      this.layerStackUpdateCB(
        this.layerStack.map((_layer) => ({
          uuid: _layer.uuid,
          imagePreview: _layer.imagePreview,
          hidden: _layer.hidden
        }))
      );
  }

  exportImage(): void {
    const imageArray = this.layerStack.map((layer) => {
      const image = new Image();
      image.src = layer?.imagePreview ?? '';
      return image;
    });
    const finalImage = document.createElement('canvas');
    finalImage.width = this.dimension;
    finalImage.height = this.dimension;
    const ctx = finalImage.getContext('2d');
    if (ctx) {
      for (let i = 0; i < imageArray.length; i += 1) {
        ctx.drawImage(imageArray[i], this.dimension, this.dimension);
      }
      console.log(finalImage.toDataURL('img/png'));
    } else {
      throw Error('Context is null');
    }
  }
}

export default LayerManager;
