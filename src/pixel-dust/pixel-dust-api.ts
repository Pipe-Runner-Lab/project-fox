import PixelDustEngine from './pixel-dust-engine';
import { CanvasType } from './pixel-canvas';
import { Layer } from './layer-manager';

export type PixelDustApiProps = {
  mountTarget: HTMLDivElement;
  dimension?: number;
  canvasType?: CanvasType;
  initializeWithLayer?: boolean;
  layerStackUpdateCB?: (layerStack: Layer[]) => void;
  activeLayerUpdateCB?: (layerStack: Layer | null) => void;
};

class PixelDustApi {
  pixelDustEngine: PixelDustEngine;

  constructor({
    mountTarget,
    dimension = 832,
    layerStackUpdateCB,
    activeLayerUpdateCB,
    canvasType = CanvasType.X64,
    initializeWithLayer = true
  }: PixelDustApiProps) {
    this.pixelDustEngine = new PixelDustEngine({ mountTarget, dimension, canvasType });
    if (this.pixelDustEngine.layerManager) {
      this.pixelDustEngine.layerManager.layerStackUpdateCB = layerStackUpdateCB;
      this.pixelDustEngine.layerManager.activeLayerUpdateCB = activeLayerUpdateCB;
    } else {
      throw Error('Could not set layer manager callbacks');
    }
    if (initializeWithLayer) {
      const addedLayer = this.pixelDustEngine.layerManager?.addLayerAfter();
      if (addedLayer) this.pixelDustEngine.layerManager?.setActiveLayer({ uuid: addedLayer.uuid });
    }
  }

  setForegroundColor(color: string): void {
    this.pixelDustEngine.drawingState.foregroundColor = color;
  }

  setBackgroundColor(color: string): void {
    this.pixelDustEngine.drawingState.backgroundColor = color;
  }

  addLayerAfter(arg?: { uuid?: string }): void {
    this.pixelDustEngine.layerManager?.addLayerAfter(arg);
  }

  setActiveLayer(arg: { uuid: string }): void {
    this.pixelDustEngine.layerManager?.setActiveLayer(arg);
  }

  deleteLayer(arg: { uuid: string | undefined }): void {
    this.pixelDustEngine.layerManager?.deleteLayer(arg);
  }
}

export { CanvasType };
export type { Layer };
export default PixelDustApi;
