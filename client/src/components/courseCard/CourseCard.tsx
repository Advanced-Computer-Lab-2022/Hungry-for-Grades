/* eslint-disable sonarjs/cognitive-complexity */
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from 'react-router-dom';

import { Tooltip } from 'react-bootstrap';

// eslint-disable-next-line import/no-cycle
import CourseCardOverlay from './CourseCardOverlay';

import styles from './course-card.module.scss';

import Instructors from './Instructor';

import Price from './Price';

import CourseCardButtons from './cardButtons/CourseCardButtons';

import { CourseCardProps } from '@/pages/guest/landing/types';

import CourseRating from '@/pages/guest/course/CourseRating';
import { formatDuration } from '@/utils/duration';

import ProgressBar from '@/pages/trainee/progressBar/ProgressBar';
import { UseUser } from '@/store/userStore';
import { Role } from '@/enums/role.enum';
import { EnrolledCourse, ITrainee } from '@/interfaces/course.interface';
import RateCourse from '@/pages/trainee/course-view/RateCourse';

const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

function CourseCardPreview({
  previewVideoURL,
  title,
  image
}: {
  previewVideoURL: string;
  title: string;
  image: string;
}) {
  return !previewVideoURL ||
    !previewVideoURL.includes('https://www.youtube.com/embed/') ? (
    <img
      alt={title}
      className={`card-img-top img-fluid ${styles.course__img ?? ''}`}
      loading='lazy'
      src={image && image.length > 0 ? image : COMPANY_LOGO}
      onError={e => {
        e.currentTarget.src = COMPANY_LOGO;
      }}
    />
  ) : (
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

function CourseCard(courseProps: {
  pprops: CourseCardProps;
  percent: number;
  enrolled: boolean;
}) {
  const useUser = UseUser();
  const props = courseProps.pprops;

  let isActualEnrolled = courseProps.enrolled;

  //const isEnrolledActually = UseUser();

  function isActuallyEnrolled() {
    for (
      let i = 0;
      i < ((useUser as ITrainee)?._enrolledCourses as EnrolledCourse[])?.length;
      ++i
    ) {
      if (
        (((useUser as ITrainee)?._enrolledCourses as EnrolledCourse[])[i]
          ?._course as unknown as string) == courseProps?.pprops?.id
      ) {
        isActualEnrolled = true;
        break;
      }
    }
  }

  isActuallyEnrolled();

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
            <Link
              to={`${
                !isActualEnrolled
                  ? `/course/${props.id}`
                  : `/trainee/view-course/${props.id}/`
              }`}
            >
              <h4
                className={`${styles.course__title ?? ''} ${
                  styles['fnt-md'] ?? ''
                } text-dark text-left text-break`}
              >
                {props.title}
              </h4>
							<h6>
								{props?.category}  .  {props?.subcategory}
							</h6>
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
                  {props.duration && (
                    <strong>
                      Duration: {formatDuration(props.duration * 60)}
                    </strong>
                  )}
                </div>
                {isActualEnrolled && <CourseRating {...props.rating} />}
                {isActualEnrolled && (
                  <div className='my-2'>
                    <Link
                      className='btn btn-primary text-light'
                      to={`/trainee/view-course/${props.id}`}
                    >
                      View Course
                    </Link>
										<RateCourse courseid={props.id} />
                  </div>
                )}
                {courseProps.percent == -1 && <Price {...props.price} />}
                {courseProps.percent != -1 && (
                  <ProgressBar
                    completed={courseProps.percent}
                    courseID={courseProps?.pprops?.id}
                  />
                )}
              </div>
              {(useUser === null ||
                ((useUser.role.toLocaleLowerCase() ===
                  Role.TRAINEE.toLocaleLowerCase() ||
                  useUser.role.toLocaleLowerCase() ===
                    Role.NONE.toLocaleLowerCase()) &&
                  !(useUser as ITrainee)?.isCorporate)) &&
                !isActualEnrolled && (
                  <div>
                    <CourseCardButtons id={courseProps?.pprops?.id} />
                  </div>
                )}
            </div>
          </div>
        </article>
      </OverlayTrigger>
    </>
  );
}

export default CourseCard;
export { CourseCardPreview };
