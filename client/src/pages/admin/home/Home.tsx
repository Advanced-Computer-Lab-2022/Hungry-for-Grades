import './nav-button.scss';

import { useState } from 'react';

import ReactSelect from 'react-select';

import UseSearchQuery from './UseDataQuery';

import AreaAnalytics from './analytics/AreaAnalytics';
import BarAnalytics from './analytics/BarAnalytics';
import LineAnalytics from './analytics/LineAnalytics';

import Trainees from './trainees/Trainees';

import useMultistepForm from '@/hooks/useMultistepForm';

import ErrorMessage from '@/components/error/message/ErrorMessage';
import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
import { UseUser } from '@/store/userStore';
import { IInstructor } from '@/interfaces/instructor.interface';

const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const date = new Date();
const year = date.getFullYear() - 2018 + 1;

const options = new Array(year).fill(1).map((_, index) => {
  return {
    label: `${2018 + index}`,
    value: `${2018 + index}`
  };
});
const style = {
  fontSize: '1.5rem',
  marginBottom: '0.2rem',
  marginLeft: '0.2rem',
  color: 'var(--primary-color)'
};
const backStyle = {
  filter: 'drop-shadow(0 0 0.1rem #eee)',
  borderRadius: '0.25rem',
  boxShadow: ' 0 5px 8px 0 rgba(0, 0, 0, 0.2)',
  backgroundColor: 'white'
};
export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>('2022');

  const { currentStepIndex, goTo, step, titles } = useMultistepForm(
    [<Trainees key='123' />],
    ['Trainees', 'Line', 'Bar'],
    ['']
  );

  return (
    <div
      className='py-5'
      style={{
        backgroundColor: '#F8F9FA'
      }}
    >
      <div className='container p-5' style={backStyle}>
        <div className='d-flex justify-content-between'>
          <div className='container d-flex flex-row justify-content-center mb-4'>
            {titles?.map((title, index) => (
              <button
                key={title}
                className={`navButton ${
                  currentStepIndex === index ? 'activeNavButton' : ''
                }`}
                type='button'
                onClick={function go() {
                  goTo(index);
                }}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='container mb-4'>{step}</div>
    </div>
  );
}
