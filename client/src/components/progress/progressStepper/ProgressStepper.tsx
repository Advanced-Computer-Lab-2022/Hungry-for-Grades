/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
                style={{
                  cursor: props.goTo
                    ? index <= currentStepIndex
                      ? 'pointer'
                      : 'not-allowed'
                    : 'default'
                }}
                onClick={() => {
                  if (props.goTo && index <= currentStepIndex)
                    props.goTo(index);
                }}
              >
                {!props.icons ? (
                  <span className='number'>{index + 1}</span>
                ) : (
                  props.icons[index]
                )}
                <span className='title'>{step}</span>
                <span className='subtitle'>
                  {props.subtitles ? props.subtitles[index] : ''}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProgressSteps;
