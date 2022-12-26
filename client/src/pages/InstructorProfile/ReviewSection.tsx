import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import AddReview from './AddReview';

import { UseUser } from '@/store/userStore';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { deleteRequest, getRequest } from '@/services/axios/http-verbs';
import { HttpResponse } from '@/interfaces/response.interface';
import { Review } from '@/interfaces/course.interface';

import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import ReviewContainer from '@/components/reviewHolder/ReviewContainer';
import { toastOptions } from '@/components/toast/options';

function getMyReview(userID: string, instructorID: string) {
  const myReview = InstructorRoutes.GET.getUserReview;

  myReview.URL = `/instructor/rating/${instructorID}/trainee/${userID}`;

  return getRequest<HttpResponse<Review>>(myReview);
}

export default function ReviewSection(props: { instructrID: string }) {
  /*
  i get my Review for this instructor if possible 
  if i can review this instructor then i will show my review with the option to update
  if i don't have a review hence i will add the review section and try to add review
  */

  const user = UseUser();

  const [update, setUpdate] = useState(0);

  const [showForm, setShowForm] = useState<boolean>(false);

  function handleUpdate() {
    setUpdate(update + 1);
    setShowForm(false);
  }

  const { data, isLoading, isError, error } = useQuery(
    ['person-get-my-instructor-reviewwwww', location, update],
    () => getMyReview(user?._id as string, props?.instructrID),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000,
      enabled: true // 1 second
    }
  );

  if (isLoading) return <LoaderComponent />;

  if (isError || error) return <ErrorMessage />;

  const review = data?.data?.data;

  console.log(review);

  async function handleDelete() {
    const rev = InstructorRoutes.DELETE.userDeleteReview;

    rev.URL = `/instructor/rating/${props.instructrID}/trainee/${
      user?._id as string
    }`;

    await deleteRequest(rev);

    setUpdate(update + 1);

    toast.success('Your Review is Deleted Successfully...', toastOptions);
  }

  return (
    <>
      {review != null && review != undefined && (
        <>
          <div style={{ fontWeight: '700', fontSize: '1.5rem' }}>
            Your Review
          </div>
          <ReviewContainer
            comment={review?.comment}
            country={review?._trainee?.country}
            createdAt={review?.createdAt.toString()}
            img={review?._trainee?.profileImage}
            name={review?._trainee?.name}
            rating={review?.rating}
          />
          <button
            style={{
              border: 'none',
              backgroundColor: '#a00407',
              color: 'white',
              borderRadius: '10px'
            }}
            type='button'
            onClick={() => setShowForm(!showForm)}
          >
            Edit
          </button>
          <button
            style={{ border: 'none', color: '#a00407', borderRadius: '10px' }}
            type='button'
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </>
      )}
      {showForm && review != null && review != undefined && (
        <AddReview
          isUpdating
          instructorID={props?.instructrID}
          updateFunction={handleUpdate}
        />
      )}
      {(review && null) ||
        (review == undefined && (
          <AddReview
            instructorID={props?.instructrID}
            isUpdating={false}
            updateFunction={handleUpdate}
          />
        ))}
    </>
  );
}
