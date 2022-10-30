/* eslint-disable import/order */
import CourseRating from '@/pages/course/CourseRating';
import { formatCurrency } from '@/utils/currency';
import { Link } from 'react-router-dom';
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
  const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

  return (
    <>
      <article
        className={`${
          styles.course__card ?? ''
        } card card-cascade rounded bg-light shadow my-5`}
      >
        <Link to={`/course/${props.id}`}>
          <div className={`${styles.course__img__container ?? ''}`}>
            <img
              alt={props.title}
              className={`card-img-top img-fluid ${styles.course__img ?? ''}`}
              src={
                props.image && props.image.length > 0
                  ? props.image
                  : COMPANY_LOGO
              }
              onError={e => {
                e.currentTarget.src = COMPANY_LOGO;
              }}
            />
          </div>
        </Link>
        <div className={`card-body p-4 ${styles.course__card__body ?? ''}`}>
          <Link to={`/course/${props.id}`}>
            <h4
              className={`${styles.course__title ?? ''} ${
                styles['fnt-md'] ?? ''
              } text-dark text-left text-break`}
            >
              {props.title}
            </h4>
          </Link>
          <Link to={`/instructor/${props.id}`}>
            <div
              className={`${styles.course__card__instructor ?? ''} text-break`}
            >
              {props.instructors.map(instructor => instructor.name).join(', ')}
            </div>
          </Link>
          <div className={` ${styles['fnt-xs'] ?? ''} text-break`}>
            <strong>
              Duration: {props.totalHours} hr{props.totalHours > 1 ? 's' : ''}
            </strong>
          </div>
          <CourseRating {...props.rating} />
          <Price {...props} />
        </div>
      </article>
    </>
  );
}

export default CourseCard;
