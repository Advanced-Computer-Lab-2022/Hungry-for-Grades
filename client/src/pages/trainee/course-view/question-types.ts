export enum AnswerStatus {
  NotChecked = 1,
  Wrong = 2,
  Correct = 3
}

export type QuestionOptionStatus = {
  answer: string;
  isCorrect: boolean;
  disabled: boolean;
  index: number;
  isSelected: boolean;
};

export type QuestionStatus = {
  question: string;
  questionNumber: number;
  selectedOption: QuestionOptionStatus | null;
  answerStatus: AnswerStatus;
  options: QuestionOptionStatus[];
  wrongAttempts: number;
};

export function setArrayElement<T>(array: T[], index: number, element: T): T[] {
  return [
    ...array.slice(0, index),
    element,
    ...array.slice(index + 1, array.length)
  ];
}
