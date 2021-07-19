import React from 'react';
import { useNavigate } from 'react-router';

function New(): JSX.Element {
  const navigate = useNavigate();

  function create() {
    navigate('/drawing-board/1');
  }

  return (
    <div>
      <div>64x64 800px</div>
      <div>
        <button type="button" onClick={create}>
          Create
        </button>
      </div>
    </div>
  );
}

export default New;
