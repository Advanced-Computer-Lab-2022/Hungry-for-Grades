import { useState } from 'react';

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

function SolveExam(props: ICourseExercise) {
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
  const stepTitles = [
    ...questions.map((_, index) => `Question #${index + 1}`),
    'Result'
  ];
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
      <div key='results'>Results</div>
    ],
    stepTitles,
    [...questions.map(q => q.question), 'TODO:']
  );
  // const handleSubmit = async (
  //   values: CourseFormValues,
  //   actions: FormikHelpers<CourseFormValues>
  // ) => {
  //   if (isLastStep) {
  //     await submitCourse(values, props.submitAction);
  //   } else {
  //     actions.setTouched({});
  //     actions.setSubmitting(false);
  //     next();
  //   }
  // };
  return (
    <div>
      <form className='form-horizontal small'>
        <ProgressSteps currentStepIndex={currentStepIndex} steps={stepTitles} />
        <div className='border border-primary p-3 rounded'>
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
            {isLastStep && (
              <button className='btn btn-primary' type='submit'>
                Submit
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
                  Next
                </button>
              )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default SolveExam;
