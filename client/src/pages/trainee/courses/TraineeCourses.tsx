

import { mapCourseToCardProps } from '../../guest/landing/types';

import useCoursesQuery from './useCoursesQuery';

import { ICourse } from '@/interfaces/course.interface';

import CourseCard from '@/components/courseCard/CourseCard';

import Pagination from '@/components/pagination/Pagination';

import LoaderCards from '@components/loader/loaderCard/LoaderCards';

import ErrorMessage from '@/components/error/message/ErrorMessage';


export default function MyCourses() {
  const { data, isLoading, activePage, setActivePage, isError, error } =
    useCoursesQuery();


  if (isLoading)
    return (
      <div className='container'>
        <LoaderCards numberOfCards={3} />
      </div>
    );

    if (isError || error || data?.data?.data?.data == null) {
      return <ErrorMessage errorMessage='You Dont have any courses Yet' link='youtube.com' linkTitle={'Go Check some courses now'}/>;
    }

  if(data?.data?.data?.success == false)
  {
    return <ErrorMessage errorMessage={data?.data?.data?.message} />
  }



  const incoming =
    data?.data?.data;


    if(incoming?.totalResults == 0)
    {
      return(<div>You Don;t Have any Courses</div>)
    }
  //console.log(incoming);

  //const course : ICourse = incoming[0]?._course;

  //console.log(course);

  const toShow = incoming?.map((course: { _course: ICourse; _id: string | null | undefined; progress: number; }) => {
    const tt: ICourse = course._course;
    const courseCardP = mapCourseToCardProps(tt);
    return (
      <div key={course._id} className={'col-12 col-md-6 col-lg-4'}>
        <CourseCard
          key={course._id}
          enrolled
          percent={course?.progress}
          pprops={courseCardP}
        />
      </div>
    );
  });
  console.log(data);

  return (
    <>
      <div className='container'>
        <div className='row'>{toShow}</div>
      </div>
      {data?.data?.data?.totalPages > 1 && (
        <div style={{ marginLeft: 'auto' }}>
          <Pagination
            activePage={activePage}
            pages={data?.data?.data?.totalPages as number}
            setActivePage={setActivePage}
          />
        </div>
      )}
    </>
  );
}
