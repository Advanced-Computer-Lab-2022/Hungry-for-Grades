import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import SolveExam from './SolveExam';

import { getCourseExam } from '@/services/axios/dataServices/CoursesDataService';

function Exam() {
  const { courseid } = useParams();
  const { isError, isLoading, data } = useQuery(
    ['getCourseExam', courseid],
    () => getCourseExam(courseid)
  );
  if (isError) {
    return (
      <h1 className='text-danger text-center'>
        An error has occurred while loading exam information.
      </h1>
    );
  }
  if (isLoading) {
    return (
      <div className='text-info text-center'>Loading course information...</div>
    );
  }
  if (!data) {
    return <></>;
  }

  return (
    <SolveExam numberOfQuestions={data.length} questions={data} title='Exam' />
  );
}
export default Exam;
