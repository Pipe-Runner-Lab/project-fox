import React from "react";
import { BackdropContainer, Ball } from "./backdrop.styles";

function Backdrop(): JSX.Element {
  return (
    <BackdropContainer>
      <Ball
        style={{
          backgroundColor: "#ffed99",
          top: '10%',
          left: 0,
        }}
      />
      <Ball
        style={{
          backgroundColor: "#f6b8b8",
          top: 0,
          left: '15%',
        }}
      />
      <Ball
        style={{
          backgroundColor: "#ac66cc",
          bottom: 0,
          left: '20%',
        }}
      />
    </BackdropContainer>
  );
}

export default Backdrop;
