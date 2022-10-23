import CourseTitle from './CourseTitle';
import CourseOverview from './CourseOverview';
import CourseContent from './CourseContent';

function Course() {
  return (
    <div>
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
