import React, {
  useEffect,
  useRef,
} from 'react';
import './style.less';

const WIDTH = document.body.offsetWidth;

const CanvasSign = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const handleRemove = () => {
    ctxRef.current.clearRect(0, 0, WIDTH, 200);
    ctxRef.current.fillRect(0, 0, WIDTH, 200);
  }
  const handleSave = () => {
    let base64Img = canvasRef.current.toDataURL();
    console.log(base64Img);
  }
  const handleStart = (e) => {
    ctxRef.current.beginPath();
    //console.log(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    ctxRef.current.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
  }
  const handleMove = (e) => {
    ctxRef.current.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    ctxRef.current.stroke();
  }
  useEffect(() => {
    console.log(WIDTH);
    let canvas = canvasRef.current;
    canvas.width = WIDTH;
    canvas.height = 200
    if(canvas.getContext) {
      let ctx = canvas.getContext('2d');
      ctxRef.current = ctx;
      // canvas operation start
      ctx.lineCap = 'round';
      ctx.fillStyle = '#F7EED6';
      ctx.lineWidth = 2;
      ctx.fillRect(0, 0, WIDTH, 200);
      // canvas operation end
      canvas.addEventListener('touchstart', handleStart);
      canvas.addEventListener('touchmove', handleMove);
    }
    return () => {
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchstart', handleStart);
    }
  }, [])
  return (
    <div className="canvas-container">
      <div className="canvas-item">
        <canvas id="mycanvas" ref={canvasRef} className="canvas">
          No Support
        </canvas>
      </div>
      <div>
        <button onClick={handleRemove}>清除</button>
      </div>
      <div>
        <button onClick={handleSave}>保存</button>
      </div>
    </div>
  )
}

export default CanvasSign;