import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import CourseContent from './CourseContent';
import CourseOverview from './CourseOverview';
import CourseHeader from './CourseHeader';

// import styles from './course.module.scss';

import { getCourseByID } from '@/services/axios/dataServices/CoursesDataService';
import { UseCountry } from '@/store/countryStore';

import { useCacheStoreSetData } from '@/store/cacheStore';

function Course() {
  const country = UseCountry();
  const { courseid } = useParams();
  const { isError, isLoading, data } = useQuery(
    ['courseByID', courseid, country],
    () => getCourseByID(courseid, country)
  );

  console.log(data);

  const upd = useCacheStoreSetData();

  if (isError) {
    return (
      <h1 className='text-danger text-center'>
        An error has occurred while loading course information.
      </h1>
    );
  }
  if (isLoading) {
    return (
      <div className='text-info text-center'>Loading course information...</div>
    );
  }
  if (!data) {
    return <></>;
  }

  const categ = data?.category;
  const sub = data?.subcategory.at(0);

  upd({ category: categ, subCategory: sub as string });

  return (
    <div className='container'>
      <CourseHeader {...data} />
      <section>
        <CourseOverview {...data} />
      </section>
      <section>
        <CourseContent {...data} />
      </section>
    </div>
  );
}

export default Course;
