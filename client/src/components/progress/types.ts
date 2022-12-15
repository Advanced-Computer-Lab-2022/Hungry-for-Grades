import { ReactNode } from 'react';
export type ProgressStepsProps = {
  currentStepIndex: number;
  steps: string[];
  icons?: ReactNode[];
  subtitles?: string[];
};
