import React, { useCallback, useEffect, useState } from 'react';
import { CirclePicker, SliderPicker, SketchPicker, ColorResult } from 'react-color';
import { InstrumentType } from 'pixel-dust/core/pixel-dust-api';
import {
  RiPencilFill as PenIcon,
  RiPaintFill as BucketIcon,
  RiEraserFill as EraserIcon,
  RiGridFill as PixelSquareIcon,
  RiFocusFill as PixelCircleIcon,
  RiShape2Fill as PixelFrameIcon,
  RiSipFill as ColorPickerIcon,
  RiQuillPenFill as RandomWidthPenIcon
} from 'react-icons/ri';
import {
  ActiveBackgroundColor,
  ActiveForegroundColor,
  ColorBoxContainer,
  InstrumentBoxContainer,
  Overlay,
  RangeColorPickerContainer,
  SelectedColorContainer,
  SketchPickerContainer,
  SliderContainer,
  InstrumentButton,
  MenusContainer,
  MenuButton
} from './tool-box.styles';

enum ActiveColorType {
  FOREGROUND = 'FOREGROUND',
  BACKGROUND = 'BACKGROUND'
}

type ToolBoxProps = {
  onChangeForegroundColor: React.Dispatch<React.SetStateAction<string>>;
  onChangeBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  onChangeInstrument: React.Dispatch<React.SetStateAction<InstrumentType>>;
  instrument: InstrumentType;
};

function ToolBox({
  instrument,
  onChangeForegroundColor,
  onChangeBackgroundColor,
  onChangeInstrument
}: ToolBoxProps): JSX.Element {
  const [activeColorType, setActiveColorType] = useState<ActiveColorType>(
    ActiveColorType.FOREGROUND
  );
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [foregroundColor, setForegroundColor] = useState<ColorResult>({
    hex: '#000000',
    hsl: { h: 240, s: 0, l: 0, a: 1 },
    rgb: { r: 0, g: 0, b: 0, a: 1 }
  });
  const [backgroundColor, setBackgroundColor] = useState<ColorResult>({
    hex: '#ffffff',
    hsl: { h: 240, s: 0, l: 1, a: 1 },
    rgb: { r: 255, g: 255, b: 255, a: 1 }
  });

  const onChangeSketchColor = useCallback(
    (value: ColorResult): void => {
      switch (activeColorType) {
        case ActiveColorType.FOREGROUND:
          setForegroundColor(value);
          break;
        case ActiveColorType.BACKGROUND:
          setBackgroundColor(value);
          break;
        default:
          break;
      }
    },
    [activeColorType]
  );

  useEffect(() => {
    onChangeForegroundColor(
      `rgba(${foregroundColor.rgb.r}, ${foregroundColor.rgb.g}, ${foregroundColor.rgb.b}, ${foregroundColor.rgb.a})`
    );
  }, [foregroundColor, onChangeForegroundColor]);

  useEffect(() => {
    onChangeBackgroundColor(
      `rgba(${backgroundColor.rgb.r}, ${backgroundColor.rgb.g}, ${backgroundColor.rgb.b}, ${backgroundColor.rgb.a})`
    );
  }, [backgroundColor, onChangeBackgroundColor]);

  return (
    <>
      <MenusContainer>
        <MenuButton>SAVE</MenuButton>
      </MenusContainer>
      <InstrumentBoxContainer>
        <InstrumentButton
          active={instrument === InstrumentType.PEN}
          onClick={() => onChangeInstrument(InstrumentType.PEN)}>
          <PenIcon />
        </InstrumentButton>
        <InstrumentButton
          active={instrument === InstrumentType.RANDOM_WIDTH_PEN}
          onClick={() => onChangeInstrument(InstrumentType.RANDOM_WIDTH_PEN)}>
          <RandomWidthPenIcon />
        </InstrumentButton>
        <InstrumentButton
          active={instrument === InstrumentType.ERASER}
          onClick={() => onChangeInstrument(InstrumentType.ERASER)}>
          <EraserIcon />
        </InstrumentButton>
        <InstrumentButton
          active={instrument === InstrumentType.BUCKET}
          onClick={() => onChangeInstrument(InstrumentType.BUCKET)}>
          <BucketIcon />
        </InstrumentButton>
        <InstrumentButton
          active={instrument === InstrumentType.PIXEL_SQUARE}
          onClick={() => onChangeInstrument(InstrumentType.PIXEL_SQUARE)}>
          <PixelSquareIcon />
        </InstrumentButton>
        <InstrumentButton
          active={instrument === InstrumentType.PIXEL_CIRCLE}
          onClick={() => onChangeInstrument(InstrumentType.PIXEL_CIRCLE)}>
          <PixelCircleIcon />
        </InstrumentButton>
        <InstrumentButton
          active={instrument === InstrumentType.PIXEL_FRAME}
          onClick={() => onChangeInstrument(InstrumentType.PIXEL_FRAME)}>
          <PixelFrameIcon />
        </InstrumentButton>
        <InstrumentButton
          active={instrument === InstrumentType.COLOR_PICKER}
          onClick={() => onChangeInstrument(InstrumentType.COLOR_PICKER)}>
          <ColorPickerIcon />
        </InstrumentButton>
      </InstrumentBoxContainer>
      <ColorBoxContainer>
        <RangeColorPickerContainer>
          <CirclePicker
            color={
              activeColorType === ActiveColorType.FOREGROUND
                ? foregroundColor.rgb
                : backgroundColor.rgb
            }
            onChange={onChangeSketchColor}
          />
          <SelectedColorContainer>
            <ActiveForegroundColor
              color={`rgba(${foregroundColor.rgb.r}, ${foregroundColor.rgb.g}, ${foregroundColor.rgb.b}, ${foregroundColor.rgb.a})`}
              onClick={() => setActiveColorType(ActiveColorType.FOREGROUND)}
              onDoubleClick={() => setIsColorPickerOpen(true)}
            />
            <ActiveBackgroundColor
              color={`rgba(${backgroundColor.rgb.r}, ${backgroundColor.rgb.g}, ${backgroundColor.rgb.b}, ${backgroundColor.rgb.a})`}
              onClick={() => setActiveColorType(ActiveColorType.BACKGROUND)}
              onDoubleClick={() => setIsColorPickerOpen(true)}
            />
            {isColorPickerOpen ? (
              <SketchPickerContainer>
                <Overlay onClick={() => setIsColorPickerOpen(false)} />
                <SketchPicker
                  color={
                    activeColorType === ActiveColorType.FOREGROUND
                      ? foregroundColor.rgb
                      : backgroundColor.rgb
                  }
                  onChange={onChangeSketchColor}
                />
              </SketchPickerContainer>
            ) : null}
          </SelectedColorContainer>
        </RangeColorPickerContainer>
        <SliderContainer>
          <SliderPicker
            color={
              activeColorType === ActiveColorType.FOREGROUND
                ? foregroundColor.rgb
                : backgroundColor.rgb
            }
            onChange={onChangeSketchColor}
          />
        </SliderContainer>
      </ColorBoxContainer>
    </>
  );
}

export default ToolBox;
