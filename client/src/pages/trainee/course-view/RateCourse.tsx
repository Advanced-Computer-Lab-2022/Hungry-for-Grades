import { Formik } from 'formik';
import { useCallback, useState } from 'react';
import { BsFillXCircleFill } from 'react-icons/bs';
import Modal from 'react-modal';

import StarRatingComponent from 'react-star-rating-component';

import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

import styles from './rate-course.module.scss';

import { useTraineeId } from '@/hooks/useTraineeId';
import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import { getTraineeReviewById } from '@/services/axios/dataServices/CoursesDataService';
//import { ICourseReview } from '@/interfaces/course.interface';

const ratingNames = ['Awful', 'Poor', 'Average', 'Very good', 'Excellent'];

function submitRating() {
  //   const result = {
  //     trainee: review._traineeId,
  //     comment: review.comment,
  //     createdAt: review.createdAt,
  //     rating: review.rating
  //   };
}

function RateCourse() {
  const traineeId = useTraineeId();
  const { courseId } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['getMyCourseReview', courseId],
    () => getTraineeReviewById(courseId, traineeId)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [starTempValue, setStarTempValue] = useState<number | null>(null);
  const openPopup = useCallback(() => setModalOpen(true), [setModalOpen]);
  const closePopup = useCallback(() => setModalOpen(false), [setModalOpen]);
  const resetTempStarValue = useCallback(
    () => setStarTempValue(null),
    [setStarTempValue]
  );
  if (isLoading) {
    return (
      <div className='container'>
        <LoaderCards numberOfCards={6} />
      </div>
    );
  } else if (isError) {
    return <></>;
  }
  const initialValues = !data
    ? {
        _traineeId: traineeId,
        comment: '',
        createdAt: new Date(),
        rating: 0
      }
    : {
        _traineeId: traineeId,
        comment: data.comment,
        createdAt: data.createdAt,
        rating: data.rating
      };
  const value = !data ? undefined : data.rating;
  return (
    <>
      <button type='button' onClick={openPopup}>
        {value !== undefined ? (
          <StarRatingComponent
            editing={
              false
            } /* is component available for editing, default `true` */
            name='currentRating' /* name of the radio input, it is required */
            value={
              value
            } /* number of selected icon (`0` - none, `1` - first) */
          />
        ) : (
          <div>Not rated yet.</div>
        )}
      </button>
      <Modal className={styles['modal-container'] ?? ''} isOpen={modalOpen}>
        <div className={styles['close-button-container'] ?? ''}>
          <button
            className={styles['close-button']}
            type='button'
            onClick={closePopup}
          >
            <BsFillXCircleFill />
          </button>
        </div>
        <Formik initialValues={initialValues} onSubmit={submitRating}>
          {formikProps => (
            <div className='py-2'>
              <h4 className='text-center'>Enter your review</h4>
              <h6 className='text-center'>
                {ratingNames[
                  (starTempValue ?? formikProps.values.rating) - 1
                ] ?? 'Not rated'}
              </h6>
              <h1 className='text-center'>
                <StarRatingComponent
                  editing /* is component available for editing, default `true` */
                  name='newRating' /* name of the radio input, it is required */
                  value={
                    starTempValue === null
                      ? formikProps.values.rating
                      : starTempValue
                  } /* number of selected icon (`0` - none, `1` - first) */
                  // eslint-disable-next-line react/jsx-no-bind
                  onStarClick={nextValue => {
                    formikProps.setValues({
                      ...formikProps.values,
                      rating: nextValue
                    });
                  }}
                  onStarHover={setStarTempValue}
                  onStarHoverOut={resetTempStarValue}
                />
              </h1>
              <div className='form-group mx-4'>
                <textarea
                  className='form-control'
                  placeholder='Tell us your opinion about this course.'
                />
              </div>
              <div className='text-end m-4'>
                <button className='btn btn-primary' type='submit'>
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default RateCourse;
