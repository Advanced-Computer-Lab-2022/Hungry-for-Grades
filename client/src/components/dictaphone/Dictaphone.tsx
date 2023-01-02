/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable import/no-unassigned-import */
import 'regenerator-runtime/runtime';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';

import { BsFillMicFill } from 'react-icons/bs';

import styles from './dictaphone.module.scss';

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
          className={`${styles.micButton ?? ''}`}
          type='button'
          onClick={async function onListen(e: ButtonEvent) {
            e.stopPropagation();
            e.preventDefault();
            await SpeechRecognition.startListening();
          }}
        >
          <BsFillMicFill
            className={`${styles.icon ?? ''} ${styles.micButton ?? ''}`}
          />
        </button>
      ) : (
        <div className='d-flex flex-column align-items-center'>
          <button
            className={`${styles.micButton ?? ''} ${styles.listening ?? ''}`}
            type='button'
            onClick={function onStop(e: ButtonEvent) {
              e.stopPropagation();
              e.preventDefault();

              SpeechRecognition.stopListening();
            }}
          >
            <BsFillMicFill
              className={`${styles.icon ?? ''} ${styles.micButton ?? ''}`}
            />
          </button>
          <div className={`${styles.boxContainer ?? ''}`}>
            <div className={`${styles.box ?? ''} ${styles.box1 ?? ''}`} />
            <div className={`${styles.box ?? ''} ${styles.box2 ?? ''}`} />
            <div className={`${styles.box ?? ''} ${styles.box3 ?? ''}`} />
            <div className={`${styles.box ?? ''} ${styles.box4 ?? ''}`} />
            <div className={`${styles.box ?? ''} ${styles.box5 ?? ''}`} />
          </div>
        </div>
      )}
    </div>
  );
}
export default Dictaphone;
