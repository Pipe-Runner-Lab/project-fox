import React from 'react';
import { PixelDustBoard } from 'pixel-dust';
import ToolBox from 'components/toolbox';
import {
  DrawingBoardContainer,
  CanvasWrapper,
  ToolBoxWrapper,
  LayerBoxWrapper
} from './drawing-board.styles';

function DrawingBoard(): JSX.Element {
  return (
    <DrawingBoardContainer>
      <ToolBoxWrapper>
        <ToolBox />
      </ToolBoxWrapper>
      <CanvasWrapper>
        <PixelDustBoard />
      </CanvasWrapper>
      <LayerBoxWrapper />
    </DrawingBoardContainer>
  );
}

export default DrawingBoard;
