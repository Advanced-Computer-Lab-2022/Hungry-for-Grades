import { useState } from 'react';

import { useLocation } from 'react-router-dom';

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
  const cachedData = UseCacheStoreData();

  const location = useLocation();

  const [activePage, setActivePage] = useState(1);

  const con = UseCountry();

  const { isLoading, data } = useQueryBased(
    cachedData.category,
    cachedData.subCategory,
    activePage,
    con,
    location
  );

  console.log(cachedData.category);

  console.log(cachedData.subCategory);

  if (cachedData.category == undefined) {
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

  console.log(list.length);

  if (list.length == 0) {
    return <></>;
  }

  const toShow = list?.map(course => {
    const courseData: ICourse = course;
    const courseCardP = mapCourseToCardProps(courseData);
    console.log(courseCardP);
    return (
      <div key={courseData._id} className={'col-12 col-md-6 col-lg-4'}>
        <CourseCard key={courseData._id} percent={-1} pprops={courseCardP} />
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
    </section>
  );
}
