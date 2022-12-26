import '../coursesData/nav-button.scss';

import { useState } from 'react';

import ReactSelect from 'react-select';

import UseSearchQuery from './fetchApi';

import { AreaAnalytics } from './analytics/AreaAnalytics';
import BarAnalytics from './analytics/BarAnalytics';
import LineAnalytics from './analytics/LineAnalytics';

import useMultistepForm from '@/hooks/useMultistepForm';

import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
import ErrorMessage from '@/components/error/message/ErrorMessage';

const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const date = new Date();
const year = date.getFullYear() - 2018 + 1;

const options = new Array(year).fill(1).map((_, index) => {
  return {
    label: `${2018 + index}`,
    value: `${2018 + index}`
  };
});

export default function InstructorCoursesAnalytics() {
  const [selectedOption, setSelectedOption] = useState<string>('2022');

  const {
    data: earningsData,
    isLoading,
    isError,
    error
  } = UseSearchQuery(selectedOption);

  const { currentStepIndex, goTo, step, titles } = useMultistepForm(
    [
      <div key='area-analytics-instructor-earnings'>
        <AreaAnalytics
          data={earningsData ? earningsData?.data?.data : emptyData}
        />
      </div>,
      <div key='line-analytics-instructor-earnings'>
        <LineAnalytics
          data={earningsData ? earningsData?.data?.data : emptyData}
        />
      </div>,
      <div key='bar-analytics-instructor-earnings'>
        <BarAnalytics
          data={earningsData ? earningsData?.data?.data : emptyData}
        />
      </div>
    ],
    ['Area', 'Line', 'Bar'],
    ['']
  );
  if (isLoading) return <LoaderComponent />;
  if (isError || error) return <ErrorMessage />;

  return (
    <div
      className='py-5'
      style={{
        backgroundColor: '#F8F9FA'
      }}
    >
      <div
        className='container p-5'
        style={{
          filter: 'drop-shadow(0 0 0.1rem #eee)',
          borderRadius: '0.25rem',
          boxShadow: ' 0 5px 8px 0 rgba(0, 0, 0, 0.2)',
          backgroundColor: 'white'
        }}
      >
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
          <div className='w-25'>
            <ReactSelect
              options={options}
              value={options.find(option => option.value === selectedOption)}
              onChange={function (option) {
                setSelectedOption(option?.value as string);
              }}
            />
          </div>
        </div>

        {step}
      </div>
    </div>
  );
}
