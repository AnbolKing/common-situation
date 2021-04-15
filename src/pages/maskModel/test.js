import React, {
  useState,
} from 'react';
import MaskModel from './mask';

const MaskTest = () => {
  const [show, setShow] = useState(false);
  const handleShowMask = () => {
    setShow(true);
  }
  const handleCloseMask = () => {
    setShow(false);
  }
  return (
    <div>
      <button onClick={handleShowMask}>click me</button>
      <MaskModel 
        show={show}
        closeMask={handleCloseMask}
      />
    </div>
  )
}

export default MaskTest;