import useCourseReviews from './useCourseReviews';

import Pagination from '@/components/pagination/Pagination';
import ReviewContainer from '@/components/reviewHolder/ReviewContainer';
import { CoursesRoutes } from '@/services/axios/dataServices/CoursesDataService';

export default function CourseReviewList(props: { id: string }) {
  const data = useCourseReviews(props.id);
  const list = data?.data?.data?.data;
  const toShow = list?.map(
    (review: typeof CoursesRoutes.GET.getCourseReviews.response.data[0]) => {
      return (
        <ReviewContainer
          key={review?._id}
          comment={review?.comment}
          country={review?._trainee.country}
          createdAt={review?.createdAt}
          img={review?._trainee.profileImage}
          name={review?._trainee.name}
          rating={review?.rating}
        />
      );
    }
  );

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', color: '#520e0e' }}>Course Reviews</h1>
      {toShow}
      {data?.data?.data?.totalPages > 1 && (
        <Pagination
          activePage={data?.activePage}
          pages={data?.data?.data?.totalPages}
          setActivePage={data?.setActivePage}
        />
      )}
    </div>
  );
}
