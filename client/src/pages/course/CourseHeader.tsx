import StarRatings from 'react-star-ratings';

import { Link } from 'react-router-dom';

import styles from './course-header.module.scss';

import { Course } from '@/services/axios/dataServices/CoursesDataService';

function CourseHeader(props: Course) {
  return (
    <div className={`p-5 text-light bg-dark rounded-3 m-3`}>
      <nav aria-label='breadcrumb'>
        <ol className={`breadcrumb ${styles['bread-crumb'] ?? ''}`}>
          <li className='breadcrumb-item'>
            <Link className='text-light' to='/courses'>
              {props.category}
            </Link>
          </li>
          {props.subcategory.map(s => (
            <li key={s} className='breadcrumb-item'>
              <Link className='text-light' to='/courses'>
                {s}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
      <h1>{props.title}</h1>
      <h3 className='pb-2'>{props.description}</h3>
      <div>
        <span className={styles['star-rating-number']}>
          {props.rating.averageRating}
          {'\u00A0'}
        </span>
        <span>
          <StarRatings
            numberOfStars={5}
            rating={props.rating.averageRating}
            starDimension='20px'
            starRatedColor='rgb(229, 152, 25)'
            starSpacing='0px'
          />
        </span>
        <span className={`text-light ${styles.reviews ?? ''}`}>
          ({props.rating.reviews.length} reviews)
        </span>
      </div>
      <div className={`text-light`}>
        Created by: &nbsp;
        {/* {props._instructor._user.map(instructor => instructor.name).join(', ')} */}
      </div>
      <div className={`text-light`}>
        Duration: &nbsp;
        {props.duration}h
      </div>
    </div>
  );
}

export default CourseHeader;
