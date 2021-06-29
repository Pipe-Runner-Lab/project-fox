import styled from 'styled-components';

export const DrawingBoardContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;

  & > * + * {
    margin-left: 8px;
  }

  & > div {
    border-radius: 5px;
  }
`;

export const CanvasWrapper = styled.div`
  flex: 1;
  border: 1px #e1e8eb solid;
  overflow: hidden;
`;

export const ToolBoxWrapper = styled.div`
  width: 360px;
  border: 1px #e1e8eb solid;
`;

export const LayerBoxWrapper = styled.div`
  padding: 8px;

  width: 140px;
  border: 1px #e1e8eb solid;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  & > * + * {
    margin-top: 8px;
  }
`;

export const LayerCard = styled.div`
  height: 80px;
  backdrop-filter: blur(20px);
  background-color: rgba(207, 216, 220, 0.53);
  border-radius: 5px;
  border: 1px solid #dbe6fd;
  cursor: pointer;

  &.active {
    border-color: #5e8b7e;
  }
`;
