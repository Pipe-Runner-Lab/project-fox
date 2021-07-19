import React, { useCallback, useRef, useState } from 'react';
import { PixelDustBoard } from 'pixel-dust';
import ToolBox from 'components/tool-box';
import LayerBox from 'components/layer-box';
import { Layer, InstrumentType } from 'pixel-dust/pixel-dust-api';
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

  const [layerStack, setLayerStack] = useState<Layer[]>([]);
  const [activeLayer, setActiveLayer] = useState<Layer | null>(null);

  const onLayerStackChange = useCallback((_layerStack: Layer[]): void => {
    setLayerStack([..._layerStack]);
  }, []);
  const onActiveLayerChange = useCallback((_activeLayer: Layer | null): void => {
    setActiveLayer(_activeLayer);
  }, []);

  const addLayerAfterOnEngine = useCallback(
    (arg?: { uuid?: string }): void => {
      pixelDustBoardRef.current?.pixelDustApi?.addLayerAfter(arg);
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
    (arg: { uuid: string | undefined }): void => {
      pixelDustBoardRef.current?.pixelDustApi?.deleteLayer(arg);
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
          addLayerAfter={addLayerAfterOnEngine}
          setActiveLayer={setActiveLayerOnEngine}
          deleteLayer={deleteLayerOnEngine}
          layerStack={layerStack}
          activeLayer={activeLayer}
        />
      </LayerBoxWrapper>
    </DrawingBoardContainer>
  );
}

export default DrawingBoard;
