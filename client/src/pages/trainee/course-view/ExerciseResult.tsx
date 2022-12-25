import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getSubmittedQuestions } from '@/services/axios/dataServices/TraineeDataService';
import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import { ICourseExercise } from '@/interfaces/course.interface';
import { useTraineeId } from '@/hooks/useTraineeId';

function ExerciseResult(props: ICourseExercise) {
  const traineeId = useTraineeId();
  const { courseid } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['getSubmittedQuestion', courseid, traineeId, props._id],
    () => getSubmittedQuestions(courseid, traineeId, props._id)
  );
  if (isLoading) {
    return (
      <div className='container'>
        <LoaderCards numberOfCards={6} />
      </div>
    );
  } else if (isError) {
    return (
      <>
        Trainee ID: {traineeId}, Exercise Id {props._id}{' '}
      </>
    );
  }
  const correctAnswers =
    data?.reduce(
      (s, sq, index) =>
        s + (sq.submittedAnswer === props.questions[index]?.answer ? 1 : 0),
      0
    ) ?? 0;
  const score = correctAnswers / props.questions.length;
  let grade = '';
  if (score >= 0.85) {
    grade = 'Excellent!';
  } else if (score > 0.75) {
    grade = 'Good!';
  } else if (score > 0.5) {
    grade = 'Not bad!';
  } else {
    grade = 'Try again!';
  }
  const resultSubtitle = `${grade} You got ${correctAnswers} question${
    correctAnswers > 1 ? 's' : ''
  } correctly out of ${props.questions.length}.`;
  return (
    <div className='container'>
      <h3>{props.title} Result</h3>
      <h5>{resultSubtitle}</h5>
      <div className='col'>
        {data?.map((d, index) => {
          return (
            <div key={d._questionId} className='row m-3'>
              <h6 className='text-dark'>1. {props.questions[index]?.question}</h6>
              <p className='text-dark'>
                Your answer was: {d.submittedAnswer}
                <br />
                Correct answer is: {props.questions[index]?.answer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExerciseResult;
