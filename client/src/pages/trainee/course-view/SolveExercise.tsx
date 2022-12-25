/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import Question from './Question';

import {
  AnswerStatus,
  QuestionOptionStatus,
  QuestionStatus,
  setArrayElement
} from './question-types';

import ExerciseResult from './ExerciseResult';

import useMultistepForm from '@/hooks/useMultistepForm';
import { ICourseExercise } from '@/interfaces/course.interface';

import { addSubmittedQuestion } from '@/services/axios/dataServices/TraineeDataService';

function SolveExercise(
  props: ICourseExercise & { courseId: string; traineeId: string }
) {
  const [questions, setQuestions] = useState<QuestionStatus[]>(
    props.questions.map((q, index) => ({
      question: q.question,
      questionNumber: index,
      answerStatus: AnswerStatus.NotChecked,
      selectedOption: null,
      options: q.options.map((o, i) => ({
        answer: o,
        isCorrect: q.answer === o,
        index: i,
        isSelected: false,
        disabled: false
      })),
      wrongAttempts: 0
    }))
  );
  const queryClient = useQueryClient();

  const optionSelected = (
    question: QuestionStatus,
    option: QuestionOptionStatus
  ) => {
    if (option.isSelected) {
      return;
    }
    const newQuestion = {
      ...question,
      answerStatus: AnswerStatus.NotChecked,
      options: question.options.map(o => ({
        ...o,
        isSelected: o === option
      }))
    };
    newQuestion.selectedOption =
      newQuestion.options.find(o => o.isSelected) || null;
    setQuestions(
      setArrayElement(questions, question.questionNumber, newQuestion)
    );
  };
  const stepTitles = [
    ...questions.map((_, index) => `Question #${index + 1}`),
    'Result'
  ];

  const {
    currentStepIndex,
    steps,
    step,
    title,
    subtitle,
    isLastStep,
    next,
    prev
  } = useMultistepForm(
    [
      ...questions.map(q => (
        <Question
          key={`q${q.questionNumber}`}
          {...q}
          // eslint-disable-next-line react/jsx-no-bind
          optionSelected={optionSelected}
        />
      )),
      <ExerciseResult key={`ExerciseResult`} {...props} />
    ],
    stepTitles,
    [...questions.map(q => q.question), '']
  );

  const submitAnswer = useMutation(async () => {
    const question = questions[currentStepIndex];
    if (!question || !question.selectedOption) {
      return;
    }
    await addSubmittedQuestion(
      props.courseId,
      props.traineeId,
      props._id,
      props.questions[currentStepIndex]?._id,
      question.selectedOption.answer
    );
    

    const correct = question.selectedOption.isCorrect;
    const newQuestion = {
      ...question,
      answerStatus: correct ? AnswerStatus.Correct : AnswerStatus.Wrong,
      wrongAttempts: correct ? 0 : 1
    };

    setQuestions(
      setArrayElement(questions, question.questionNumber, newQuestion)
    );
    next();
  }, {
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: [
          'getSubmittedQuestion',
          props.courseId,
          props.traineeId,
          props._id
        ],
      });
    }
  });

  return (
    <div>
      <form className='form-horizontal small'>
        <div className='border border-primary p-3 rounded'>
          <div className='float-end'>
            <strong className='text-dark'>
              {currentStepIndex + 1}/{steps.length}
            </strong>
          </div>
          {!isLastStep && <h3 className='text-dark'>{title}</h3>}
          {!isLastStep && <h5 className='text-dark'>{subtitle}</h5>}
          {step}
          <div className='form-group text-end my-3'>
            {currentStepIndex > 0 && !isLastStep && (
              <button
                className='btn btn-secondary mx-2'
                type='button'
                onClick={prev}
              >
                Prev
              </button>
            )}

            {!isLastStep && (
              <button
                className='btn btn-primary'
                type='button'
                onClick={() => submitAnswer.mutate()}
              >
                {currentStepIndex === questions.length - 1
                  ? 'See result'
                  : 'Next'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SolveExercise;
