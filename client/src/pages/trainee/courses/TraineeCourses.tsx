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
      return <ErrorMessage errorMessage='You Dont have any courses Yet' link='youtube.com' linkTitle={'Go Check some courses now'}/>;
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

  if (data?.data?.totalResults == 0) {
    return <div>You Don;t Have any Courses</div>;
  }

  const toShow = incoming?.map(
    (course) => {
      const tt: ICourse = course._course;
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
    }
  );
  console.log(data);

  return (
    <>
      <div className='container'>
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
    </>
  );
}
