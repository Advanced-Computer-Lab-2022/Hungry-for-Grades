import { useState } from 'react';

import { Link } from 'react-router-dom';

import { mapCourseToCardProps } from '../types';

import useQueryBased from './UseQueryBased';

import { UseCacheStoreData } from '@/store/cacheStore';
import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import { ICourse } from '@/interfaces/course.interface';
import CourseCard from '@/components/courseCard/CourseCard';
import { CoursesRoutes } from '@/services/axios/dataServices/CoursesDataService';
import Pagination from '@/components/pagination/Pagination';
import { UseCountry } from '@/store/countryStore';

export default function Based() {
  const { category, subCategory } = UseCacheStoreData();

  const [activePage, setActivePage] = useState(1);

  const country = UseCountry();

  const { isLoading, data, isError } = useQueryBased(
    category,
    subCategory,
    activePage,
    country
  );
  if (!category) {
    return <></>;
  }
  if (!isError) {
    return <></>;
  }

  if (isLoading) {
    return (
      <div className='container'>
        <LoaderCards numberOfCards={3} />
      </div>
    );
  }

  const list: typeof CoursesRoutes.GET.getCoursesSearchFilter.response.data =
    data?.data?.data;

  if (list?.length == 0) {
    return <></>;
  }

  const toShow = list?.map(course => {
    const courseData: ICourse = course;
    const courseCardP = mapCourseToCardProps(courseData);
    return (
      <div key={courseData._id} className={'col-12 col-md-6 col-lg-4'}>
        <CourseCard
          key={courseData._id}
          enrolled={false}
          percent={-1}
          pprops={courseCardP}
        />
      </div>
    );
  });

  return (
    <section className='container'>
      <h2 className='text-dark text-left mb-2'>Based on your Recent Choices</h2>

      <div className='row'>{toShow}</div>
      {data?.data?.totalPages > 1 && (
        <div style={{ marginLeft: 'auto' }}>
          <Pagination
            activePage={activePage}
            pages={data?.data?.totalPages as number}
            setActivePage={setActivePage}
          />
        </div>
      )}
      <p className='text-end'>
        <Link to={`courses?category=${category}&subCategory=${subCategory}`}>
          View all related courses
        </Link>
      </p>
    </section>
  );
}
