import { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { mapCourseToCardProps } from '../types';

import useQueryBased from './UseQueryBased';

import { UseCacheStoreData } from '@/store/cacheStore';
import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import CourseCard from '@/components/courseCard/CourseCard';
import Pagination from '@/components/pagination/Pagination';
import { UseCountry } from '@/store/countryStore';

export default function Based() {
  const { category, subCategory } = UseCacheStoreData();

  const [activePage, setActivePage] = useState(1);

  const country = UseCountry();

  const locationn = useLocation();

  const { isLoading, data, isError } = useQueryBased(
    category,
    subCategory,
    activePage,
    country,
    locationn as unknown as Location
  );
  console.log(data);
  if (category == '') {
    return <></>;
  }
  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return (
      <div className='container'>
        <LoaderCards numberOfCards={3} />
      </div>
    );
  }

  const list = data?.data?.data;

  if (list?.length == 0) {
    return <></>;
  }

  const toShow = list?.map(course => {
    //const courseData: ICourse = course;
    const courseCardP = mapCourseToCardProps(course);
    return (
      <div key={course?._id} className={'col-12 col-md-6 col-lg-4'}>
        <CourseCard
          key={course._id}
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
      {data?.data?.totalPages != undefined && data?.data?.totalPages > 1 && (
        <div style={{ marginLeft: 'auto' }}>
          <Pagination
            activePage={activePage}
            pages={data?.data?.totalPages }
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
