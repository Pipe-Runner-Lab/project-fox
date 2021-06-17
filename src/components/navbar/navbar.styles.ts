import styled from "styled-components";

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

export const SecondaryIconsContainer = styled.div``;

export const IconWrapper = styled.div<{ active?: boolean }>`
  height: 56px;
  width: 56px;
  font-size: 32px;
  ${(props) =>
    props.active
      ? `
    color: #7C3AED;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  `
      : `
      color: #9ca3af;
      `}
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
    color: #6b7280;
  }
`;
