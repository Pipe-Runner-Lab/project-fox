import React from "react";
import { CardContainer, CardsImage , CardsBody } from "./card.styles"

function Cards(): JSX.Element {
  return (
    <CardContainer>
    <CardsImage>
    <img src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/design/discover/pixel-art/desktop/pixelart_P6a_720x350.jpg.img.jpg" alt="bgimage" />
    </CardsImage>
    <CardsBody>
      <h2>Previous work</h2>
      <h5>Last Visited 11-12-2020</h5>
      </CardsBody>    
    </CardContainer>
    );
}

export default Cards;
