import React from 'react';
import { AiOutlineLoading3Quarters as SpinnerIcon } from 'react-icons/ai';
import { SpinnerContainer } from './spinner.styles';

function Spinner(): JSX.Element {
  return (
    <SpinnerContainer>
      <SpinnerIcon />
    </SpinnerContainer>
  );
}

export default Spinner;
