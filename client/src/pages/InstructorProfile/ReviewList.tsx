/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

import { getRequest } from '@/services/axios/http-verbs';
import Loader from '@/components/loader/loaderpage/Loader';
import ReviewContainer from '@/components/reviewHolder/ReviewContainer';
import Pagination from '@/components/pagination/Pagination';

async function getReviews(id: string, activePage: number) {
  const Inst = InstructorRoutes.GET.getReviews;

  Inst.params = id;

  Inst.query = `page=${activePage}
  &limit=${4}`;

  return getRequest(Inst);
}

export default function ReviewList(props: { text: string }) {
  const [reviewPage, setReviewPage] = useState<number>(1);

  const instructorId = props.text;

  const { isLoading, data } = useQuery(
    ['getReviewsNow', reviewPage],
    () => getReviews(instructorId, reviewPage),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000 // 1 second
    }
  );

  console.log(data);

  if (isLoading) return <Loader />;

  const t1: typeof InstructorRoutes.GET.getReviews.response = data?.data;

  const reviewList: typeof InstructorRoutes.GET.getReviews.response.data[0][] =
    t1?.data;

  console.log(reviewList);

  const toShow = reviewList.map(
    (course: typeof InstructorRoutes.GET.getReviews.response.data[0]) => {
      return (
        <ReviewContainer
          key={course._id}
          comment={course.comment}
          country={course._trainee.address.country}
          createdAt={course.createdAt}
          img={course._trainee.profileImage}
          name={course._trainee.name}
          rating={course.rating}
        />
      );
    }
  );

  return (
    <>
      <div>{toShow}</div>
      {t1.totalPages > 1 && (
        <Pagination
          activePage={reviewPage}
          pages={t1.totalPages}
          setActivePage={setReviewPage}
        />
      )}
    </>
  );
}
