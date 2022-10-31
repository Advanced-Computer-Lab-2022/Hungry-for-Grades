import { Link } from 'react-router-dom';

import { getOriginalPrice } from '../landing/types';

import styles from './course-header.module.scss';

import CourseRating from './CourseRating';

import { type ICourse } from '@interfaces/course.interface';
import Price from '@/components/course/Price';

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
        {/* {props._instructor._user.map(instructor => instructor.name).join(', ')} */}
      </div>
      <div className={`text-light`}>
        Duration: &nbsp;
        {props.duration}h
      </div>
      <Price
        currency={props.price.currency}
        id={props._id}
        image={''}
        instructors={[]}
        originalPrice={getOriginalPrice(props.price)}
        price={props.price.currentValue}
        rating={{
          averageRating: 0,
          reviews: []
        }}
        title={''}
        totalHours={0}
      />
    </div>
  );
}

export default CourseHeader;
