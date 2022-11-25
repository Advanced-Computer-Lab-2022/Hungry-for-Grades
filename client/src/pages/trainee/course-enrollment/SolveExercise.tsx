/* eslint-disable @typescript-eslint/no-use-before-define */
import { useState } from 'react';
import { Icon } from '@iconify/react';

import Question from './Question';

import {
  AnswerStatus,
  QuestionOptionStatus,
  QuestionStatus,
  setArrayElement
} from './question-types';

import useMultistepForm from '@/hooks/useMultistepForm';
import { ICourseExercise } from '@/interfaces/course.interface';
import ProgressSteps from '@/components/progress/ProgressSteps';

function SolveExercise(props: ICourseExercise) {
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
  const correctAnswers = questions.reduce(
    (s, q) => s + (q.wrongAttempts === 0 ? 1 : 0),
    0
  );
  const score = correctAnswers / questions.length;
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
  } correctly out of ${questions.length}.`;
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

  const checkAnswer = () => {
    const question = questions[currentStepIndex];
    if (!question || !question.selectedOption) {
      return;
    }
    const correct = question.selectedOption.isCorrect;
    const newQuestion = {
      ...question,
      answerStatus: correct ? AnswerStatus.Correct : AnswerStatus.Wrong,
      wrongAttempts: question.wrongAttempts + (correct ? 0 : 1),
      options: question.options.map(o => ({
        ...o,
        disabled: correct
          ? !o.isCorrect
          : o === question.selectedOption
          ? true
          : o.disabled,
        isSelected: correct ? o.isCorrect : false
      }))
    };

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
      <div key='results' />
    ],
    stepTitles,
    [...questions.map(q => q.question), resultSubtitle]
  );

  return (
    <div>
      <form className='form-horizontal small'>
        <ProgressSteps currentStepIndex={currentStepIndex} steps={stepTitles} />
        <div className='border border-primary p-3 rounded'>
          {questions[currentStepIndex]?.answerStatus === AnswerStatus.Wrong && (
            <div className='alert alert-danger'>
              <Icon icon='ci:error-outline' />
              &nbsp;
              <strong>Incorrect answer. Please try again</strong>
            </div>
          )}
          {questions[currentStepIndex]?.answerStatus ===
            AnswerStatus.Correct && (
            <div className='alert alert-success'>
              <Icon icon='mdi:tick-circle-outline' />
              &nbsp;
              <strong>Your answer is correct! Good job!</strong>
            </div>
          )}
          <div className='float-end'>
            <strong className='text-dark'>
              {currentStepIndex + 1}/{steps.length}
            </strong>
          </div>
          <h3 className='text-dark'>{title}</h3>
          <h5 className='text-dark'>{subtitle}</h5>
          {step}
          <div className='form-group text-end my-3'>
            {currentStepIndex > 0 && (
              <button
                className='btn btn-secondary mx-2'
                type='button'
                onClick={prev}
              >
                Prev
              </button>
            )}

            {questions[currentStepIndex]?.selectedOption &&
              questions[currentStepIndex]?.answerStatus !==
                AnswerStatus.Correct && (
                <button
                  className='btn btn-primary'
                  type='button'
                  onClick={checkAnswer}
                >
                  Check Answer
                </button>
              )}
            {!isLastStep &&
              questions[currentStepIndex]?.answerStatus ===
                AnswerStatus.Correct && (
                <button
                  className='btn btn-primary'
                  type='button'
                  onClick={next}
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
