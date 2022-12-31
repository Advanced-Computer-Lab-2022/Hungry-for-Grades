import { Link } from 'react-router-dom';

import { mapCourseToCardProps } from '../../guest/landing/types';

import useCoursesQuery from './useCoursesQuery';

import { ICourse } from '@/interfaces/course.interface';

import CourseCard from '@/components/courseCard/CourseCard';

import Pagination from '@/components/pagination/Pagination';

import LoaderCards from '@components/loader/loaderCard/LoaderCards';

import ErrorMessage from '@/components/error/message/ErrorMessage';
import { UseUser } from '@/store/userStore';
import { IUser } from '@/interfaces/user.interface';

export default function MyCourses() {
  const user = UseUser();

  const { data, isLoading, activePage, setActivePage, isError, error } =
    useCoursesQuery(user as IUser);

  if (isLoading)
    return (
      <div className='container'>
        <LoaderCards numberOfCards={3} />
      </div>
    );

  if (isError || error || data?.data?.data == null) {
    return (
      <ErrorMessage
        errorMessage='You Dont have any courses Yet'
        link='/trainee/courses'
        linkTitle={'Go Check some courses now'}
      />
    );
  }
  if (isError || error || data?.data?.data == null) {
    return (
      <ErrorMessage
        errorMessage='You Dont have any courses Yet'
        link='/trainee/courses'
        linkTitle={'Go Check some courses now'}
      />
    );
  }

  if (Boolean(data?.data?.success) === false) {
    return <ErrorMessage errorMessage={data?.data?.message} />;
  }

  const incoming = data?.data?.data;

  console.log(incoming);

  if (incoming.length == 0) {
    return (
      <div className='container text-center my-5'>
        <div
          className='mb-2'
          style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontWeight: '600',
            fontSize: '1.3rem'
          }}
        >
          Find a course you want to learn today.
        </div>
        <div
          style={{
            fontFamily: 'Arial, Helvetica, sans-serif'
          }}
        >
          When you enroll in a course, it will appear here.{' '}
          <Link className='alert-link' to={'../courses'}>
            Browse now
          </Link>
        </div>
      </div>
    );
  }

  const toShow = incoming?.map(course => {
    if (course?._course == null) return <></>;
    const tt: ICourse = course?._course;
    const courseCardP = mapCourseToCardProps(tt);
    return (
      <div key={course?._course?._id} className={'col-12 col-md-6 col-lg-4'}>
        <CourseCard
          key={course?._course?._id}
          enrolled
          percent={course?.progress as number}
          pprops={courseCardP}
        />
      </div>
    );
  });
  console.log(data);

  return (
    <div
      className='py-3'
      style={{
        backgroundColor: '#f8f9fa'
      }}
    >
      <div className='container'>
        <h2 className='text-dark text-left mb-2 mt-2 ml-5'>
          {' '}
          {data?.data?.totalResults} Course
          {data?.data?.totalResults > 1 ? 's' : ''} in your courses
        </h2>

        <div className='row'>{toShow}</div>
      </div>
      {data?.data?.totalPages > 1 && (
        <div style={{ marginLeft: 'auto' }}>
          <Pagination
            activePage={activePage}
            pages={data?.data?.totalPages}
            setActivePage={setActivePage}
          />
        </div>
      )}
    </div>
  );
}
