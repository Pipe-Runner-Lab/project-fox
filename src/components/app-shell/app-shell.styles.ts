import styled from 'styled-components';

export const AppShellContainer = styled.div`
  position: relative;

  height: 100vh;
  width: 100vw;
`;

export const AppShellWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  height: 100%;

  padding: 8px;

  & > * + * {
    margin-left: 8px;
  }

  backdrop-filter: blur(25px);
  background-color: rgba(207, 216, 220, 0.53);
`;

export const NavStage = styled.div`
  width: 64px;
`;

export const ContentStage = styled.div`
  flex: 1;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 8px;
  border-radius: 6px;
`;
