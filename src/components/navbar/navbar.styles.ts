import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const PrimaryIconContainer = styled.div`
  & > * + * {
    margin-top: 8px;
  }
`;

export const IconWrapper = styled.div<{ active?: boolean }>`
  height: 56px;
  width: 56px;
  font-size: 32px;
  color: #9ca3af;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;

  &:not(.active):hover {
    color: #6b7280;
  }

  &.active {
    color: #7c3aed;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  height: 56px;
  width: 56px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  color: #6d28d9;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  & svg {
    position: relative;
  }

  &::before {
    content: '';
    position: absolute;
    background-color: #ede9fe;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 1px #c4b5fd solid;
  }
`;
