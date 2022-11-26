import { useLocation } from 'react-router-dom';

import useWishQuery from './UseWishQuery';

import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { ICourse } from '@/interfaces/course.interface';
import { mapCourseToCardProps } from '@/pages/guest/landing/types';
import CourseCard from '@/components/courseCard/CourseCard';
import Pagination from '@/components/pagination/Pagination';

export default function TraineeWishlist() {
  const location = useLocation();

  const { data, isLoading, activePage, setActivePage } = useWishQuery(
    location as unknown as Location
  );

  if (isLoading) return <LoaderCards numberOfCards={3} />;

  console.log(data?.data?.totalPages);

  const incoming: typeof TraineeRoutes.GET.getMyWishlist.response.data =
    data?.data?.data;

  const toShow = incoming?.map(course => {
    const tt: ICourse = course;
    const courseCardP = mapCourseToCardProps(tt);
    console.log('Here is a Course');
    console.log(course);
    return (
      <div key={course.id} className={'col-12 col-md-6 col-lg-4'}>
        <CourseCard key={course.id} percent={-1} pprops={courseCardP} />
      </div>
    );
  });

  return (
    <>
      <div
        className='container row'
        style={{ marginLeft: '15%', marginTop: '2rem' }}
      >
        {toShow}
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


