/* eslint-disable import/no-unassigned-import */
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import './dictaphone.scss';

import { BsFillMicFill } from 'react-icons/bs';

import { ButtonEvent } from '@/pages/common.types';
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
          className='micButton'
          type='button'
          onClick={async function onListen(e: ButtonEvent) {
            e.stopPropagation();
            e.preventDefault();
            await SpeechRecognition.startListening();
          }}
        >
          <BsFillMicFill className='icon micButton' />
        </button>
      ) : (
        <div className='d-flex flex-column align-items-center'>
          <button
            className='micButton listening'
            type='button'
            onClick={function onStop(e: ButtonEvent) {
              e.stopPropagation();
              e.preventDefault();

              SpeechRecognition.stopListening();
            }}
          >
            <BsFillMicFill className='icon micButton' />
          </button>
          <div className='boxContainer'>
            <div className='box box1' />
            <div className='box box2' />
            <div className='box box3' />
            <div className='box box4' />
            <div className='box box5' />
          </div>
        </div>
      )}
    </div>
  );
}
export default Dictaphone;
