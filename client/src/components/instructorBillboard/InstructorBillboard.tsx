import { Link } from 'react-router-dom';

import styles from './InstructorBillboard.module.css';

function InstructorBillboard() {
  return (
    <div
      className={`${
        styles.instructor_billboard || ''
      } container d-flex flex-lg-row flex-column-reverse `}
    >
      <div className={styles.billboard_content}>
        <h5>Share your knowledge</h5>
        <p>
          Real-world experts like you make a global impact by teaching on
          Canadian Chamber of Commerce. We believe everyone has something to
          offer. Share your unique skills and experiences with students around
          the world by teaching a free or paid course.
        </p>
        <div className='d-flex flex-row justify-content-end justify-content-lg-start'>
          <Link className='btn btn-outline-primary ' to='/register'>
            Be Instructor
          </Link>
        </div>
      </div>
      <div>
        <img
          alt='Man on white and yellow background'
          src='./src/assets/Instructor sign up.jpg'
          style={{ width: '24.35rem', height: '20rem' }}
        />
      </div>
    </div>
  );
}

export default InstructorBillboard;
