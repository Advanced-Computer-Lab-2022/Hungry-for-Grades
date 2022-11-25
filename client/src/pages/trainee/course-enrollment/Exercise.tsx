import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import SolveExercise from './SolveExercise';

import { UseCountry } from '@/store/countryStore';
import { getCourseByID } from '@/services/axios/dataServices/CoursesDataService';

function Exercise() {
  const country = UseCountry();
  const { courseid, sectionNumber, exerciseNumber } = useParams();
  const { isError, isLoading, data } = useQuery(
    ['courseByID', courseid, country],
    () => getCourseByID(courseid, country)
  );
  if (isError) {
    return (
      <h1 className='text-danger text-center'>
        An error has occurred while loading course information.
      </h1>
    );
  }
  if (isLoading) {
    return (
      <div className='text-info text-center'>Loading course information...</div>
    );
  }
  if (!data || !sectionNumber || !exerciseNumber) {
    return <></>;
  }
  const section = data.sections[parseInt(sectionNumber, 10)];
  if (!section) {
    return (
      <h1 className='text-danger text-center'>Error: Invalid Course Section</h1>
    );
  }
  const exercise = section.exercises[parseInt(exerciseNumber, 10)];
  if (!exercise) {
    return (
      <h1 className='text-danger text-center'>
        Error: Invalid Course Exercise
      </h1>
    );
  }

  return <SolveExercise {...exercise} />;
}
export default Exercise;
