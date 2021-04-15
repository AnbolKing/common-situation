import React, {
  useRef,
} from 'react';
import './style.less';

const MaskModel = (props) => {
  const { children, show, closeMask } = props;
  const contentRef = useRef(null);
  const handleCloseMask = (e) => {
    if(contentRef.current.contains(e.target)) {
      console.log('yes');
    }
    else {
      console.log('no');
      if(closeMask) {
        closeMask();
      }
    }
  }
  return (
    <div className="mask-container" 
      style={{display: show ? 'flex' : 'none'}}
      onClick={handleCloseMask}
    >
      <div className="mask-content" ref={contentRef}>
        {children ? children : 'Example Mask Content'}
      </div>
    </div>
  )
}

export default MaskModel;