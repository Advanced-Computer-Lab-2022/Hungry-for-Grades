import { FaStar } from 'react-icons/fa';

import { v4 as uuid } from 'uuid';

import { type ButtonEvent } from '../common.types';

import styles from './controlledStarsRating.module.scss';
import { type ControlledStarsRatingProps } from './types';

function ControlledStarsRating(props: ControlledStarsRatingProps) {
  const { rating, setRating } = props;

  return (
    <div className={`${styles.rating ?? ''} my-1 w-100`}>
      <span>Rating</span>
      <div>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <button
              key={uuid()}
              type='button'
              onClick={function set(event: ButtonEvent) {
                event.preventDefault();
                setRating(index + 1);
              }}
            >
              <FaStar
                className={index + 1 <= rating ? styles.clickedstar : ''}
                data-value={index + 1}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ControlledStarsRating;
