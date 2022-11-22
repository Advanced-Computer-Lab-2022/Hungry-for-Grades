import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

import { mapCourseToCardProps } from './types';

import CourseCard from '@/components/course/CourseCard';

import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import { getTopRatedCourses } from '@/services/axios/dataServices/CoursesDataService';
import { UseCountry } from '@/store/countryStore';

function TopRatedCourses() {
  const country = UseCountry();
  const { data, isLoading, isError } = useQuery(['topRated', country], () =>
    getTopRatedCourses(country)
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
      <section className='container'>
        <h2 className='text-dark text-left mb-2'>Top rated courses</h2>
        <div className='row'>
          {coursesMapped?.map(course => (
            <div key={course.id} className='col-12 col-md-6 col-lg-4'>
              <CourseCard percent={-1} pprops={course} />
            </div>
          ))}
        </div>
        <p className='text-end'>
          <Link to='/courses'>View all courses</Link>
        </p>
      </section>
    );
  }
  return <></>;
}

export default TopRatedCourses;
