import CourseRating from './CourseRating';

import { ICourse } from '@/interfaces/course.interface';

import Price from '@/components/courseCard/Price';
import useCourseButtons from '@/hooks/useCourseButtons';

function CourseFooter(props: ICourse) {
  const { addToCart, viewCourse } = useCourseButtons(props._id);
  return (
    <div className='bg-dark row px-3 py-1'>
      <div className='col my-2'>
        <h5 className='text-light'>{props.title}</h5>
        <CourseRating {...props.rating} />
      </div>
      {!viewCourse && <Price {...props.price} />}
      {addToCart && (
        <div className='col my-2 float-end text-end text-light'>
          <button
            className='btn btn-light my-2'
            style={{ width: '140px' }}
            type='button'
          >
            <strong>Add to Cart</strong>
          </button>
        </div>
      )}
    </div>
  );
}

export default CourseFooter;
