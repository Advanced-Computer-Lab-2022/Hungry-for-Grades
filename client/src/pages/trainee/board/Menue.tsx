import './board.scss';

function Menu({ setLineColor, setLineWidth, setLineOpacity }) {
  return (
    <div className='Menu'>
      <label htmlFor='color'>Brush Color </label>
      <input
			name='color'
        type='color'
        onChange={e => {
          setLineColor(e.target.value);
        }}
      />
      <label  htmlFor='brush'>Brush Width </label>
      <input
						max='20'

        min='3'
        name='brush'
        type='range'
        onChange={e => {
          setLineWidth(e.target.value);
        }}
      />
      <label htmlFor='opacity'>Brush Opacity</label>
      <input
			max='100'
        min='1'
        name='opacity'
        type='range'
        onChange={e => {
          setLineOpacity(e.target.value / 100);
        }}
      />
    </div>
  );
}

export default Menu;
