import './progress-stepper.scss';

import { ProgressStepsProps } from '../types';
function ProgressSteps(props: ProgressStepsProps) {
  const { steps, currentStepIndex } = props;
  return (
    <div className='container' id='crumbs'>
      <ul>
        {steps.map((step, index) => {
          return (
            <li key={`${step}${index * 3 + 2}`}>
              <div
                className={` ${index === currentStepIndex ? 'active' : ''}
			  ${index < currentStepIndex ? 'done' : ''}`}
              >
                {!props.icons ? (
                  <span className='number'>{index}</span>
                ) : (
                  props.icons[index]
                )}
                {step}
                <span>{props.subtitles ? props.subtitles[index] : ''}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProgressSteps;
