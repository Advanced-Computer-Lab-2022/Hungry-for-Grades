import { HiStatusOffline, HiStatusOnline } from 'react-icons/hi';

import { GiTeacher } from 'react-icons/gi';

import styles from '../card.module.scss';

import UseDataQuery from './UseDataQuery';

import UseDataAnalyticsQuery from './UseDataAnalyticsQuery';

import AreaAnalytics from './analytics/AreaAnalytics';
import LineAnalytics from './analytics/LineAnalytics';
import BarAnalytics from './analytics/BarAnalytics';

import useMultistepForm from '@/hooks/useMultistepForm';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
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
function Trainees() {
  const { data, isLoading, isError } = UseDataQuery();
  const {
    data: analytics,
    isLoading: isLoadingAnalytics,
    isError: isErrorAnalytics
  } = UseDataAnalyticsQuery();

	console.log(analytics);
	

  const { currentStepIndex, goTo, step, titles } = useMultistepForm(
    [
      <div key='area-analytics-instructor-earnings'>
        <AreaAnalytics
          data={
            analytics
              ? analytics?.data?.data?.map(instructor => {
                  return {
                    Earnings: instructor.balance ,
										title:instructor.name,
										'Average Rating':instructor.rating.averageRating
                  };
                })
              : []
          }
        />
      </div>,
      <div key='line-analytics-instructor-earnings'>
        <LineAnalytics
         data={
					analytics
						? analytics?.data?.data?.map(instructor => {
								return {
									Earnings: instructor.balance ,
									title:instructor.name,
									'Average Rating':instructor.rating.averageRating
								};
							})
						: []
				}
        />
      </div>,
      <div key='bar-analytics-instructor-earnings'>
        <BarAnalytics
       data={
				analytics
					? analytics?.data?.data?.map(instructor => {
							return {
								Earnings: instructor.balance ,
								title:instructor.name,
								'Average Rating':instructor.rating.averageRating
							};
						})
					: []
			}
        />
      </div>
    ],
    ['Area', 'Line', 'Bar'],
    ['']
  );
  if (isLoading || isLoadingAnalytics) {
    return <LoaderComponent />;
  }
  if (isError || isErrorAnalytics) {
    return <ErrorMessage />;
  }

  const { active, inactive } = data?.data.data;
  return (
    <>
      {' '}
      <div className='row'>
        <div className='col-md-4 mb-4'>
          <div className={`${styles.card ?? ''} card`} style={backStyle}>
            <div className='card-body'>
              <h4 className='card-title'>
                Active Instructors <HiStatusOnline style={style} />
              </h4>
              <h5 className='card-text'>{active}</h5>
            </div>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className={`${styles.card ?? ''} card`} style={backStyle}>
            <div className='card-body'>
              <h4 className='card-title'>
                In Active Instructors <HiStatusOffline style={style} />
              </h4>
              <h5 className='card-text'>{inactive}</h5>
            </div>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className={`${styles.card ?? ''} card`} style={backStyle}>
            <div className='card-body'>
              <h4 className='card-title'>
                Total Instructors <GiTeacher style={style} />
              </h4>
              <h5 className='card-text'>{active + inactive}</h5>
            </div>
          </div>
        </div>
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
				<div className={`${styles.card ?? ''} container p-5`} style={backStyle}>
				<h3 className='text-dark text-left m-2 mb-4'>Top Instructors</h3>
				<div>{step}</div>
				</div>
      </div>
    </>
  );
}

export default Trainees;
