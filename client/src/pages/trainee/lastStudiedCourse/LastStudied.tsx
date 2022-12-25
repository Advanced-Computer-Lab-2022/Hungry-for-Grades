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
    <section className='container mx-auto py-5'>
      {course && (
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
                completed={course?.progress == undefined ? 0 : course?.progress}
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
                  : 'Continue now'}{' '}
              </Link>
              {!(course?.progress === undefined || course.progress === 0) && (
                <RateCourse courseid={course._course._id} />
              )}
            </div>
          </div>
        </div>
      )}

      <TraineeNoteList courseName={course?._course?.title} />
    </section>
  );
}
