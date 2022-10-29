/* eslint-disable import/order */
import { formatCurrency } from '@/utils/currency';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { CourseCardProps } from '../../pages/landing/types';
import styles from './courseCard.module.scss';

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
    <Link to={`/course/${props.id}`}>
      <article className={` card rounded bg-light shadow `}>
        <div className={`p-5 mx-auto`}>
          <img
            alt={props.title}
            className=' card-img-top img-fluid'
            height='80%'
            src={props.image}
            width='80%'
          />
        </div>
        <div>
          <div>
            <h4
              className={`${styles['course-title'] ?? ''} ${
                styles['fnt-md'] ?? ''
              } card-title text-dark text-left`}
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
      </article>
    </Link>
  );
}

export default CourseCard;
