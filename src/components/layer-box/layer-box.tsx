import React from 'react';
import { LayerMetaData } from 'pixel-dust/pixel-dust-api';
import { Scrollbars } from 'react-custom-scrollbars';
import { VscAdd as AddLayerIcon, VscRemove as DeleteLayerIcon } from 'react-icons/vsc';

import {
  AddLayerButton,
  DeleteLayerButton,
  Divider,
  LayerGap,
  LayerCard,
  LayerContainer,
  LayerInteractionContainer,
  LayerStackContainer,
  LayerStackWrapper
} from './layer-box.styles';

type LayerBoxProps = {
  layerStack: LayerMetaData[];
  activeLayer: LayerMetaData | null;
  addLayerBefore: (arg: { uuid: string }) => void;
  addLayerAfter: (arg?: { uuid?: string }) => void;
  setActiveLayer: (arg: { uuid: string }) => void;
  deleteLayer: (arg: { uuid: string }) => void;
};

function LayerBox({
  layerStack,
  activeLayer,
  addLayerBefore,
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
        <DeleteLayerButton
          onClick={() => {
            if (activeLayer?.uuid) deleteLayer({ uuid: activeLayer.uuid });
          }}>
          <DeleteLayerIcon />
        </DeleteLayerButton>
      </LayerInteractionContainer>
      <LayerStackContainer>
        <Scrollbars
          autoHide
          autoHideTimeout={500}
          renderTrackHorizontal={() => <div style={{ display: 'none' }} />}
          style={{ height: '100%' }}>
          <LayerStackWrapper>
            {layerStack.map((layer: LayerMetaData) => (
              <React.Fragment key={layer.uuid}>
                <LayerCard
                  id={layer.uuid}
                  active={layer.uuid === activeLayer?.uuid}
                  onClick={() => setActiveLayer({ uuid: layer.uuid })}
                  imageUrl={layer.imagePreview}
                />
                <LayerGap
                  key={`${layer.uuid}-layer-gap`}
                  onClick={() => addLayerBefore({ uuid: layer.uuid })}
                />
              </React.Fragment>
            ))}
          </LayerStackWrapper>
        </Scrollbars>
      </LayerStackContainer>
    </LayerContainer>
  );
}

export default LayerBox;
