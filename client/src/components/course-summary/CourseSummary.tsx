import { formatCurrency } from '../../utils/currency';

import { CourseSummaryProps } from './types';
import './course-summary.scss';

function CoursePrice(props: CourseSummaryProps) {
  if (!props.discount) {
    return <h5 className='text-dark'>{formatCurrency(props.price)}</h5>;
  }
  return (
    <h5 className='text-dark'>
      <strong>{formatCurrency(props.priceAfter)}</strong>{' '}
      <small className='old-price text-secondary'>
        {formatCurrency(props.price)}
      </small>
    </h5>
  );
}

function CourseSummary(props: CourseSummaryProps) {
  return (
    <a href='/'>
      <div className='course-block text-left'>
        <img alt={props.title} src={props.image} />
        <h5 className='text-dark'>
          <strong>{props.title}</strong>
        </h5>
        <h6>
          <a className='text-secondary' href='/'>
            <small>{props.instructorName}</small>
          </a>
        </h6>
        <p className='mb-1 golden'>
          <strong>{props.rating}</strong>
        </p>
        <CoursePrice {...props} />
      </div>
    </a>
  );
}

export default CourseSummary;
