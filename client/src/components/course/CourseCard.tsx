import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from 'react-router-dom';

import { Tooltip } from 'react-bootstrap';

import { useState } from 'react';

import { CourseCardProps } from '../../pages/landing/types';

import CourseCardOverlay from './CourseCardOverlay';

import styles from './course-card.module.scss';

import Instructors from './Instructor';

import Price from './Price';

import CourseRating from '@/pages/course/CourseRating';
import { formatDuration } from '@/utils/duration';

import ProgressBar from '@/pages/trainee/progressBar/ProgressBar';

import CourseCardButtons from './cardButtons/CourseCardButtons';

const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

function CourseCardPreview({
  previewVideoURL,
  title
}: {
  previewVideoURL: string;
  title: string;
}) {
  return (
    <iframe
      allow='accelerometer; autoplay; clipboard-write;encrypted-media; gyroscope; picture-in-picture'
      className={`card-img-top img-fluid ${styles.course__img ?? ''}`}
      frameBorder='0'
      height='100px'
      id='player'
      src={`${previewVideoURL}${
        previewVideoURL.includes('?') ? '&' : '?'
      }autoplay=1&mute=0&loop=1&controls=0`}
      title={title}
      width='100px'
      onError={e => {
        e.currentTarget.src = COMPANY_LOGO;
      }}
    />
  );
}

function CourseCard(x: { pprops: CourseCardProps; percent: number }) {
  const props = x.pprops;
  const [onMouse, setOnMouse] = useState(false);
  console.log(props.id);
  function renderCouseCardOverlay(ps: Record<string, unknown>) {
    return (
      <Tooltip {...ps}>
        <CourseCardOverlay {...props} />
      </Tooltip>
    );
  }

  return (
    <>
      <OverlayTrigger overlay={renderCouseCardOverlay} placement='auto'>
        <article
          className={`${
            styles.course__card ?? ''
          } card card-cascade rounded bg-light shadow my-5`}
        >
          <Link
            to={`/course/${props.id}`}
            onMouseLeave={function onMouseLeave() {
              setOnMouse(false);
            }}
            onMouseOver={function onMouseOver() {
              setOnMouse(true);
            }}
          >
            <div className={`${styles.course__img__container ?? ''}`}>
              {!onMouse ||
              !props.previewVideoURL ||
              !props.previewVideoURL.includes(
                'https://www.youtube.com/embed/'
              ) ? (
                <img
                  alt={props.title}
                  className={`card-img-top img-fluid ${
                    styles.course__img ?? ''
                  }`}
                  src={
                    props.image && props.image.length > 0
                      ? props.image
                      : COMPANY_LOGO
                  }
                  onError={e => {
                    e.currentTarget.src = COMPANY_LOGO;
                  }}
                />
              ) : (
                <CourseCardPreview
                  previewVideoURL={props.previewVideoURL}
                  title={props.title}
                />
              )}
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
            <div className='d-flex flex-row justify-content-between'>
              <div>
                <div
                  className={`${
                    styles.course__card__instructor ?? ''
                  } text-break`}
                >
                  <Instructors
                    instructors={props.instructor}
                    linkClassName='text-dark'
                  />
                </div>
                <div className={` ${styles['fnt-xs'] ?? ''} text-break`}>
                  <strong>Duration: {formatDuration(props.duration)}</strong>
                </div>
                <CourseRating {...props.rating} />
                {x.percent == -1 && <Price {...props.price} />}
                {x.percent != -1 && <ProgressBar completed={x.percent} />}
              </div>
              <div>
                <CourseCardButtons />
              </div>
            </div>
          </div>
        </article>
      </OverlayTrigger>
    </>
  );
}

export default CourseCard;
