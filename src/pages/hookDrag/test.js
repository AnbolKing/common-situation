import React from 'react';
import Draggable from './index';

const HookDrag = () => {
  return (
    <div>
      <Draggable onDrag={console.log} id="uniqueId">
        <h2 className="example">Drag me</h2>
      </Draggable>
    </div>
  );
};

export default HookDrag;