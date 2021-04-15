import React, {
  useState,
  useCallback,
} from 'react';
import styled from 'styled-components';
import Draggable from './dragger';
import './style.less';

const DragList = () => {
  const items = [1,2,3,4,5]
  const [state, setState] = useState({
    // order: 排好后的的顺序
    // dragOrder: 正在排的顺序
    order: items,
    dragOrder: items,
    draggedIndex: null,
  })
  const handleDrag = useCallback(({translation, id}) => {
    const delta = Math.round(translation.y/80);
    const index = state.order.indexOf(id);
    const dragOrder = state.order.filter(index => index !== id);
    dragOrder.splice(index + delta, 0, id);
    setState(state => ({
      ...state,
      draggedIndex: id,
      dragOrder
    }));
  }, [state.order])
  const handleDragEnd = useCallback(() => {
    setState(state => {
      return {
        ...state,
        draggedIndex: null,
        order: state.dragOrder,
      }
    })
  }, [])
  return (
    <div className="container">
      {
        items.map(index => {
          const isDragging = index===state.draggedIndex;
          const top = state.dragOrder.indexOf(index) * (80+10);
          const draggedTop = state.order.indexOf(index) * (80+10);
          return (
            <Draggable
              key={index}
              id={index}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            >
              <Rect
                isDragging={isDragging}
                top={isDragging ? draggedTop : top}
              >
                {index}
              </Rect>
            </Draggable>
          )
        })
      }
    </div>
  )
}

export default DragList;

const Rect = styled.div.attrs(props => ({
  style: {
    transition: props.isDragging ? 'none' : 'all 500ms'
  }
}))`
  width: 300px;
  user-select: none;
  height: 80px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${({top}) => 100 + top}px;
  left: calc(50vw - 150px);
  font-size: 20px;
  color: #777;
`;