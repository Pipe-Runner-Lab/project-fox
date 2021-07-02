import styled from 'styled-components';

export const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: flex-start;
  justify-content: center;
`;

export const IconWrapper = styled.div<{ active?: boolean }>`
  height: 56px;
  width: 56px;
  font-size: 32px;
  color: #000000;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
  &:active {
    color: red;
  }
  &:hover {
    cursor: pointer;
    color: #6b7280;
  }
`;
export const ColorBar = styled.div`
  display: flex;
  /* /* position: relative; */
  /* align-items: center; */
  justify-content: center;
  margin-top: 25px;
  height: 100px;
`;
