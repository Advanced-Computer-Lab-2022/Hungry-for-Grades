import styles from './course-title.module.scss';

function CourseTitle() {
  return (
    <div className={`${styles['course-title'] ?? ''} pt-3 pb-4 ml-5 px-5`}>
      <h1>Course Title</h1>
      <h3 className='pb-2'>Course Description</h3>
      <p className={`${styles['rating-design'] ?? ''} mb-1`}>
        {' '}
        <strong>Rating</strong>
      </p>
      <p className={`${styles['other-design'] ?? ''} mb-1`}>
        <small>Created by</small>
      </p>
      <p className={`${styles['other-design'] ?? ''} mb-0`}>
        <small>released</small>
      </p>
    </div>
  );
}

export default CourseTitle;
