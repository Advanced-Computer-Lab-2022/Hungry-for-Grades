/* eslint-disable import/order */
import { CourseCardProps } from '../landing/types';
import styles from './CourseCard.module.scss';
import StarRatings from 'react-star-ratings';
import { formatCurrency } from '@/utils/currency';

function Price(props: CourseCardProps) {
  if (props.originalPrice) {
    return (
      <div className={styles['fnt-md-b']}>
        {formatCurrency(props.price, props.currency)}{' '}
        <small className={`${styles['original-price'] ?? ''}`}>
          {formatCurrency(props.originalPrice, props.currency)}
        </small>
      </div>
    );
  }
  return (
    <div className={styles['fnt-md-b']}>
      {formatCurrency(props.price, props.currency)}
    </div>
  );
}

function CourseCard(props: CourseCardProps) {
  return (
    <a href='/course'>
      <div className={styles['course-container']}>
        <div className={styles['img-wrapper']}>
          <img alt='course' height='135px' src={props.image} width='240px' />
        </div>
        <div>
          <div>
            <h4
              className={`${styles['course-title'] ?? ''} ${
                styles['fnt-md'] ?? ''
              }`}
            >
              {props.title}
            </h4>
          </div>
          <div className={`${styles['fnt-xs'] ?? ''}`}>
            {props.instructors.map(instructor => instructor.name).join(', ')}
          </div>
          <div className={` ${styles['fnt-xs'] ?? ''}`}>
            <strong>Duration: {props.totalHours}h</strong>
          </div>
          <div>
            <span className={styles['star-rating-number']}>
              {props.rating}
              {'\u00A0'}
            </span>
            <span>
              <StarRatings
                numberOfStars={5}
                rating={props.rating}
                starDimension='20px'
                starRatedColor='rgb(229, 152, 25)'
                starSpacing='0px'
              />
            </span>
          </div>
          <Price {...props} />
        </div>
      </div>
    </a>
  );
}

export default CourseCard;
