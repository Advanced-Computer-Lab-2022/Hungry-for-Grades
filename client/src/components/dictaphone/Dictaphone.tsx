/* eslint-disable import/no-unassigned-import */
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import './dictaphone.scss';

import { BsFillMicFill } from 'react-icons/bs';
let oldTranscript = '';
function Dictaphone({ onChange }: { onChange: (value: string) => void }) {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <></>;
  }
  if (transcript && transcript !== oldTranscript) {
    oldTranscript = transcript;
    onChange(transcript);
  }

  return (
    <div className='mx-1 pt-2'>
      {!listening ? (
        <button
          type='button'
          onClick={async function onListen() {
            await SpeechRecognition.startListening();
          }}
        >
          <BsFillMicFill className='icon' />
        </button>
      ) : (
        <>
          <span className='pulse-ring-left' />
          <button
            type='button'
            onClick={function onStop() {
              SpeechRecognition.stopListening();
            }}
          >
            <BsFillMicFill className='icon' />
          </button>
          <span className='pulse-ring-right' />
        </>
      )}
    </div>
  );
}
export default Dictaphone;
