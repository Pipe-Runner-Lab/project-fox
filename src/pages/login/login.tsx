import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'provider/auth';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFoursquare as Icon } from 'react-icons/io';
import {
  LoginContainer,
  AuthContainer,
  RightContainer,
  LeftContainer,
  TextArea,
  ButtonArea,
  TextAreaDes,
  Backdrop,
  ImgContainer,
  Backdrop2,
  Button
} from './login.styles';
import BackImg from '../../assets/img/Dots_Square.png';
import HeroImage from '../../assets/img/HeroImage.png';

function Login(): JSX.Element {
  const { user, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('../', { replace: true });
    }
  }, [navigate, user]);

  return (
    <LoginContainer>
      <AuthContainer>
        <LeftContainer>
          <Icon
            style={{
              fontSize: '55px'
            }}
          />
          <TextArea>
            <p>An world of pixel art community for everyone!</p>
          </TextArea>
          <TextAreaDes>
            <p>
              A safe platform for users of all ages. Create beautiful pixel art, share, and more !
              Our tools promote a technology-based future that encourages programming, digital art,
              and computers.
            </p>
          </TextAreaDes>
          <ButtonArea>
            <Button className="active" onClick={googleSignIn}>
              <FcGoogle
                style={{
                  fontSize: '35px',
                  backgroundColor: 'white',
                  padding: '2px',
                  margin: '-0px -5px'
                }}
              />
              <span style={{ color: 'white', fontSize: '18px' }}>Sign in with google</span>
            </Button>
          </ButtonArea>
        </LeftContainer>
        <RightContainer>
          <Backdrop>
            <img src={BackImg} alt="backdrop" />
          </Backdrop>
          <Backdrop2>
            <img src={BackImg} alt="backdrop" />
          </Backdrop2>
          <ImgContainer>
            <img src={HeroImage} alt="heroimage" />
          </ImgContainer>
        </RightContainer>
      </AuthContainer>
    </LoginContainer>
  );
}

export default Login;
