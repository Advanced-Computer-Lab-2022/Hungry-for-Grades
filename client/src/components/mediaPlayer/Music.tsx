/* eslint-disable jsx-a11y/media-has-caption */
import useMultistepForm from '@/hooks/useMultistepForm';
const musics = [
  'https://www.bensound.com//bensound-music/bensound-sunny.mp3',
  'https://www.bensound.com/bensound-music/bensound-buddy.mp3',

  'https://www.bensound.com/bensound-music/bensound-energy.mp3',

  'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3'
];
function MusicPlayer() {
  const { step, prev, next } = useMultistepForm(musics, undefined, undefined);
  return (
    <div className='d-flex'>
      <button type='button' onClick={() => prev()}>
        Previous
      </button>
      <audio controls src={step as string} />

      <button
        style={{
          backgroundColor: 'transparent',
          color: 'black',
          padding: '10px',
          outline: 'none',
          border: 'none'
        }}
        type='button'
        onClick={() => next()}
      >
        Next
      </button>
    </div>
  );
}

export default MusicPlayer;
