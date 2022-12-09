import { withMediaProps } from 'react-media-player';

function CustomPlayPause(props) {
  const handlePlayPause = () => {
    props.media.playPause();
  };

  const { className, media } = props;
  return (
    <button className={className} type='button' onClick={handlePlayPause}>
      {media.isPlaying ? 'Pause' : 'Play'}
    </button>
  );
}

export default withMediaProps(CustomPlayPause);
