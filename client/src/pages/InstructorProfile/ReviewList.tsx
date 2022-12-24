
import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

import Loader from '@/components/loader/loaderpage/Loader';
import Pagination from '@/components/pagination/Pagination';
import ReviewContainer from '@/components/reviewHolder/ReviewContainer';
import { getRequest } from '@/services/axios/http-verbs';
import { Review } from '@/interfaces/course.interface';
import { PaginatedResponse } from '@/interfaces/response.interface';

async function getReviews(id: string, activePage: number) {
  const Inst = InstructorRoutes.GET.getReviews;

  Inst.params = id;

  Inst.query = `page=${activePage}&limit=${4}`;

  return getRequest<PaginatedResponse<Review>>(Inst);
}

export default function ReviewList(props: { text: string }) {
  const [reviewPage, setReviewPage] = useState<number>(1);

  const instructorId = props.text;

  const { isLoading, data } = useQuery(
    ['getReviewsNowwww', reviewPage],
    () => getReviews(instructorId, reviewPage),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000 // 1 second
    }
  );

  if (isLoading) return <Loader />;


  const reviewList :Review[] = data?.data?.data as Review[];


  const toShow = reviewList?.map(
    (review: Review) => {
      return (
        <ReviewContainer
          key={review?._trainee?.username}
          comment={review.comment}
          country={review._trainee.country}
          createdAt={review.createdAt.toString() }
          img={review._trainee.profileImage}
          name={review._trainee.name}
          rating={review.rating}
        />
      );
    }
  );

  return (
    <div className='container'>
      <div>{toShow}</div>
      {data?.data?.totalPages as number > 1 && (
        <Pagination
          activePage={reviewPage}
          pages={data?.data?.totalPages as number}
          setActivePage={setReviewPage}
        />
      )}
    </div>
  );
}
