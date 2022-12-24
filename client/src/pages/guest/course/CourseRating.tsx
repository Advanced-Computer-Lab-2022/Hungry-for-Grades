import StarRatings from 'react-star-ratings';

import styles from './course-rating.module.scss';

import { Rating } from '@/interfaces/course.interface';

function CourseRating(props: Rating) {
  return (
    <div className={styles['rating-container']}>
      {props.averageRating > 0 ? (
        <span className={styles['star-rating-number']}>
          {props.averageRating}
          {'\u00A0'}
        </span>
      ) : (
        <></>
      )}
      <span>
        <StarRatings
          numberOfStars={5}
          rating={props.averageRating}
          starDimension='20px'
          starRatedColor='rgb(229, 152, 25)'
          starSpacing='0px'
        />
      </span>
      {props.reviews ? (
        <a className={`text-light ${styles.reviews ?? ''}`} href='#reviews'>
          {props.reviews.length} review{props.reviews.length === 1 ? '' : 's'}
        </a>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CourseRating;
