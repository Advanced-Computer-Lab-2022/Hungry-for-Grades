/* eslint-disable @typescript-eslint/no-unsafe-argument */

import styles from './CourseCard.module.scss';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

function getOriginalPrice(
  price: number,
  discounts: object[]
): number | undefined {
  if (!discounts?.length) {
    return undefined;
  }
  const now = new Date();
  const discount = discounts.find(
    d => new Date(d.startDate) <= now && new Date(d.endDate) > now
  );
  if (!discount) {
    return undefined;
  }
  return (price / (100 - discount.percentage)) * 100;
}

export default function CourseCard(
  props: typeof InstructorRoutes.GET.getCourses.response.data[0]
) {
  const list = props._course.captions.map(language => {
    return (
      <>
        <span key={language}> {language} </span>{' '}
      </>
    );
  });
  const old = getOriginalPrice(
    props._course.price.currentValue,
    props._course.price.discounts
  );
  //console.log(props._course.price.currency);
  return (
    <div className={styles.course_wrapper}>
      <img
        alt='Course'
        src={props?._course.thumbnail}
        style={{
          paddingBottom: '1rem',
          width: '100%',
          height: '12rem',
          objectFit: 'fill'
        }}
      />
      <h3
        style={{
          marginBottom: '0.4rem',
          fontWeight: '700',
          fontSize: '1.3rem'
        }}
      >
        {props?._course.title}
      </h3>
      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6a6f73' }}>
        {props._course.category}
      </div>
      <div
        style={{
          fontSize: '0.8rem',
          fontWeight: '700',
          color: '#6a6f73',
          display: 'inline-block'
        }}
      >
        {' '}
        {list}{' '}
      </div>
      <div style={{ fontSize: '1rem', fontWeight: '400' }}>
        {' '}
        {props?._course._instructor}{' '}
      </div>

      <div
        className={styles.Stars}
        style={
          {
            '--rating': props._course.rating.averageRating
          } as React.CSSProperties
        }
      >
        {' '}
        {props._course.rating.averageRating}
      </div>
      <div style={{ fontSize: '1rem', fontWeight: '700' }}>
        {' '}
        {props?._course?.price?.currency} {props?._course.price.currentValue}{' '}
        {old != undefined && (
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: '500',
              textDecoration: 'line-through'
            }}
          >
            {' '}
            {props?._course?.price?.currency} {old}{' '}
          </span>
        )}
      </div>
    </div>
  );
}
