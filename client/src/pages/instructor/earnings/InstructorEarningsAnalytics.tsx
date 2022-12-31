import '../coursesData/nav-button.scss';

import { useState } from 'react';

import ReactSelect from 'react-select';

import { BsBookFill } from 'react-icons/bs';

import { FaRegMoneyBillAlt } from 'react-icons/fa';

import { AiFillStar } from 'react-icons/ai';

import UseSearchQuery from './fetchApi';

import { AreaAnalytics } from './analytics/AreaAnalytics';
import BarAnalytics from './analytics/BarAnalytics';
import LineAnalytics from './analytics/LineAnalytics';

import useMultistepForm from '@/hooks/useMultistepForm';

import ErrorMessage from '@/components/error/message/ErrorMessage';
import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
import { UseUser  } from '@/store/userStore';
import { IInstructor } from '@/interfaces/instructor.interface';
import { UseCountry  } from '@/store/countryStore';

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
export default function InstructorCoursesAnalytics() {
  const [selectedOption, setSelectedOption] = useState<string>('2022');
	const useUser = UseUser();
  const instructorId = useUser?._id as string;
  const country = UseCountry();

  const {
    data: earningsData,
    isLoading,
    isError,
    error
  } = UseSearchQuery(selectedOption,instructorId,country);

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



	const teachedCoursesCount=(useUser as IInstructor)?._teachedCourses?.length;
	const averageRating=(useUser as IInstructor)?.rating?.averageRating;
	const balance=(useUser as IInstructor)?.balance;
	const currency=(useUser as IInstructor)?.currency ?? 'USD';
  return (
    <div
      className='py-5'
      style={{
        backgroundColor: '#F8F9FA'
      }}
    >
      <div className='container mb-4'>
        <div className='row'>
          <div className='col-md-4 mb-4'>
            <div className='card' style={backStyle}>
              <div className='card-body'>
                <h4 className='card-title'>
                  Total Balance <FaRegMoneyBillAlt style={style} />
                </h4>
                <h5 className='card-text text-start'>{currency} &nbsp;{balance}</h5>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-4'>
            <div className='card ' style={backStyle}>
              <div className='card-body'>
                <h4 className='card-title'>
                  Total Courses <BsBookFill style={style} />
                </h4>
                <h5 className='card-text'>{teachedCoursesCount} Courses</h5>
              </div>
            </div>
          </div>
          <div className='col-md-4 mb-4'>
            <div className='card' style={backStyle}>
              <div className='card-body'>
                <h4 className='card-title'>
                  Average Rating <AiFillStar style={style} />
                </h4>
                <h5 className='card-text'>{averageRating} Rating</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

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
