import styled from 'styled-components';

export const LayerContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const LayerInteractionContainer = styled.div`
  height: 38px;
  border-bottom: 1px #e1e8eb solid;
  display: flex;
`;

export const AddLayerButton = styled.button`
  flex: 1;
  display: block;
  cursor: pointer;
  color: #6b7280;
  border-radius: 5px 0px 0px 0px;
  background-color: #f3f4f6;
  border: 0px;

  &:hover {
    color: #4b5563;
    background-color: #e5e7eb;
  }

  & > svg {
    font-size: 20px;
  }
`;

export const DeleteLayerButton = styled.button`
  flex: 1;
  display: block;
  cursor: pointer;
  color: #6b7280;
  border-radius: 0px 5px 0px 0px;
  background-color: #f3f4f6;
  border: 0px;

  &:hover {
    color: #4b5563;
    background-color: #e5e7eb;
  }

  & > svg {
    font-size: 20px;
  }
`;

export const Divider = styled.div`
  width: 1px;
  background-color: #e1e8eb;
  height: 100%;
`;

export const LayerStackContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const LayerStackWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
  justify-content: flex-end;

  & > div + div {
    margin-top: 8px;
  }
`;

export const LayerCard = styled.div<{ active: boolean; imageUrl?: string }>`
  height: 122px;
  border: 1px ${(props) => (props.active ? '#8b5cf6' : '#d1d5db')} solid;
  border-radius: 5px;
  background: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : '#f3f4f6')};
  background-size: contain;
  cursor: pointer;
`;
