import { useLocation, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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

  const handleSubmit = () => {
    navigate('/courses');
  };

  const fontFamily = 'Arial, Helvetica, sans-serif';

  if (data?.data?.totalResults == 0) {
    return (
			<div  >
      <div className='container text-center my-5'>
        <div
          className='mb-2'
          style={{
            fontFamily: fontFamily,
            fontWeight: '600',
            fontSize: '1.3rem',
          }}
        >
          <p>Your wishlist is empty.</p>
					<small style={{
						fontFamily: fontFamily,
						fontWeight: '400',
						fontSize: '1rem'
					}}>Keep shopping to find the right course for you.
</small>
        </div>

        <button
          className='btn btn-primary mt-2'
          style={{
            fontFamily: fontFamily
          }}
          type='submit'
          onClick={handleSubmit}
        >
          Browse courses now
        </button>
      </div>
			</div>
    );
  }

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
          {data?.data?.totalResults > 1 ? 's' : ''} in the whishlist
        </h2>

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
    </div>
  );
}
