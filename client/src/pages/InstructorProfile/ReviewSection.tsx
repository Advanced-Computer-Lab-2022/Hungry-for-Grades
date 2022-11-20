import { SetStateAction, useState } from 'react';

import { MdCheckCircle } from 'react-icons/md';
import { boolean } from 'yup';

import styles from './ReviewSectior.module.scss';

import ControlledStarsRating from '@/components/starsRating/ControlledStarsRating';

export default function ReviewSection() {
  const [states, setStates] = useState({
    open: false,
    submit: false,
    rating: 0
  });

  return (
    <div style={{ marginBottom: '2rem' }}>
      {!states.open && !states.submit && (
        <button
          className='btn btn-danger'
          style={{ fontSize: '1.1rem', fontWeight: '500' }}
          type='button'
          onClick={() =>
            setStates(prev => {
              return { ...prev, open: true };
            })
          }
        >
          Review Instructor
        </button>
      )}

      {states.open && (
        <div className={styles.review_editor}>
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }}
          >
            How do you rate this Instructor
          </div>

          <ControlledStarsRating
            rating={states.rating}
            setRating={function (
              value: SetStateAction<{
                open: boolean;
                submit: boolean;
                rating: number;
              }>
            ): void {
              setStates(prev => {
                return { ...prev, rating: value };
              });
            }}
          />

          <textarea
            aria-label='With textarea'
            className='form-control'
            placeholder='Write Review'
            style={{ marginBottom: '2rem' }}
          />

          <button
            className='btn btn-danger'
            style={{ fontSize: '1rem', fontWeight: '600' }}
            type='button'
            onClick={() =>
              setStates(prev => {
                return { ...prev, open: false };
              })
            }
          >
            Cancel
          </button>
          <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>

          <button
            className='btn btn-primary'
            style={{ fontSize: '1rem', fontWeight: '600' }}
            type='button'
            onClick={() =>
              setStates(prev => {
                return { ...prev, submit: true, open: false };
              })
            }
          >
            Submit
          </button>
        </div>
      )}
      {states.submit && (
        <div style={{ fontSize: '1rem', fontWeight: '700', color: 'green' }}>
          Your Review is Added Successfully
          <>&nbsp;</>
          <MdCheckCircle />{' '}
        </div>
      )}
    </div>
  );
}
