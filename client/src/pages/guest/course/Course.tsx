/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import CourseContent from './CourseContent';
import CourseOverview from './CourseOverview';
import CourseHeader from './CourseHeader';

import PreviewVideo from './PreviewVideo';

import CourseReviewList from './CourseReviewList';

import { getCourseByID } from '@/services/axios/dataServices/CoursesDataService';
import { UseCountry } from '@/store/countryStore';

import { UseCacheStoreSetData } from '@/store/cacheStore';
import ErrorMessage from '@/components/error/message/ErrorMessage';

function Course() {
  const country = UseCountry();
  const { courseid } = useParams();
  const { isError, isLoading, data } = useQuery(
    ['courseByID', courseid, country],
    () => getCourseByID(courseid, country)
  );

  const useCacheStoreSetData = UseCacheStoreSetData();

  if (isError) {
    return <ErrorMessage />;
  }
  if (isLoading) {
    return (
      <div className='text-info text-center'>Loading course information...</div>
    );
  }
  if (!data) {
    return <></>;
  }
  const category = data?.category;
  const subCategory = data?.subcategory.at(0);
  if (category && subCategory) {
    useCacheStoreSetData({
      category: category,
      subCategory: subCategory
    });
  }

  return (
    <div className='container'>
      <CourseHeader {...data} />
      <PreviewVideo {...data} />
      <section>
        <CourseOverview {...data} />
      </section>
      <section>
        <CourseContent {...data} />
      </section>
      <section>
        <CourseReviewList id={data._id} />
      </section>
    </div>
  );
}

export default Course;
