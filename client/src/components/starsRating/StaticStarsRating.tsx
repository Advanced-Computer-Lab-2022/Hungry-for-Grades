import { FaStar } from 'react-icons/fa';
import { v4 as uuid } from 'uuid';

import styles from './staticStarsRating.module.scss';
import { type StaticStarsRatingProps } from './types';

function StaticStarsRating(props: StaticStarsRatingProps) {
  const { rating } = props;
  return (
    <div className={styles.rating ?? ''}>
      <p>Rating</p>
      <div>
        {Array.from({ length: rating }).map(() => (
          <FaStar key={uuid()} />
        ))}
      </div>
    </div>
  );
}

export default StaticStarsRating;
