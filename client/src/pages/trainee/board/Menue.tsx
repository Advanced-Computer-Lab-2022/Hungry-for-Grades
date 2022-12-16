import './board.scss';

function Menu({
  lineColor,
  setLineColor,
  setLineWidth,
  setLineOpacity,
  canvasRef,
  lineWidth,
  lineOpacity
}: {
  setLineColor: (color: string) => void;
  setLineWidth: (width: number) => void;
  setLineOpacity: (opacity: number) => void;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  lineColor: string;
  lineWidth: number;
  lineOpacity: number;
}) {
  return (
    <div className='Menu'>
      <label htmlFor='color'>Brush Color </label>
      <input
        name='color'
        type='color'
        value={lineColor}
        onChange={e => {
          setLineColor(e.target.value);
        }}
      />
      <label htmlFor='brush'>Brush Width </label>
      <input
        max='20'
        min='3'
        name='brush'
        type='range'
        value={lineWidth}
        onChange={e => {
          setLineWidth(parseInt(e.target.value));
        }}
      />
      <label htmlFor='opacity'>Brush Opacity</label>
      <input
        max='100'
        min='1'
        name='opacity'
        type='range'
        value={lineOpacity * 100}
        onChange={e => {
          setLineOpacity(() => parseInt(e.target.value) / 100);
        }}
      />

      <button
        className='btn btn-primary'
        type='button'
        onClick={function onSave() {
          const link = document.createElement('a');
          link.download = `${Date.now()}.jpg`;
          link.href = canvasRef?.current?.toDataURL();
          link.click();
        }}
      >
        Save As Image
      </button>
    </div>
  );
}

export default Menu;
