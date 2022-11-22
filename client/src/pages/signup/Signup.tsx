/* eslint-disable @typescript-eslint/no-use-before-define */
import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react';

import AccountForm from './AccountForm';
import { type SignupData, type UpdateSignupData } from './types';
import UserForm from './UserForm';

import useMultistepForm from '@hooks/useMultistepForm';

import { Gender } from '@/enums/gender.enum';
import Form from '@components/form/Form';
import ProgressSteps from '@components/progress/ProgressSteps';
import './signup.scss';

const INITIAL_DATA: SignupData = {
  firstName: '',
  lastName: '',
  gender: Gender.MALE,
  birthDate: '',
  phone: '',
  country: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
  username: ''
};
const titles = ['User Form', 'Account Form'];

function Signup() {
  const [data, setData] = useState<SignupData>(INITIAL_DATA);

  function updateData(newData: UpdateSignupData) {
    setData(prev => {
      return { ...prev, ...newData };
    });
    console.log('newData');
    console.log(newData);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    handleSubmit();
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
      />
    ],
    titles,
    ['Give us your info', 'Create an account']
  );

  function previous() {
    prev();
  }

  function handleSubmit() {
    // Do something with the data
    console.log('data');
    console.log(data);
    if (isLastStep) {
      // submit form
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
            <ProgressSteps currentStepIndex={currentStepIndex} steps={titles} />
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
