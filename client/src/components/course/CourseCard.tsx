import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { Tooltip } from 'react-bootstrap';

import { CourseCardProps } from '../../pages/landing/types';

import CourseCardOverlay from './CourseCardOverlay';

import styles from './courseCard.module.scss';

import Instructors from './Instructor';

import Price from './Price';

import CourseRating from '@/pages/course/CourseRating';
import { formatDuration } from '@/utils/duration';

function CourseCard(props: CourseCardProps) {
  const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;
  // https://react-bootstrap.github.io/components/overlays/#overlaytrigger
  const renderCouseCardOverlay = (ps: Record<string, unknown>) => {
    return (
      <Tooltip {...ps}>
        <CourseCardOverlay {...props} />
      </Tooltip>
    );
  };
  return (
    <>
      <OverlayTrigger
        // eslint-disable-next-line react/jsx-no-bind
        overlay={renderCouseCardOverlay}
        placement='auto'
      >
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
            <div
              className={`${styles.course__card__instructor ?? ''} text-break`}
            >
              <Instructors
                instructor={props.instructor}
                linkClassName='text-dark'
              />
            </div>
            <div className={` ${styles['fnt-xs'] ?? ''} text-break`}>
              <strong>Duration: {formatDuration(props.duration)}</strong>
            </div>
            <CourseRating {...props.rating} />
            <Price {...props.price} />
          </div>
        </article>
      </OverlayTrigger>
    </>
  );
}

export default CourseCard;
