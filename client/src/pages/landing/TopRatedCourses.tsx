import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

import CourseCard from '../../components/courseCard/CourseCard';

import { mapCourseToCardProps } from './types';

import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import { getTopRatedCourses } from '@/services/axios/dataServices/CoursesDataService';

function TopRatedCourses() {
  const { data, isLoading, isError } = useQuery(
    ['topRated'],
    getTopRatedCourses
  );
  const coursesMapped = data?.data.map(mapCourseToCardProps);
  if (isLoading) {
    return (
      <div className='container'>
        <LoaderCards numberOfCards={6} />
      </div>
    );
  } else if (isError) {
    return <div>Error</div>;
  } else if (coursesMapped) {
    return (
      <div className='container'>
        <h2 className='text-dark text-left mb-3'>Top rated courses</h2>
        <div className='row'>
          {coursesMapped?.map(course => (
            <div key={course.id} className='col-12 col-md-6 col-lg-4'>
              <CourseCard {...course} />
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
