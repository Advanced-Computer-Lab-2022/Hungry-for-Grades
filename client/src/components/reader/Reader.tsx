import React, { memo, useEffect, useMemo } from 'react';

function Reader() {
  const [text, setText] = React.useState<string>('');
  const [play, setPlay] = React.useState<string>('play');
  const [speed, setSpeed] = React.useState<number>(1);

  const utterance = useMemo(() => new SpeechSynthesisUtterance(), []);
  utterance.lang = 'en-US';

  useEffect(() => {
    utterance.addEventListener('end', () => {
      setPlay('play');
    });
    return () => {
      utterance.removeEventListener('end', () => {
        setPlay('play');
      });
    };
  }, [utterance]);

  function playText(readText: string): void {
    if (window.speechSynthesis.speaking && play === 'play') {
      setPlay('pause');
      return window.speechSynthesis.resume();
    } else if (play === 'play' && !window.speechSynthesis.speaking) {
      utterance.text = readText;
      utterance.rate = speed || 1;
      setPlay('pause');

      window.speechSynthesis.speak(utterance);
    } else if (window.speechSynthesis.speaking && play === 'pause') {
      window.speechSynthesis.pause();

      setPlay('play');
    }
  }
  function stopText(): void {
    window.speechSynthesis.resume();
    window.speechSynthesis.cancel();
    setPlay('play');
  }
  function changeSpeed(): void {
    if (speed === 2) {
      setSpeed(1);
    } else {
      setSpeed(prev => prev + 0.25);
    }
    utterance.rate = speed || 1;
  }
  return (
    <>
      <textarea
        id='text'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div id='preview'>
        {text}
        <button
          style={{ backgroundColor: play !== 'play' ? 'red' : 'green' }}
          type='button'
          onClick={() => playText(text)}
        >
          {play === 'play' ? 'Play' : 'Pause'}
        </button>
        <button
          style={{ backgroundColor: play ? 'red' : 'green' }}
          type='button'
          onClick={stopText}
        >
          stop
        </button>
        <button type='button' onClick={changeSpeed}>
          {`${speed}x`}
        </button>
      </div>
    </>
  );
}

export default memo(Reader);
