import styled from 'styled-components';

export const SettingsContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
`;

export const Button = styled.button`
  background-color: #7c3aed;
  color: #ffffff;
  cursor: pointer;

  font-weight: bold;
  outline: none;
  border: none;

  padding: 12px 25px;
  border-radius: 5px;

  &:hover {
    background-color: #9ca3af;
    color: #000000;
  }

  transition: all 0.3s ease-in-out;
`;

export const AvatarWrapper = styled.div<{ photoUrl: string | null | undefined }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #6d28d9;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  & svg {
    ${(props) => props.photoUrl && 'display: none;'};
  }

  &::before {
    content: '';
    background-color: #ede9fe;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 1px #c4b5fd solid;
    background-image: url(${(props) => props.photoUrl});
    background-position: center;
    background-size: cover;
  }
`;
