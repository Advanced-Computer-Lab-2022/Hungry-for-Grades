import { useParams } from 'react-router-dom';

import CourseContent from './CourseContent';
import CourseOverview from './CourseOverview';
import CourseTitle from './CourseTitle';

import styles from './course.module.scss';
// import CourseCard from './CourseCard';

function Course() {
  const { courseid } = useParams();

  return (
    <div>
      your course id is {courseid}
      <section>
        <div className={`${styles.container ?? ''}`}>
          <CourseTitle />
          <div
            className={`${styles.card ?? ''} pt-3 pb-4 ml-5 px-5 `}
            style={{ width: '40%', float: 'right' }}
          >
            {/* <CourseCard/> */}
          </div>
        </div>
      </section>
      <section>
        <CourseOverview />
      </section>
      <section>
        <CourseContent />
      </section>
    </div>
  );
}

export default Course;
