import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layer } from 'pixel-dust/pixel-dust-api';
import { VscAdd as AddLayerIcon, VscRemove as DeleteLayerIcon } from 'react-icons/vsc';

import {
  AddLayerButton,
  DeleteLayerButton,
  Divider,
  LayerCard,
  LayerContainer,
  LayerInteractionContainer,
  LayerStackContainer,
  LayerStackWrapper
} from './layer-box.styles';

type LayerBoxProps = {
  layerStack: Layer[];
  activeLayer: Layer | null;
  addLayerAfter: (arg?: { uuid?: string }) => void;
  setActiveLayer: (arg: { uuid: string }) => void;
  deleteLayer: (arg: { uuid: string | undefined }) => void;
};

function LayerBox({
  layerStack,
  activeLayer,
  addLayerAfter,
  setActiveLayer,
  deleteLayer
}: LayerBoxProps): JSX.Element {
  return (
    <LayerContainer>
      <LayerInteractionContainer>
        <AddLayerButton onClick={() => addLayerAfter()}>
          <AddLayerIcon />
        </AddLayerButton>
        <Divider />
        <DeleteLayerButton onClick={() => deleteLayer({ uuid: activeLayer?.uuid })}>
          <DeleteLayerIcon />
        </DeleteLayerButton>
      </LayerInteractionContainer>
      <LayerStackContainer>
        <Scrollbars autoHide autoHideTimeout={500} style={{ height: '100%' }}>
          <LayerStackWrapper>
            {[...layerStack].reverse().map((layer: Layer) => (
              <LayerCard
                key={layer.uuid}
                id={layer.uuid}
                active={layer.uuid === activeLayer?.uuid}
                onClick={() => setActiveLayer({ uuid: layer.uuid })}
              />
            ))}
          </LayerStackWrapper>
        </Scrollbars>
      </LayerStackContainer>
    </LayerContainer>
  );
}

export default LayerBox;
