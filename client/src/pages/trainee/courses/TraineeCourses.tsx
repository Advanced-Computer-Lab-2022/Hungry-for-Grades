/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { mapCourseToCardProps } from '../../guest/landing/types';

//import styles from './MyCourses.module.scss';
import useCoursesQuery from './useCoursesQuery';

import { ICourse } from '@/interfaces/course.interface';

import CourseCard from '@/components/courseCard/CourseCard';

import Pagination from '@/components/pagination/Pagination';

import LoaderCards from '@components/loader/loaderCard/LoaderCards';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

export default function MyCourses() {
  const { data, isLoading, activePage, setActivePage } = useCoursesQuery();

  if (isLoading)
    return (
      <div className='container'>
        <LoaderCards numberOfCards={3} />
      </div>
    );

  const incoming: typeof TraineeRoutes.GET.getMyCourses.response.data =
    data?.data?.data;

  //console.log(incoming);

  //const course : ICourse = incoming[0]?._course;

  //console.log(course);

  const toShow = incoming?.map(course => {
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

  return (
    <>
      <div className='container'>
        <div className='row'>{toShow}</div>
      </div>
      {data?.data?.totalPages > 1 && (
        <div style={{ marginLeft: 'auto' }}>
          <Pagination
            activePage={activePage}
            pages={data?.data?.totalPages as number}
            setActivePage={setActivePage}
          />
        </div>
      )}
    </>
  );
}
