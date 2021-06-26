import styled from 'styled-components';

export const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

export const AuthContainer = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: 150px;
  display: flex;
  height: 100%;
  position: absolute;
  gap: 20px;
`;

export const LeftContainer = styled.div`
  width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const TextArea = styled.div`
  font-family: 'Merriweather Sans', sans-serif;
  font-size: 60px;
  margin-bottom: -60px;
`;

export const TextAreaDes = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgb(23, 119, 245);
  border: 0px;
  border-radius: 3px;
  transition: 0.5s;
`;

export const ButtonArea = styled.div`
  font-family: sans-serif;
  top: 10px;
  & ${Button}:hover {
    transform: scale(1.1);
  }
`;

export const RightContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: 50px;
`;
export const Backdrop = styled.div`
  position: absolute;
  position: sticky;
  top: 25px;
  left: 0px;
`;
export const Backdrop2 = styled.div`
  position: absolute;
  position: sticky;
  bottom: 25px;
  right: 10px;
`;

export const ImgContainer = styled.div`
  position: absolute;
  position: sticky;
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.35);
  box-shadow: 1px 8px 12px 4px #d3cfd6;
`;
