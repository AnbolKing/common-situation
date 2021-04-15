import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import './style.less';

const POSITION = {
  x: 0,
  y: 0,
}

const Draggable = ({ id, onDragEnd, onDrag, children }) => {
  const [state, setState] = useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  })
  const handleMouseDown = useCallback(({clientX, clientY}) => {
    setState(state => {
      return {
        ...state,
        isDragging: true,
        origin: {
          x: clientX,
          y: clientY,
        }
      }
    })
  }, []);
  const handleMouseMove = useCallback(({clientX, clientY}) => {
    const translation = {
      x: clientX - state.origin.x,
      y: clientY - state.origin.y,
    }
    setState(state => {
      return {
        ...state,
        translation,
      }
    })
    if(onDrag) {
      onDrag({translation, id});
    }
  }, [state.origin, onDrag, id]);
  const handleMouseUp = useCallback(() => {
    setState(state => {
      return {
        ...state,
        isDragging: false,
      }
    })
    if(onDragEnd) {
      onDragEnd();
    }
  }, [onDragEnd]);
  useEffect(() => {
    if(state.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setState(state => {
        return {
          ...state,
          translation: {
            x: 0,
            y: 0,
          }
        }
      })
    }
  }, [state.isDragging, handleMouseMove, handleMouseUp]);
  const styles = useMemo(() => {
    return {
      cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
      transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
      transition: state.isDragging ? 'none' : 'transform 500ms',
      zIndex: state.isDragging ? 2 : 1,
      position: state.isDragging ? 'absolute' : 'relative',
    }
  }, [state.isDragging, state.translation])
  return (
    <div onMouseDown={handleMouseDown} style={styles}>
      {children ? children : (
        <div className="example">
          Example Content
        </div>
      )}
    </div>
  )
}

export default Draggable;