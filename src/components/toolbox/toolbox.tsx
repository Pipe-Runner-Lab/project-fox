import React from 'react';
import { ChromePicker, CompactPicker } from 'react-color';
import Tooltip from '@material-ui/core/Tooltip';
import { BsTriangle, BsPencil } from 'react-icons/bs';
import { FaRegSquare, FaSave } from 'react-icons/fa';
import { FiCircle, FiType, FiMove } from 'react-icons/fi';
import { GrUndo, GrRedo, GrAddCircle as Newfile } from 'react-icons/gr';
import { BiCut, BiZoomIn, BiZoomOut, BiSticker, BiEraser } from 'react-icons/bi';
import { MdContentPaste, MdContentCopy, MdCropFree } from 'react-icons/md';
import { GiPaintBrush, GiPaintBucket } from 'react-icons/gi';
import { AiOutlineLine } from 'react-icons/ai';
import { ImBin } from 'react-icons/im';
import { IoEyedrop } from 'react-icons/io5';
import { VscColorMode } from 'react-icons/vsc';

import { ToolbarContainer, IconContainer, IconWrapper, ColorBar } from './toolbox.styles';

function ToolBox(): JSX.Element {
  return (
    <ToolbarContainer>
      <IconContainer style={{ border: 'solid', borderWidth: '2px' }}>
        <Tooltip title="New File" placement="top-start">
          <IconWrapper>
            <Newfile />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Delete File" placement="top-start">
          <IconWrapper>
            <ImBin style={{ color: '#52616B' }} />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Paste" placement="top-start">
          <IconWrapper>
            <MdContentPaste />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Copy" placement="top-start">
          <IconWrapper>
            <MdContentCopy />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Cut" placement="top-start">
          <IconWrapper>
            <BiCut />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Save" placement="top-start">
          <IconWrapper style={{ color: '#09015F' }}>
            <FaSave />
          </IconWrapper>
        </Tooltip>
      </IconContainer>
      <IconContainer style={{ marginTop: '10px', justifyContent: 'center' }}>
        <Tooltip title="Brush" placement="left">
          <IconWrapper>
            <GiPaintBrush />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Pencil" placement="bottom-start">
          <IconWrapper>
            <BsPencil />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Eraser" placement="bottom-start">
          <IconWrapper>
            <BiEraser />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Text" placement="right">
          <IconWrapper>
            <FiType />
          </IconWrapper>
        </Tooltip>
      </IconContainer>
      <IconContainer>
        <Tooltip title="Square" placement="left">
          <IconWrapper>
            <FaRegSquare />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Triangle" placement="bottom-start">
          <IconWrapper>
            <BsTriangle />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Circle" placement="bottom-start">
          <IconWrapper>
            <FiCircle />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Line" placement="right">
          <IconWrapper>
            <AiOutlineLine />
          </IconWrapper>
        </Tooltip>
      </IconContainer>
      <IconContainer>
        <Tooltip title="Stamps" placement="left">
          <IconWrapper>
            <BiSticker />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Paint" placement="bottom-start">
          <IconWrapper>
            <GiPaintBucket />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Color Picker" placement="bottom-start">
          <IconWrapper>
            <IoEyedrop />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Invert" placement="right">
          <IconWrapper>
            <VscColorMode />
          </IconWrapper>
        </Tooltip>
      </IconContainer>
      <IconContainer>
        <Tooltip title="Crop" placement="left">
          <IconWrapper>
            <MdCropFree />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Move" placement="bottom-start">
          <IconWrapper>
            <FiMove />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Zoom In" placement="bottom-start">
          <IconWrapper>
            <BiZoomIn />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Zoom Out" placement="right">
          <IconWrapper>
            <BiZoomOut />
          </IconWrapper>
        </Tooltip>
      </IconContainer>
      <IconContainer style={{ marginRight: '25px' }}>
        <Tooltip title="Undo" placement="left">
          <IconWrapper style={{ backgroundColor: '#F73859', justifyContent: 'center' }}>
            <GrUndo />
          </IconWrapper>
        </Tooltip>
        <Tooltip title="Redo" placement="right">
          <IconWrapper style={{ backgroundColor: '#62D2A2', justifyContent: 'center' }}>
            <GrRedo />
          </IconWrapper>
        </Tooltip>
      </IconContainer>
      <ColorBar>
        <CompactPicker />
      </ColorBar>
      <ColorBar style={{ marginTop: '10px' }}>
        <ChromePicker />
      </ColorBar>
    </ToolbarContainer>
  );
}

export default ToolBox;
