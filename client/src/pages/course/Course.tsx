import { useParams } from 'react-router-dom';

import CourseContent from './CourseContent';
import CourseOverview from './CourseOverview';
import CourseTitle from './CourseTitle';

function Course() {
  const { courseid } = useParams();

  return (
    <div>
      your course id is {courseid}
      <section>
        <CourseTitle />
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
