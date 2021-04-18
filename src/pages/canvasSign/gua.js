import React, {
  useEffect,
  useRef,
} from 'react';
import './style.less';

const GuaCard = () => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const isClear = useRef(false);
  const handleDown = () => {
    isClear.current = true;
  }
  const handleMove = (event) => {
    if(!isClear.current) {
      return ;
    }
    event = event || window.event;
    let currentX = event.clientX - canvasRef.current.offsetLeft;
    let currentY = event.clientY - canvasRef.current.offsetTop;
    ctx.current.beginPath();
    ctx.current.arc(currentX, currentY, 10, 0, Math.PI*2, false);
    ctx.current.fill();
    event.stopPropagation();
  }
  const handleUp = () => {
    isClear.current = false;
  }
  useEffect(() => {
    let canvas = canvasRef.current;
    if(canvas.getContext) {
      ctx.current = canvas.getContext('2d');
      ctx.current.beginPath();
      ctx.current.fillStyle = "#999";
      ctx.current.fillRect(0, 0, 500, 500);
      ctx.current.fill();
      ctx.current.globalCompositeOperation = 'destination-out';
      canvas.addEventListener('mousedown', handleDown);
      canvas.addEventListener('mousemove', handleMove);
      canvas.addEventListener('mouseup', handleUp);
    }
    return () => {
      canvas.removeEventListener('mousedown', handleDown);
    }
  }, [])
  return (
    <div className="gua-container">
      <canvas className="gua-canvas" ref={canvasRef}></canvas>
    </div>
  )
}

export default GuaCard;