import { v4 as uuid } from 'uuid';

import { TiTick } from 'react-icons/ti';
import './progress-steps.scss';

import { ProgressStepsProps } from './types';
function ProgressSteps(props: ProgressStepsProps) {
  const { steps, currentStepIndex } = props;
  return (
    <div id='steps'>
      {steps.map((step, index) => {
        return (
          <div
            key={uuid()}
            className={`step ${index === currentStepIndex ? 'active' : ''}
			${index < currentStepIndex ? 'done' : ''}`}
            data-desc={step}
          >
            {index < currentStepIndex ? <TiTick className='icon' /> : index + 1}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressSteps;