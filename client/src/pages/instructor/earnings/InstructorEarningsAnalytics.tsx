import '../coursesData/nav-button.scss';

import { useState } from 'react';

import UseSearchQuery from './fetchApi';

import { AreaAnalytics } from './analytics/AreaAnalytics';
import LineAnalytics from './analytics/LineAnalytics';
import BarAnalytics from './analytics/BarAnalytics';

import useMultistepForm from '@/hooks/useMultistepForm';
import { UseCountry } from '@/store/countryStore';
import { UseUser } from '@/store/userStore';
import SingleSelect from '@/components/inputs/select/SingleSelect';

const emptyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

export default function InstructorCoursesAnalytics() {
  const user = UseUser();
  const instructorId = user?._id;
  const country = UseCountry();
  const [selectedOption, setSelectedOption] = useState<string>('2022');

  const { data: earningsData } = UseSearchQuery(
    instructorId as string,
    selectedOption,
    country
  );
  const { currentStepIndex, goTo, step, titles } = useMultistepForm(
    [
      <div key='area-analytics'>
        <AreaAnalytics
          data={earningsData ? earningsData?.data?.data : emptyData}
        />
      </div>,
      <div key='line-analytics'>
        <LineAnalytics
          data={earningsData ? earningsData?.data?.data : emptyData}
        />
      </div>,
      <div key='bar-analytics'>
        <BarAnalytics
          data={earningsData ? earningsData?.data?.data : emptyData}
        />
      </div>
    ],
    ['Area', 'Line', 'Bar'],
    ['']
  );
  return (
    <>
      <div className='container mx-auto mt-5' style={{ maxWidth: '15rem' }}>
        <SingleSelect
          isDisabled={false}
          isLoading={false}
          options={[
            {
              label: '2018',
              value: '2018'
            },
            {
              label: '2019',
              value: '2019'
            },
            {
              label: '2020',
              value: '2020'
            },
            {
              label: '2021',
              value: '2021'
            },
            {
              label: '2022',
              value: '2022'
            }
          ]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
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

      {step}
    </>
  );
}
