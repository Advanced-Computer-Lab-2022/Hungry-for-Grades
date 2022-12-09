import { Media, Player, controls } from 'react-media-player';

import CustomPlayPause from './CustomPlayPause';
const { PlayPause, MuteUnmute } = controls;

function MediaPlayer() {
  return (
    <Media>
      <div className='media'>
        <div className='media-player'>
          <Player
            isPlaying={false}
            src='http://www.youtube.com/embed/h3YVKTxTOgU'
          />
        </div>
        <div className='media-controls'>
          <PlayPause />
          <MuteUnmute />
          <CustomPlayPause />
        </div>
      </div>
    </Media>
  );
}

export default MediaPlayer;
