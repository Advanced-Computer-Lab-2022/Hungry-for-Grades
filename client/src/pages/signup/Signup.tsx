/* eslint-disable @typescript-eslint/no-use-before-define */
import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react';

import { Link } from 'react-router-dom';

import AccountForm from './AccountForm';
import { type SignupData, type UpdateSignupData } from './types';
import UserForm from './UserForm';

import ConfirmEmail from './ConfirmEmail';

import useMultistepForm from '@hooks/useMultistepForm';

import { Gender } from '@/enums/gender.enum';
import Form from '@components/form/Form';
import ProgressSteps from '@components/progress/ProgressSteps';
import './signup.scss';
import usePostQuery from '@/hooks/usePostQuery';
import { TraineeRoutes } from '@services/axios/dataServices/TraineeDataService';

const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

const INITIAL_DATA: SignupData = {
  firstName: '',
  lastName: '',
  gender: Gender.MALE,
  birthDate: '',
  phone: '',
  country: '',
  email: '',
  password: '',
  terms: false,
  username: ''
};
const titles = ['User Form', 'Account Form', 'Confirm Email'];

function Signup() {
  const [data, setData] = useState<SignupData>(INITIAL_DATA);
  const { mutateAsync } = usePostQuery();

  function updateData(newData: UpdateSignupData) {
    setData(prev => {
      return { ...prev, ...newData };
    });
    console.log('newData');
    console.log(newData);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    next();
  }

  const {
    currentStepIndex,
    steps,
    step,
    title,
    subtitle,
    isLastStep,
    next,
    prev
  } = useMultistepForm(
    [
      // eslint-disable-next-line react/jsx-no-bind
      <UserForm key={uuidv4()} {...data} updateData={updateData} />,
      <AccountForm
        key={uuidv4()}
        {...data}
        prev={previous}
        updateData={updateData}
      />,
      <ConfirmEmail
        key={uuidv4()}
        email={data.email}
        firstName={data.firstName}
        handleSubmit={handleSubmit}
        lastName={data.lastName}
        prev={previous}
      />
    ],
    titles,
    ['Give us your info', 'Create an account', 'Verify Your Email']
  );

  function previous() {
    prev();
  }

  async function handleSubmit() {
    const signup = Object.assign({}, TraineeRoutes.POST.signup);
    signup.payload = {
      ...data,
      email: {
        address: data.email
      }
    };
  await mutateAsync(signup);

    console.log('data');
    console.log(data);
    if (isLastStep) {
    } else {
      next();
    }
  }

  return (
    <div className={`signup d-flex flex-row justify-content-between`}>
      <div className={`d-sm img__container`}>
        <img alt='signup-red-page' src={'/login.jpg'} />
      </div>
      <section className={`container `}>
        <div className={`form__container `}>
          <div className='container'>
            <div className='d-flex flex-column flex-lg-row justify-content-between m-0 p-0'>
              <Link className='p-0 m-0' to='/'>
                <img
                  alt='logo'
                  loading='lazy'
                  src={COMPANY_LOGO}
                  style={{
                    width: '14rem',
                    height: '15vh',
                    objectFit: 'contain'
                  }}
                />
              </Link>

              <ProgressSteps
                currentStepIndex={currentStepIndex}
                steps={titles}
              />
            </div>
            <hr />
            <div className='text-muted'>
              Step {currentStepIndex + 1}/{steps.length}
            </div>
          </div>
          <Form
            ariaLabel={''}
            disabled={false}
            encType={'application/x-www-form-urlencoded'}
            inputs={undefined}
            isError={false}
            isLoading={false}
            method={'post'}
            subtitle={subtitle}
            title={title}
          >
            {step}
          </Form>
        </div>
      </section>
    </div>
  );
}

export default Signup;
