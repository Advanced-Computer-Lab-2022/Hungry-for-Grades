import { FaStar } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import { type TestmonialCardProps } from './types';
function TestmonialCard(props: TestmonialCardProps) {
  const { name, rating, review, jobTitle } = props;
  return (
    <div className='item service-item'>
      <div className='author'>
        <i>
          <img
            alt='Second Author'
            src='assets/images/testimonial-author-1.png'
          />
        </i>
      </div>
      <div className='testimonial-content'>
        <ul className='stars'>
          {Array.from({ length: rating }).map(() => {
            return (
              <li key={uuidv4()}>
                <FaStar />
              </li>
            );
          })}
        </ul>
        <h4>{name}</h4>
        <p>“{review}”</p>
        <span>{jobTitle}</span>
      </div>
    </div>
  );
}

export default TestmonialCard;
