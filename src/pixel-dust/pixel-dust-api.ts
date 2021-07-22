import PixelDustEngine from './pixel-dust-engine';
import { LayerMetaData, LayerCommandType, CanvasType, InstrumentType } from './types';

type PixelDustApiProps = {
  mountTarget: HTMLDivElement;
  dimension?: number;
  canvasType?: CanvasType;
  initializeWithLayer?: boolean;
  layerStackUpdateCB?: (layerStack: LayerMetaData[]) => void;
  activeLayerUpdateCB?: (layerStack: LayerMetaData | null) => void;
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
      const addedLayer = this.pixelDustEngine.layerManager.addLayerAfter();
      if (addedLayer) this.pixelDustEngine.layerManager.setActiveLayer({ uuid: addedLayer.uuid });
    }
  }

  cleanUp(): void {
    this.pixelDustEngine.cleanUp();
  }

  setForegroundColor(color: string): void {
    if (this.pixelDustEngine.commandGenerator.drawingState.foregroundColor)
      this.pixelDustEngine.commandGenerator.drawingState.foregroundColor = color;
  }

  setBackgroundColor(color: string): void {
    if (this.pixelDustEngine.commandGenerator.drawingState.backgroundColor)
      this.pixelDustEngine.commandGenerator.drawingState.backgroundColor = color;
  }

  setInstrumentType(instrument: InstrumentType): void {
    if (this.pixelDustEngine.commandGenerator.drawingState.instrument)
      this.pixelDustEngine.commandGenerator.drawingState.instrument = instrument;
  }

  addLayerAfter(arg?: { uuid?: string }): void {
    this.pixelDustEngine.commandGenerator.layerCommand$.next({
      type: LayerCommandType.ADD_AFTER,
      ...arg
    });
  }

  addLayerBefore(arg: { uuid: string }): void {
    this.pixelDustEngine.commandGenerator.layerCommand$.next({
      type: LayerCommandType.ADD_BEFORE,
      ...arg
    });
  }

  setActiveLayer(arg: { uuid: string }): void {
    this.pixelDustEngine.layerManager.setActiveLayer(arg);
  }

  deleteLayer(arg: { uuid: string }): void {
    this.pixelDustEngine.commandGenerator.layerCommand$.next({
      type: LayerCommandType.DELETE,
      ...arg
    });
  }
}

export { CanvasType, InstrumentType };
export type { LayerMetaData };
export default PixelDustApi;
