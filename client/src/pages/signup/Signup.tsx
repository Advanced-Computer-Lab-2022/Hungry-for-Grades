import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react';

import AccountForm from './AccountForm';
import AddressForm from './AddressForm';
import { type SignupData, type UpdateSignupData } from './types';
import UserForm from './UserForm';

import useMultistepForm from '@hooks/useMultistepForm';

import { Gender } from '@/enums/gender.enum';
import Button from '@components/buttons/button/Button';
import Form from '@components/form/Form';
import ProgressSteps from '@components/progress/ProgressSteps';
import './signup.scss';

const INITIAL_DATA: SignupData = {
  firstName: '',
  lastName: '',
  gender: Gender.MALE,
  age: 0,
  phone: '',
  country: '',
  email: {
    address: ''
  },
  password: ''
};

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
    isFirstStep,
    isLastStep,
    next,
    prev
  } = useMultistepForm(
    [
      // eslint-disable-next-line react/jsx-no-bind
      <UserForm key={uuidv4()} {...data} updateData={updateData} />,
      <AddressForm key={uuidv4()} {...data} />,
      <AccountForm key={uuidv4()} {...data} />
    ],
    ['User Form', 'Address Form', 'Account Form'],
    ['Give us your info', 'Where do you live?', 'Create an account']
  );

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
          <ProgressSteps
            currentStepIndex={currentStepIndex}
            steps={['User Form ', 'Address Form', 'A']}
          />
          <hr />
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
            {currentStepIndex + 1}/{steps.length}
            {!isFirstStep && (
              <Button
                backgroundColor={'default-bg'}
                isDisabled={isFirstStep}
                label={'Back'}
                name={'back'}
                type={'button'}
                onClickFunc={prev}
              />
            )}
            {
              <Button
                backgroundColor={'default-bg'}
                isDisabled={isLastStep}
                label={isLastStep ? 'Submit' : 'Next'}
                name={'next'}
                type={'button'}
                onClickFunc={next}
              />
            }
          </Form>
        </div>
      </section>
    </div>
  );
}

export default Signup;
