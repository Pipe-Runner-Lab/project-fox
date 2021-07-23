import React, { useCallback, useRef, useState } from 'react';
import { PixelDustBoard } from 'pixel-dust';
import ToolBox from 'components/tool-box';
import LayerBox from 'components/layer-box';
import { InstrumentType, LayerMetaData } from 'pixel-dust/pixel-dust-api';
import { useParams } from 'react-router';
import {
  DrawingBoardContainer,
  CanvasWrapper,
  ToolBoxWrapper,
  LayerBoxWrapper
} from './drawing-board.styles';

function DrawingBoard(): JSX.Element {
  const { id } = useParams();
  console.log('Project ID: ', id);

  const pixelDustBoardRef = useRef<PixelDustBoard>(null);

  const [activeInstrument, setActiveInstrument] = useState<InstrumentType>(InstrumentType.PEN);
  const [activeForegroundRGBA, setActiveForegroundRGBA] = useState<string>('#000000');
  const [activeBackgroundRGBA, setActiveBackgroundRGBA] = useState<string>('#ffffff');

  const [layerStack, setLayerStack] = useState<LayerMetaData[]>([]);
  const [activeLayer, setActiveLayer] = useState<LayerMetaData | null>(null);

  const onLayerStackChange = useCallback((_layerStack: LayerMetaData[]): void => {
    setLayerStack([..._layerStack].reverse());
  }, []);
  const onActiveLayerChange = useCallback((_activeLayer: LayerMetaData | null): void => {
    setActiveLayer(_activeLayer);
  }, []);

  const addLayerAfterOnEngine = useCallback(
    (arg?: { uuid?: string }): void => {
      pixelDustBoardRef.current?.pixelDustApi?.addLayerAfter(arg);
    },
    [pixelDustBoardRef]
  );

  const addLayerBeforeOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustBoardRef.current?.pixelDustApi?.addLayerBefore(arg);
    },
    [pixelDustBoardRef]
  );

  const setActiveLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustBoardRef.current?.pixelDustApi?.setActiveLayer(arg);
    },
    [pixelDustBoardRef]
  );

  const deleteLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustBoardRef.current?.pixelDustApi?.deleteLayer(arg);
    },
    [pixelDustBoardRef]
  );

  const hideLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustBoardRef.current?.pixelDustApi?.hideLayer(arg);
    },
    [pixelDustBoardRef]
  );

  const showLayerOnEngine = useCallback(
    (arg: { uuid: string }): void => {
      pixelDustBoardRef.current?.pixelDustApi?.showLayer(arg);
    },
    [pixelDustBoardRef]
  );

  const insertLayerAfterOnEngine = useCallback(
    (arg: { uuid: string; destinationUuid: string }): void => {
      pixelDustBoardRef.current?.pixelDustApi?.insertLayerAfter(arg);
    },
    [pixelDustBoardRef]
  );

  const insertLayerBeforeOnEngine = useCallback(
    (arg: { uuid: string; destinationUuid: string }): void => {
      pixelDustBoardRef.current?.pixelDustApi?.insertLayerBefore(arg);
    },
    [pixelDustBoardRef]
  );

  return (
    <DrawingBoardContainer>
      <ToolBoxWrapper>
        <ToolBox
          instrument={activeInstrument}
          onChangeInstrument={setActiveInstrument}
          onChangeForegroundColor={setActiveForegroundRGBA}
          onChangeBackgroundColor={setActiveBackgroundRGBA}
        />
      </ToolBoxWrapper>
      <CanvasWrapper>
        <PixelDustBoard
          ref={pixelDustBoardRef}
          instrument={activeInstrument}
          foregroundColor={activeForegroundRGBA}
          backgroundColor={activeBackgroundRGBA}
          onLayerStackChange={onLayerStackChange}
          onActiveLayerChange={onActiveLayerChange}
        />
      </CanvasWrapper>
      <LayerBoxWrapper>
        <LayerBox
          addLayerBefore={addLayerBeforeOnEngine}
          addLayerAfter={addLayerAfterOnEngine}
          setActiveLayer={setActiveLayerOnEngine}
          deleteLayer={deleteLayerOnEngine}
          layerStack={layerStack}
          activeLayer={activeLayer}
          hideLayer={hideLayerOnEngine}
          showLayer={showLayerOnEngine}
          insertLayerAfter={insertLayerAfterOnEngine}
          insertLayerBefore={insertLayerBeforeOnEngine}
        />
      </LayerBoxWrapper>
    </DrawingBoardContainer>
  );
}

export default DrawingBoard;
