import AreaAnalytics from './analytics/AreaAnalytics';

import LineAnalytics from './analytics/LineAnalytics';
import BarAnalytics from './analytics/BarAnalytics';

import useMultistepForm from '@/hooks/useMultistepForm';

import './nav-button.scss';

type AnalyticData = {
  title: string;
  Earnings: number;
  Trainees: number;
};

type CourseAnalyticsProps = {
  data: AnalyticData[];
};

export default function InstructorCoursesAnalytics(
  props: CourseAnalyticsProps
) {
  const { currentStepIndex, goTo, step, titles } = useMultistepForm(
    [
      <div key='area-analytics'>
        <AreaAnalytics data={props?.data} />
      </div>,
      <div key='line-analytics'>
        <LineAnalytics data={props?.data} />
      </div>,
      <div key='bar-analytics'>
        <BarAnalytics data={props?.data} />
      </div>
    ],
    ['Area', 'Line', 'Bar'],
    ['']
  );
  return (
    <>
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
