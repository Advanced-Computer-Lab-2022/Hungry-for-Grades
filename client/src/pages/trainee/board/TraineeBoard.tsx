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
  const [prevMouse, setPrevMouse] = useState({ prevMouseY: 0, prevMouseX: 0 });

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current;
    console.log(canvas);
    const ctx = canvas?.getContext('2d');

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;


    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  // Function for starting the drawing
  function startDrawing(e) {
    setPrevMouse(() => ({
      prevMouseX: e.offsetX,
      prevMouseY: e.offsetY
    }));
    if (!ctxRef && !ctxRef.current) {
      return;
    }


    ctxRef.current.fillStyle = lineColor;
    ctxRef.current.strokeStyle = lineColor;
    ctxRef.current.globalAlpha = lineOpacity;
    ctxRef.current.lineWidth = lineWidth;

    ctxRef?.current?.beginPath();
    ctxRef?.current?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  }

  // Function for ending the drawing
  function endDrawing() {
    ctxRef.current.closePath();
    setIsDrawing(false);
  }

  function draw(e) {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current.stroke();
  }

  return (
    <div className='container paint'>
      <div className='App'>
        <div className='draw-area'>
          <Menu
            canvasRef={canvasRef}
            lineColor={lineColor}
            lineOpacity={lineOpacity}
            lineWidth={lineWidth}
            setLineColor={setLineColor}
            setLineOpacity={setLineOpacity}
            setLineWidth={setLineWidth}
          />
          <canvas
            ref={canvasRef}
            className='canvas'
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
