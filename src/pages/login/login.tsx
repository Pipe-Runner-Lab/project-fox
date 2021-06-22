import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import GoogleButton from 'react-google-button';
import { FaArrowRight as ArrowIcons } from 'react-icons/fa';
import { AuthContainer, RightContainer, LeftContainer, TextArea, ButtonArea } from './login.styles';
import HeroImage from './img/heroimage';

function Login(): JSX.Element {
  return (
    <AuthContainer>
      <LeftContainer>
        <TextArea>
          Login to continue <ArrowIcons />
        </TextArea>
        <ButtonArea>
          <GoogleButton />
        </ButtonArea>
      </LeftContainer>
      <RightContainer>
        <HeroImage />
      </RightContainer>
    </AuthContainer>
  );
}

export default Login;
