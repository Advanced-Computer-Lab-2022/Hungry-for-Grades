import InstructorCourseCard from './InstructorCourseCard';

import { InstructorRoutes } from '@services/axios/dataServices/InstructorDataService';

function InstructorCoursesSection(
  props: typeof InstructorRoutes.GET.getCourses.response
) {
  const data = props?.data;
  const list = data?.map(course => (
    <InstructorCourseCard key={course._course.id} {...course} />
  ));
  console.log(data);
  return <>{list}</>;
}

export default InstructorCoursesSection;
