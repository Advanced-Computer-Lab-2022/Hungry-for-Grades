/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { AiFillEdit } from 'react-icons/ai';

import { BsFillTrashFill, BsShareFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';

import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import styles from './InstructorCourseCard.module.scss';

import { formatCurrency } from '@/utils/currency';
import { deleteCourse } from '@/services/axios/dataServices/CoursesDataService';
import { CourseDiscount } from '@/interfaces/course.interface';
import { ITeachedCourse } from '@/interfaces/instructor.interface';

function getOriginalPrice(
  price: number,
  discounts: CourseDiscount[]
): number | undefined {
  if (!discounts?.length) {
    return undefined;
  }
  const now = new Date();
  const discount = discounts.find(
    d => new Date(d?.startDate) <= now && new Date(d?.endDate) > now
  );
  if (!discount) {
    return undefined;
  }
  return (price / (100 - discount.percentage)) * 100;
}

function InstructorCourseCard(props: ITeachedCourse) {
  const data = props?._course ?? '';
  const earned = props.earning;
  const photo = data?.thumbnail ?? '';
  const title = data?.title ?? '';
  const price = data?.price ?? '';
  const enrolled = data?.numberOfEnrolledTrainees ?? '';
  const rating = data?.rating?.averageRating ?? '';
  const discount = data?.price?.discounts;
  const oldPrice = getOriginalPrice(price.currentValue, discount);
  const courseId = data._id;
  const queryClient = useQueryClient();
  const deleteCourseWithConfirm = useCallback(async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete this course? This action cannot be undone!'
      )
    ) {
      return false;
    }
    await deleteCourse(courseId);
    await queryClient.invalidateQueries({
      queryKey: ['search-instructor-courses'],
      exact: false
    });
  }, [courseId, queryClient]);
  if (!props._course.price) return <></>;
  return (
    <div className={`${styles.cardContainer ?? ''}`}>
      <div
        className={`rows d-flex flex-column  mx-auto px-0 my-3 d-flex flex-md-row flex-column`}
        style={{ minHeight: '8rem' }}
      >
        <div
          className={`col d-flex  align-center ${styles.border_div || ''}`}
          style={{ height: '8rem', paddingLeft: '0' }}
        >
          <div>
            <img
              alt='course'
              className='img-fluid'
              src={photo}
              style={{
                height: '8rem',
                objectFit: 'fill'
              }}
            />
          </div>

          <div
            className='p-2 d-flex flex-column justify-content-around'
            style={{ width: '90%' }}
          >
            <h6 className={styles.courseTitle}>{title}</h6>
            <div className='d-flex align-items-center justify-content-between'>
              <div
                className={`bg-primary px-2 rounded-pill text-white

                 ${styles.fnt_sm || ''}`}
              >
                live
              </div>
              <div className={styles.fnt_sm}>
                <div
                  style={{
                    textDecoration: 'line-through',
                    display: 'inline-block'
                  }}
                >
                  {formatCurrency(oldPrice, price.currency)}
                </div>
                &nbsp;&nbsp;
                {formatCurrency(price.currentValue, price.currency)}{' '}
              </div>
            </div>
          </div>
        </div>
        <hr className={`d-md-block d-none ${styles.hr || ''}`} />
        <div
          className={`col d-flex align-center px-0 border-top border-bottom border-primary ${
            styles.border_div || ''
          }`}
          style={{ height: '8rem' }}
        >
          <div className={`col ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div className={styles.partOne}>Total earned</div>
              <div>
                <h5>{formatCurrency(earned, price.currency)} </h5>
              </div>
            </div>
          </div>
          <hr className={styles.hr} style={{ top: '-0.1875rem' }} />
          <div className={`col ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div className={styles.partOne}>Enrolled students</div>
              <div>
                <h4>{enrolled}</h4>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`col d-flex align-center px-0 border-top border-bottom border-primary ${
            styles.border_div || ''
          }`}
          style={{ height: '8rem' }}
        >
          <hr className={`d-md-block d-none  ${styles.hr || ''}`} />
          <div className={`col  ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div className={styles.partOne}>Course rating</div>
              <div>
                <h4>{rating}</h4>
              </div>
            </div>
          </div>
          <hr className={styles.hr} style={{ top: '-0.1875rem' }} />
          <div className={`col ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div
                className={`${
                  styles.partOne ?? ''
                } d-flex justify-content-center`}
              >
                Unanswered questions
              </div>
              <div>
                <h4>2</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.cardButtons ?? ''}`}>
        <Link
          className='btn btn-primary btn-lg'
          to={`/course/${data?._id as string}`}
        >
          View Course
        </Link>
        <a
          className='btn btn-primary btn-lg'
          href={'https://www.linkedin.com/feed/'}
        >
          Share
          <BsShareFill />
        </a>
        <Link className='btn btn-primary btn-lg' to={``}>
          Edit
          <AiFillEdit />
        </Link>
        <button
          className='btn btn-secondary btn-lg ms-3'
          type='button'
          onClick={deleteCourseWithConfirm}
        >
          Delete
          <BsFillTrashFill />
        </button>
        <Link
          to={`/instructor/hussein/${props._course.title as string}/${
            props._course._id as string
          }`}
        >
          <button className='btn btn-primary btn-lg' type='button'>
            Discounts
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InstructorCourseCard;
