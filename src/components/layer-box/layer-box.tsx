import React from 'react';
import { LayerMetaData } from 'pixel-dust/pixel-dust-api';
import { Scrollbars } from 'react-custom-scrollbars';
import { VscAdd as AddLayerIcon, VscRemove as DeleteLayerIcon } from 'react-icons/vsc';
import { BiUpArrow as UpwardArrowIcon, BiDownArrow as DownwardArrowIcon } from 'react-icons/bi';
import { BsEye as VisibleIcon, BsEyeSlash as HiddenIcon } from 'react-icons/bs';

import {
  AddLayerButton,
  DeleteLayerButton,
  Divider,
  LayerGap,
  LayerCard,
  LayerCardOverlay,
  LayerContainer,
  LayerInteractionContainer,
  LayerStackContainer,
  LayerStackWrapper,
  ArrowIconWrapper,
  HideToggleIconWrapper
} from './layer-box.styles';

type LayerBoxProps = {
  layerStack: LayerMetaData[];
  activeLayer: LayerMetaData | null;
  addLayerBefore: (arg: { uuid: string }) => void;
  addLayerAfter: (arg?: { uuid?: string }) => void;
  setActiveLayer: (arg: { uuid: string }) => void;
  deleteLayer: (arg: { uuid: string }) => void;
  hideLayer: (arg: { uuid: string }) => void;
  showLayer: (arg: { uuid: string }) => void;
};

function LayerBox({
  layerStack,
  activeLayer,
  addLayerBefore,
  addLayerAfter,
  setActiveLayer,
  deleteLayer,
  hideLayer,
  showLayer
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
                  imageUrl={layer.imagePreview}>
                  <LayerCardOverlay disabled={layer.hidden}>
                    <ArrowIconWrapper>
                      <UpwardArrowIcon />
                    </ArrowIconWrapper>
                    <HideToggleIconWrapper disabled={layer.hidden}>
                      {layer.hidden ? (
                        <HiddenIcon onClick={() => showLayer({ uuid: layer.uuid })} />
                      ) : (
                        <VisibleIcon onClick={() => hideLayer({ uuid: layer.uuid })} />
                      )}
                    </HideToggleIconWrapper>
                    <ArrowIconWrapper>
                      <DownwardArrowIcon />
                    </ArrowIconWrapper>
                  </LayerCardOverlay>
                </LayerCard>
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
