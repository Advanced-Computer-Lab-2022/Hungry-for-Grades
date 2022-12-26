import { createContext } from 'react';

import { QuestionFormValues } from '../course-form/course-form-types';

export type IExamFormContext = {
  setNumberOfQuestions(n: number): void;
  setQuestion(q: QuestionFormValues, index: number): void;
  prev: () => void;
};

export const ExamFormContext = createContext<IExamFormContext>({
  setNumberOfQuestions: () => {},
  setQuestion: () => {},
  prev: () => {}
});
