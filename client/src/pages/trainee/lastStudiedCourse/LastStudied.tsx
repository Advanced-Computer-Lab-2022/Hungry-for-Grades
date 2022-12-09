import TraineeNoteList from '../note/TraineeNoteList';

import styles from './last-study.module.scss';

import useLastStudiedQuery from './useLastStudied';

import ProgressBar from '@pages/trainee/progressBar/ProgressBar';

import { ICourse } from '@/interfaces/course.interface';

export default function LastStudy() {
  const { data, isLoading } = useLastStudiedQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  console.log(data);

  const course: ICourse = data?.data?.data;

  return (
    <section className='container mx-auto'>
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
          <div className={styles.cnt}>Continue now</div>
        </div>
      </div>
      <TraineeNoteList courseName={course?._course?.title} />
    </section>
  );
}
