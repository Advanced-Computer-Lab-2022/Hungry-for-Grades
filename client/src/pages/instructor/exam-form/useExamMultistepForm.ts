import { ReactElement, useState } from 'react';

import { QuestionFormValues } from '../course-form/course-form-types';

type Step = {
  currentStepIndex: number;
  steps: ReactElement[];
  step: ReactElement;
  title: string;
  subtitle: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  titles: string[];
  next: () => void;
  prev: () => void;
  goTo: (stepIndex: number) => void;
  updateSteps: (newQuestions: QuestionFormValues[]) => void;
  questions: QuestionFormValues[];
};

type StepsData = {
  steps: ReactElement[];
  titles: string[];
  subtitles: string[];
};

type MultiStepState = {
  currentStepIndex: number;
} & StepsData;

function useExamMultistepForm(
  stepsFactory: (questions: QuestionFormValues[]) => StepsData
): Step {
  const [questions, setQuestions] = useState<QuestionFormValues[]>([]);
  const [stepsState, setStepsState] = useState<MultiStepState>(() => ({
    currentStepIndex: 0,
    ...stepsFactory(questions)
  }));

  function next() {
    setStepsState(oldState => {
      return oldState.currentStepIndex >= oldState.steps.length - 1
        ? oldState
        : {
            ...oldState,
            currentStepIndex: oldState.currentStepIndex + 1
          };
    });
  }
  function prev() {
    setStepsState(oldState => {
      return oldState.currentStepIndex <= 0
        ? oldState
        : {
            ...oldState,
            currentStepIndex: oldState.currentStepIndex - 1
          };
    });
  }
  function goTo(step: number) {
    setStepsState(oldState =>
      step >= 0 && step < oldState.steps.length
        ? { ...oldState, currentStepIndex: step }
        : oldState
    );
  }

  function updateSteps(newQuestions: QuestionFormValues[]) {
    setQuestions(newQuestions);
    const newSteps = stepsFactory(newQuestions);
    setStepsState(oldState => ({
      ...newSteps,
      currentStepIndex:
        oldState.currentStepIndex >= newSteps.steps.length
          ? newSteps.steps.length - 1
          : oldState.currentStepIndex
    }));
  }
  return {
    currentStepIndex: stepsState.currentStepIndex,
    steps: stepsState.steps,
    step: stepsState.steps.at(stepsState.currentStepIndex) as ReactElement,
    title: stepsState.titles.at(stepsState.currentStepIndex) ?? '',
    subtitle: stepsState.subtitles.at(stepsState.currentStepIndex) ?? '',
    isFirstStep: stepsState.currentStepIndex === 0,
    isLastStep: stepsState.currentStepIndex === stepsState.steps.length - 1,
    next,
    prev,
    goTo,
    updateSteps,
    titles: stepsState.titles,
    questions
  };
}

export default useExamMultistepForm;
