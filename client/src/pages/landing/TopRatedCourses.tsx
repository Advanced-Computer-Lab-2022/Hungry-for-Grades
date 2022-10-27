import { useQuery } from '@tanstack/react-query';

import CourseCard from '../course/CourseCard';

import { mapCourseToCardProps } from './types';

import { getTopRatedCourses } from '@/services/axios/dataServices/CoursesDataService';

function TopRatedCourses() {
  const courses = useQuery(['topRated'], getTopRatedCourses);
  const coursesMapped = courses.data?.data.map(mapCourseToCardProps);
  if (coursesMapped) {
    return (
      <div className='container'>
        <div className='row'>
          {coursesMapped.map(c => (
            <div key={c.id} className='col'>
              <CourseCard {...c} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <></>;
}

export default TopRatedCourses;
