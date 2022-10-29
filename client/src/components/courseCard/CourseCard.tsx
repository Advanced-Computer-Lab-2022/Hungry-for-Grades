/* eslint-disable import/order */
import { formatCurrency } from '@/utils/currency';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { CourseCardProps } from '../../pages/landing/types';
import styles from './courseCard.module.scss';
import CourseCardOverlay from './CourseInstructorCardOverlay';

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
			<OverlayTrigger
      overlay={<div><CourseCardOverlay/></div>}
      placement="right"
    >
      <article
        className={`${
          styles.course__card ?? ''
        } card card-cascade rounded bg-light shadow `}
      >
        <div className={`${styles.course__img__container ?? ''}`}>
          <img
            alt={props.title}
            className={`card-img-top img-fluid ${styles.course__img ?? ''}`}
            src={props.image}
          />
        </div>
        <div className='card-body'>
          <h4
            className={`${styles.course__title ?? ''} ${
              styles['fnt-md'] ?? ''
            } card-title text-dark text-left `}
          >
            {props.title}
          </h4>
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
								starRatedColor="#FFD700"
								starSpacing="0px"
              />
            </span>
          </div>
          <Price {...props} />
        </div>
      </article>
			</OverlayTrigger>
    </Link>
  );
}

export default CourseCard;
