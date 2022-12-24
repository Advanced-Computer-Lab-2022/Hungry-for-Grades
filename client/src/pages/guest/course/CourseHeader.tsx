import { Link } from 'react-router-dom';

import styles from './course-header.module.scss';

import CourseRating from './CourseRating';

import CoursePreviewVideo from './CoursePreviewVideo';

import { type ICourse } from '@interfaces/course.interface';
import Instructors from '@/components/courseCard/Instructor';
import { formatDuration } from '@/utils/duration';
import useCourseButtons from '@/hooks/useCourseButtons';

function CourseHeader(props: ICourse & { videoClassName: string }) {
  const { requestAccess, viewCourse, addToWishList } =
    useCourseButtons(props._id);
  return (
    <div className={`py-3 text-light bg-dark rounded-3 mb-3`}>
      <div className='container'>
        <nav aria-label='breadcrumb mx-3'>
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
      </div>
      <div className={props.videoClassName}>
        <CoursePreviewVideo {...props} />
      </div>
      <div className='container'>
        <h1>{props.title}</h1>
        {/* <div className='float-end'>
            <img alt={props.title} height='135px' src={props.thumbnail} width='240px'/>
      </div> */}
        <small className='pb-2' style={{fontSize: '1.2rem'}}>{props.description}</small>
        <CourseRating {...props.rating} />
        <div className={`text-light`}>
          Created by: &nbsp;
          <Instructors instructors={props._instructor} />
        </div>
        <div className={`text-light`}>
          Duration: &nbsp;
          {formatDuration(props.duration * 60)}
        </div>
        {addToWishList && <div className={`${props.videoClassName} mt-2`}>
          <button className='btn btn-light w-100' type='button'><strong>Add to Wishlist</strong></button>
        </div>}
        {viewCourse && <div className={`${props.videoClassName} mt-2`}>
          <button className='btn btn-light w-100' type='button'><strong>Go to course</strong></button>
        </div>}
        {requestAccess && <div className={`${props.videoClassName} mt-2`}>
          <button className='btn btn-light w-100' type='button' onClick={requestAccess}><strong>Request access</strong></button>
        </div>}
      </div>
    </div>
  );
}

export default CourseHeader;
