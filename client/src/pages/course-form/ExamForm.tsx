import { setArrayElement } from '../trainee/course-view/question-types';

import {
  AnswerFormValues,
  getUniqueId,
  QuestionFormValues
} from './course-form-types';

import { ExamFormContext, IExamFormContext } from './exam-form-types';

import NumberOfQuestionsForm from './NumberOfQuestionsForm';

import ExamQuestionForm from './ExamQuestionForm';

import useExamMultistepForm from './useExamMultistepForm';

import ProgressSteps from '@/components/progress/ProgressSteps';

function createSteps(questions: QuestionFormValues[]) {
  return {
    steps: [
      <NumberOfQuestionsForm
        key='nquestions'
        numberOfQuestions={questions.length}
      />,
      ...questions.map((q, index) => (
        <ExamQuestionForm
          key={q.uid}
          isLastQuestion={index === questions.length - 1}
          question={q}
          questionIndex={index}
        />
      ))
    ],
    titles: [
      'Number of questions',
      ...questions.map((_, index) => `Question #${index + 1}`)
    ],
    subtitles: [
      'Please enter the number of question of the exam',
      ...questions.map(() => '')
    ]
  };
}

type CreateExamFunction = (questions: QuestionFormValues[]) => Promise<void>;

function ExamForm(props: { createExam: CreateExamFunction }) {
  const {
    updateSteps,
    questions,
    currentStepIndex,
    steps,
    titles,
    step,
    title,
    subtitle,
    next,
    prev
  } = useExamMultistepForm(createSteps);

  const setNumberOfQuestions = (n: number) => {
    if (n !== questions.length) {
      let newQuestions: QuestionFormValues[];
      if (n < questions.length) {
        newQuestions = questions.slice(0, n);
      } else {
        newQuestions = [
          ...questions,
          ...Array(n - questions.length)
            .fill(undefined)
            .map(() => ({
              uid: getUniqueId(),
              question: '',
              answer: '',
              options: [] as AnswerFormValues[]
            }))
        ];
      }
      updateSteps(newQuestions);
    }
    next();
  };
  const setQuestion = async (q: QuestionFormValues, index: number) => {
    const newQuestions = setArrayElement(questions, index, q);
    updateSteps(newQuestions);
    if (index === newQuestions.length - 1) {
      await props.createExam(newQuestions);
    } else {
      next();
    }
  };
  const context: IExamFormContext = {
    prev,
    setNumberOfQuestions,
    setQuestion
  };

  return (
    <ExamFormContext.Provider value={context}>
      <div>
        <ProgressSteps currentStepIndex={currentStepIndex} steps={titles} />
        <div className='border border-primary p-3 rounded'>
          <div className='float-end'>
            <strong className='text-dark'>
              {currentStepIndex + 1}/{steps.length}
            </strong>
          </div>
          <h3 className='text-dark'>{title}</h3>
          <h5 className='text-dark'>{subtitle}</h5>
          {step}
        </div>
      </div>
    </ExamFormContext.Provider>
  );
}

export default ExamForm;
