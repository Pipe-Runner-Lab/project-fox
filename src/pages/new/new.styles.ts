import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;

  & > div {
    border-radius: 5px;
    border: 1px #e1e8eb solid;
  }

  & > div + div {
    margin-left: 8px;
  }
`;

export const CreationContainer = styled.div`
  flex: 1;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CreationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  min-width: 400px;

  & > * + * {
    margin-top: 24px;
  }
`;

export const PreviewContainer = styled.div`
  width: 600px;
`;

export const Label = styled.div`
  font-size: 16px;
  color: #6b7280;
`;

export const SplitContainer = styled.div`
  display: flex;
`;

export const SplitWrapper = styled.div`
  flex: 1;
`;

export const SectionContainer = styled.div`
  & > * + * {
    margin-top: 8px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Select = styled.div`
  width: max-content;

  & > * + * {
    margin-top: 4px;
  }
`;

export const Option = styled.div<{ active: boolean }>`
  border-radius: 5px;
  border: 1px #e1e8eb solid;
  padding: 4px;
  color: #6b7280;
  background-color: ${(props) => (props.active ? '#cabbee' : '#f3f4f6')};
  cursor: pointer;
`;
