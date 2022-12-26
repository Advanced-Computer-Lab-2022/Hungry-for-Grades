import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { BsFillXCircleFill } from 'react-icons/bs';
import Modal from 'react-modal';

import StarRatingComponent from 'react-star-rating-component';

import { useQuery } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import styles from './rate-course.module.scss';

import { useTraineeId } from '@/hooks/useTraineeId';
import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import {
  addReviewToCourse,
  getTraineeReviewById
} from '@/services/axios/dataServices/TraineeDataService';
import { ICourseReview, ITrainee } from '@/interfaces/course.interface';
import { toastOptions } from '@/components/toast/options';


const ratingNames = ['Awful', 'Poor', 'Average', 'Very good', 'Excellent'];

function RateCourse(props: { courseid: string }) {
  const traineeId = useTraineeId();
  const { data, isLoading, isError } = useQuery(
    ['getMyCourseReview', props.courseid],
    () => getTraineeReviewById(props.courseid, traineeId)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [starTempValue, setStarTempValue] = useState<number | null>(null);
  const openPopup = useCallback(() => setModalOpen(true), [setModalOpen]);
  const closePopup = useCallback(() => setModalOpen(false), [setModalOpen]);
  const [comment, setComment] = useState('');
  const submitRating = useCallback(
    async (review: ICourseReview) => {
      if (!review.rating) {
        return;
      }
      const r = {
        _trainee: { _id: review._traineeId } as ITrainee,
        comment: review.comment,
        createdAt: review.createdAt,
        rating: review.rating
      };

      const res = await addReviewToCourse(props.courseid, r);
      if (res) {
        toast('Review submitted successfully',toastOptions);
        closePopup();
      }
    },
    [props.courseid, closePopup]
  );
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
      {value !== undefined ? (
        <div className='text-start'>
          <strong style={{ fontSize: '0.9rem', lineHeight: '0' }}>
            Your Review:
          </strong>
          <h6
            className={`${styles['rating-container'] ?? ''} mx-1`}
            style={{ lineHeight: '-1' }}
          >
            <StarRatingComponent
              editing={
                false
              } /* is component available for editing, default `true` */
              name='currentRating' /* name of the radio input, it is required */
              value={
                value
              } /* number of selected icon (`0` - none, `1` - first) */
            />
          </h6>
          <p className='text-dark' style={{ fontSize: '0.75rem' }}>
            {data?.comment}
          </p>
        </div>
      ) : (
        <button
          className='text-secondary mx-2 btn btn-link'
          style={{ textDecoration: 'none' }}
          type='button'
          onClick={openPopup}
        >
          <div>Rate course</div>
        </button>
      )}
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
            <Form>
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
                    value={comment}
                    onChange={event => {
                      setComment(event.target.value);
                      formikProps.setValues({
                        ...formikProps.values,
                        comment: comment
                      });
                    }}
                  />
                </div>
                <div className='text-end m-4'>
                  <button className='btn btn-primary' type='submit'>
                    Submit Review
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default RateCourse;
