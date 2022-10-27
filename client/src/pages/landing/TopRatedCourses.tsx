import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

import CourseCard from '../course/CourseCard';

import { mapCourseToCardProps } from './types';

import { getTopRatedCourses } from '@/services/axios/dataServices/CoursesDataService';

function TopRatedCourses() {
  const courses = useQuery(['topRated'], getTopRatedCourses);
  const coursesMapped = courses.data?.data.map(mapCourseToCardProps);
  if (coursesMapped) {
    return (
      <div className='container'>
        <h2 className='text-dark text-left mb-3'>Top rated courses</h2>
        <div className='row'>
          {coursesMapped.map(c => (
            <div key={c.id} className='col'>
              <CourseCard {...c} />
            </div>
          ))}
        </div>
        <p className='text-end'>
          <Link to='/courses'>View all courses</Link>
        </p>
      </div>
    );
  }
  return <></>;
}

export default TopRatedCourses;
