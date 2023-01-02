/* eslint-disable jsx-a11y/media-has-caption */
import { Button } from 'react-bootstrap';
import { AiFillSetting } from 'react-icons/ai';

import { useState } from 'react';

import EditMusicsModal from './EditMusicsModal';

import useMultistepForm from '@/hooks/useMultistepForm';
import useLocalStorage from '@/hooks/useLocalStorage';
/* const musics = [
  'https://www.bensound.com//bensound-music/bensound-sunny.mp3',
  'https://www.bensound.com/bensound-music/bensound-buddy.mp3',

  'https://www.bensound.com/bensound-music/bensound-energy.mp3',

  'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3'
];
 */

function MusicPlayer() {
  const [musics] = useLocalStorage<string[]>('musics', []);
  console.log(musics);

  const { step, prev, next, isFirstStep } = useMultistepForm(
    musics,
    undefined,
    undefined
  );
  const [showMusicModal, setShowMusicModal] = useState(false);
  return (
    <div className='d-flex'>
      <button
        disabled={isFirstStep}
        style={{
          backgroundColor: '#f1f3f4',
          color: 'black',
          outline: 'none',
          border: 'none',
          borderRadius: '15%',
          paddingRight: '1.9rem',

          marginRight: '-2rem'
        }}
        type='button'
        onClick={() => prev()}
      >
        Previous
      </button>
      <audio controls src={step as string} />

      <button
        style={{
          backgroundColor: '#f1f3f4',
          color: 'black',
          outline: 'none',
          border: 'none',
          borderRadius: '15%',
          marginLeft: '-2rem',
          zIndex: '999'
        }}
        type='button'
        onClick={() => next()}
      >
        Next
      </button>
      <Button
        variant=''
        onClick={function open() {
          setShowMusicModal(true);
        }}
      >
        <AiFillSetting
          style={{
            fontSize: '1.3rem',
            color: '#6c757d'
          }}
        />
      </Button>
      <EditMusicsModal
        handleClose={function (): void {
          setShowMusicModal(false);
        }}
        show={showMusicModal}
      />
    </div>
  );
}

export default MusicPlayer;
