import { useLocation } from 'react-router-dom';

import useWishQuery from './UseWishQuery';

import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import { ICourse } from '@/interfaces/course.interface';
import { mapCourseToCardProps } from '@/pages/guest/landing/types';
import CourseCard from '@/components/courseCard/CourseCard';
import Pagination from '@/components/pagination/Pagination';
import { UseUser } from '@/store/userStore';
import { IUser } from '@/interfaces/user.interface';

export default function TraineeWishlist() {
  const location = useLocation();

  const user = UseUser();

  const { data, isLoading, activePage, setActivePage } = useWishQuery(
    location as unknown as Location,
    user as IUser
  );

  if (isLoading)
    return (
      <div className='container'>
        <LoaderCards numberOfCards={3} />
      </div>
    );

  console.log(data?.data?.totalPages);

  const incoming = data?.data?.data;

  const toShow = incoming?.map(course => {
    const tt: ICourse = course;
    const courseCardP = mapCourseToCardProps(tt);
    console.log('Here is a Course');
    console.log(course);
    return (
      <div key={course?._id} className={'col-12 col-md-6 col-lg-4'}>
        <CourseCard
          key={course?._id}
          enrolled={false}
          percent={-1}
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
      {(data?.data?.totalPages as number) > 1 && (
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
