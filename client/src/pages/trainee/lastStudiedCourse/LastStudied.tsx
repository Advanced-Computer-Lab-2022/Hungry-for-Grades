import { Link } from 'react-router-dom';

import TraineeNoteList from '../note/TraineeNoteList';

import RateCourse from '../course-view/RateCourse';

import styles from './last-study.module.scss';

import useLastStudiedQuery from './useLastStudied';

import ProgressBar from '@pages/trainee/progressBar/ProgressBar';

import { EnrolledCourse } from '@/interfaces/course.interface';
import Loader from '@/components/loader/loaderpage/Loader';

export default function LastStudy() {
  const { data, isLoading } = useLastStudiedQuery();

  if (isLoading) {
    return <Loader />;
  }

  const course: EnrolledCourse | undefined = data?.data?.data;

  return (
    <div
      className='py-4'
      style={{
        backgroundColor: '#f8f9fa'
      }}
    >
      <section className='container mx-auto'>
        {course ? (
          <div className={`${styles.holder ?? ''} mb-5`}>
            <img
              alt={course?._course?.title}
              className={styles.image_holder}
              loading='lazy'
              src={course?._course?.thumbnail}
            />
            <div
              style={{
                width: '60%',
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <span className={styles.txt}> {course?._course?.title}</span>
              <div style={{ width: '70%' }}>
                <ProgressBar
                  completed={
                    course?.progress == undefined ? 0 : course?.progress
                  }
                  courseID={''}
                />
              </div>{' '}
              <div className='my-2'>
                <Link
                  className={`${styles.cnt || ''}`}
                  to={`/trainee/view-course/${course?._course?._id}`}
                >
                  {course?.progress === undefined || course?.progress === 0
                    ? 'Start now'
                    : 'Continue now'}
                </Link>
                {!(course?.progress === undefined || course.progress === 0) && (
                  <RateCourse courseid={course._course._id} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            className='py-3'
            style={{
              backgroundColor: '#f8f9fa'
            }}
          >
            <div className='container text-center my-5'>
              <div
                className='mb-2'
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: '600',
                  fontSize: '1.3rem'
                }}
              >
                Find a course you want to learn today.
              </div>
              <div
                style={{
                  fontFamily: 'Arial, Helvetica, sans-serif'
                }}
              >
                When you enroll in a course, it will appear here.{' '}
                <Link className='alert-link' to={'../courses'}>
                  Browse now
                </Link>
              </div>
            </div>
          </div>
        )}
        <hr
          className='mb-4'
          style={{
            opacity: '0.2',
            color: 'red'
          }}
        />

        <TraineeNoteList courseName={course?._course?.title} />
      </section>
    </div>
  );
}
