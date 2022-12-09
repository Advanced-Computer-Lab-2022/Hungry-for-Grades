import { ReactElement, useState } from 'react';

type Step = {
  currentStepIndex: number;
  steps: (ReactElement | string)[];
  step: ReactElement | string;
  title?: string;
  subtitle?: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  prev: () => void;
  goTo: (stepIndex: number) => void;
};

function useMultistepForm(
  steps: (ReactElement | string)[],
  titles: string[] | undefined,
  subtitles: string[] | undefined
): Step {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  function next() {
    setCurrentStepIndex(oldStep => {
      return oldStep >= steps.length - 1 ? oldStep : oldStep + 1;
    });
  }
  function prev() {
    setCurrentStepIndex(oldStep => {
      return oldStep <= 0 ? oldStep : oldStep - 1;
    });
  }
  function goTo(step: number) {
    setCurrentStepIndex(step);
  }
  return {
    currentStepIndex,
    steps: steps,
    step: steps.at(currentStepIndex) as ReactElement,
    title: titles ? titles.at(currentStepIndex) : undefined,
    subtitle: subtitles ? subtitles.at(currentStepIndex) : undefined,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    prev,
    goTo
  };
}

export default useMultistepForm;
