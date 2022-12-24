import StarRatings from 'react-star-ratings';

import styles from './CourseCard.module.scss';

import { ITeachedCourse } from '@/interfaces/instructor.interface';



export default function CourseCard(props: {
  course: ITeachedCourse;
  instructorName: string;
}) {
  const list = props?.course?._course?.captions?.map((language: string) => {
    return (
      <>
        <span key={language}> {language} </span>{' '}
      </>
    );
  });
  const toGo = `/course/:${props.course?._course?._id }`;
  return (
    <div className={styles.course_wrapper}>
      <a href={toGo}>
        <img
          alt='Course'
          src={props?.course?._course?.thumbnail}
          style={{
            paddingBottom: '1rem',
            width: '100%',
            height: '12rem',
            objectFit: 'fill'
          }}
        />
      </a>
      <a href={toGo} style={{ color: '#1c1d1f' }}>
        <h3
          style={{
            marginBottom: '0.4rem',
            fontWeight: '700',
            fontSize: '1.3rem'
          }}
        >
          {props?.course?._course?.title}
        </h3>
      </a>
      <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#6a6f73' }}>
        {props.course?._course?.category}
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
        {props.instructorName}{' '}
      </div>

      <StarRatings
          numberOfStars={5}
          rating={props?.course?._course?.rating?.averageRating}
          starDimension='20px'
          starRatedColor='rgb(229, 152, 25)'
          starSpacing='0px'
        />
      <div style={{ fontSize: '1rem', fontWeight: '700' }}>
        {' '}
        {props?.course?._course?.price?.currency}{' '}
        {props?.course?._course?.price.currentValue}{' '}
        {/*old != props?.course?._course?.price.currentValue && old != undefined  && (
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: '500',
              textDecoration: 'line-through'
            }}
          >
            {' '}
            {props?.course?._course?.price?.currency} {old}{' '}
          </span>
          )*/}
      </div>
    </div>
  );
}
