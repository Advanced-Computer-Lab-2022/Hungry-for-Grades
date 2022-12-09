import { Link } from 'react-router-dom';

import TraineeNoteList from '../note/TraineeNoteList';

import styles from './last-study.module.scss';

import useLastStudiedQuery from './useLastStudied';

import ProgressBar from '@pages/trainee/progressBar/ProgressBar';

import { ICourse } from '@/interfaces/course.interface';
import Loader from '@/components/loader/loaderpage/Loader';

export default function LastStudy() {
  const { data, isLoading } = useLastStudiedQuery();

  if (isLoading) {
    return <Loader />;
  }

  const course: ICourse = data?.data?.data;

  return (
    <section className='container mx-auto'>
      {course && (
        <div className={`${styles.holder ?? ''} mb-5`}>
          <img
            alt={course?._course?.title}
            className={styles.image_holder}
            loading='lazy'
            src={course?._course?.thumbnail}
            onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
              sevent.target.onerror = null;
              event.target.src = 'https://via.placeholder.com/150';
            }}
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
              <ProgressBar completed={course?.progress} />
            </div>
            {/* 						meteiny fix link
             */}{' '}
            <Link className={styles.cnt} to={`/trainee/view-course/`}>
              Continue now
            </Link>
          </div>
        </div>
      )}
      <TraineeNoteList courseName={course?._course?.title} />
    </section>
  );
}
