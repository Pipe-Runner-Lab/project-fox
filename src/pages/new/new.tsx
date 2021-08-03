import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { BiImageAdd as CreateIcon } from 'react-icons/bi';
import { NameContainer, TextButton } from 'components/tool-box/tool-box.styles';
import {
  Container,
  PreviewContainer,
  CreationContainer,
  CreationWrapper,
  Label,
  SplitContainer,
  SplitWrapper,
  SectionContainer,
  ActionContainer,
  Select,
  Option
} from './new.styles';

function New(): JSX.Element {
  const navigate = useNavigate();

  function create() {
    navigate('/drawing-board/1');
  }

  const [canvasTypeIdx, setCanvasTypeIdx] = useState(0);
  const [resolutionIdx, setResolutionIdx] = useState(0);

  const canvasTypeOptions = useMemo(
    () => [
      { value: '50x50', key: '50x50' },
      { value: '100x100', key: '100x100' },
      { value: '200x200', key: '200x200' },
      { value: '500x500', key: '500x500' }
    ],
    []
  );

  const resolutionOptions = useMemo(() => {
    switch (canvasTypeOptions[canvasTypeIdx].value) {
      case '50x50':
        return [
          { value: '500', key: '500 Pixels' },
          { value: '800', key: '800 Pixels' },
          { value: '1000', key: '1000 Pixels' },
          { value: '1200', key: '1200 Pixels' }
        ];
      case '100x100':
        return [
          { value: '500', key: '500 Pixels' },
          { value: '800', key: '800 Pixels' },
          { value: '1000', key: '1000 Pixels' },
          { value: '1200', key: '1200 Pixels' }
        ];
      case '200x200':
        return [
          { value: '800', key: '800 Pixels' },
          { value: '1000', key: '1000 Pixels' },
          { value: '1200', key: '1200 Pixels' }
        ];
      case '500x500':
        return [{ value: '1000', key: '1000 Pixels' }];
      default:
        throw new Error('Does not match any canvas type');
    }
  }, [canvasTypeIdx, canvasTypeOptions]);

  return (
    <Container>
      <CreationContainer>
        <CreationWrapper>
          <SectionContainer>
            <Label>Project name:</Label>
            <NameContainer>
              <input value="" placeholder="Name your art work..." />
            </NameContainer>
          </SectionContainer>
          <SectionContainer>
            <Label>Artwork Dimensions:</Label>
            <SplitContainer>
              <SplitWrapper>
                <Select>
                  {canvasTypeOptions.map((option, idx) => (
                    <Option
                      active={idx === canvasTypeIdx}
                      onClick={() => setCanvasTypeIdx(idx)}
                      key={option.key}>
                      {option.value}
                    </Option>
                  ))}
                </Select>
              </SplitWrapper>
              <SplitWrapper>
                <Select>
                  {resolutionOptions.map((option, idx) => (
                    <Option
                      active={idx === resolutionIdx}
                      onClick={() => setResolutionIdx(idx)}
                      key={option.key}>
                      {option.key}
                    </Option>
                  ))}
                </Select>
              </SplitWrapper>
            </SplitContainer>
          </SectionContainer>
          <ActionContainer>
            <TextButton onClick={create}>
              <CreateIcon />
              <span>Create</span>
            </TextButton>
          </ActionContainer>
        </CreationWrapper>
      </CreationContainer>
      <PreviewContainer />
    </Container>
  );
}

export default New;
