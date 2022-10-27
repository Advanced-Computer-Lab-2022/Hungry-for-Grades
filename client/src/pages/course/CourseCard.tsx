/* eslint-disable import/order */
import { CourseCardProps } from '../landing/types';
import styles from './CourseCard.module.scss';
import StarRatings from 'react-star-ratings';

// function CourseCard() {
//   return (
//     <div className='course-container'>
//       <div className='img-wrapper'>
//         <img
//           alt='course'
//           src={'https://img-c.udemycdn.com/course/750x422/394676_ce3d_5.jpg'}
//           style={{ height: '8.4375rem', width: '15rem' }}
//         />
//       </div>
//       <div>
//         <div>
//           <h4 className='course-title fnt-md'>
//             Learn Python: The Complete Python Programming Course
//           </h4>
//         </div>
//         <div className='instructors fnt-xs'>Avinash Jain, The Codex</div>
//         <div>
//           <span className='star-rating-number fnt-sm-b'>
//             4.3
//             {'\u00A0'}
//           </span>
//         </div>
//         <div className='fnt-md-b'>$16.99</div>
//       </div>
//     </div>
//   );
// }

//component with props:

function CourseCard(props: CourseCardProps) {
  return (
    <a href='/course'>
      <div className={styles['course-container']}>
        <div className={styles['img-wrapper']}>
          <img alt='course' height='135px' src={props.image} width='240px' />
        </div>
        <div>
          <div>
            <h4
              className={`${styles['course-title'] ?? ''} ${
                styles['fnt-md'] ?? ''
              }`}
            >
              {props.title}
            </h4>
          </div>
          <div
            className={`${styles.instructors ?? ''} ${styles['fnt-xs'] ?? ''}`}
          >
            {props.instructors.map(instructor => instructor.name).join(', ')}
          </div>
          <div>
            <span className={styles['star-rating-number']}>
              {props.rating}
              {'\u00A0'}
            </span>
            <span>
              <StarRatings
                numberOfStars={5}
                rating={props.rating}
                starDimension='20px'
                starRatedColor='rgb(229, 152, 25)'
                starSpacing='0px'
              />
            </span>
          </div>
          <div className={styles['fnt-md-b']}>${props.price}</div>
        </div>
      </div>
    </a>
  );
}

export default CourseCard;
