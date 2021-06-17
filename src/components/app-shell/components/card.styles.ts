import styled from "styled-components"

export const CardContainer = styled.div`
  background: #fff;
  width: 24em;
  border-radius: 0.6em;
  margin: 1em;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
  transition: all ease 200ms;
`;

export const CardsImage = styled.div`
  width: 100%;
  object-fit: contain;
`;

export const CardsBody = styled.div`
 padding: 1.2em;

`;