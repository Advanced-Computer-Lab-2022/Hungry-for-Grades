import { Link } from 'react-router-dom';

import styles from './course-header.module.scss';

import CourseRating from './CourseRating';

import { type ICourse } from '@interfaces/course.interface';
import Instructors from '@/components/course/Instructor';
import Price from '@/components/course/Price';
import { formatDuration } from '@/utils/duration';

function CourseHeader(props: ICourse) {
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
      {/* <div className='float-end'>
            <img alt={props.title} height='135px' src={props.thumbnail} width='240px'/>
      </div> */}
      <h3 className='pb-2'>{props.description}</h3>
      <CourseRating {...props.rating} />
      <div className={`text-light`}>
        Created by: &nbsp;
        <Instructors instructor={props._instructor} />
      </div>
      <div className={`text-light`}>
        Duration: &nbsp;
        {formatDuration(props.duration)}
      </div>
      <Price {...props.price} />
    </div>
  );
}

export default CourseHeader;
