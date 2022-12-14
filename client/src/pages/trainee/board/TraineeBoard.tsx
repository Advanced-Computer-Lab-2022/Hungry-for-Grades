import { useEffect, useRef, useState } from 'react';

import Menu from './Menue';
import './board.scss';

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState('black');
  const [lineOpacity, setLineOpacity] = useState(0.1);

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);

  // Function for starting the drawing
  const startDrawing = e => {
    ctxRef?.current?.beginPath();
    ctxRef?.current?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = e => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current.stroke();
  };

  return (
    <div className='container paint'>
      <div className='App'>
        <div className='draw-area'>
          <Menu
            setLineColor={setLineColor}
            setLineOpacity={setLineOpacity}
            setLineWidth={setLineWidth}
          />
          <canvas
            ref={canvasRef}
            height={`720px`}
            width={`1280px`}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
