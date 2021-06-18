import styled from 'styled-components';

export const BackdropContainer = styled.div`
  position: relative;

  height: 100%;

  opacity: 0.9;
`;

export const Ball = styled.div`
  position: absolute;
  border-radius: 50%;

  height: 70vh;
  width: 70vh;

  mix-blend-mode: multiply;

  opacity: 0.4;
`;
