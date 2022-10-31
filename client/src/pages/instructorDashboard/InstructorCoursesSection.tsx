import InstructorCourseCard from './InstructorCourseCard';

function InstructorCoursesSection(props) {
  const wholeData = Object.values(props);
  const data = wholeData[0];
  return data?.map(course => (
    <InstructorCourseCard key={course._course.id as string} props={course} />
  ));
}

export default InstructorCoursesSection;
