import { v4 as uuidv4 } from 'uuid';

import { useState } from 'react';

import AccountForm from './AccountForm';
import AddressForm from './AddressForm';
import { type SignupData, type UpdateSignupData } from './types';
import UserForm from './UserForm';

import useMultistepForm from '@hooks/useMultistepForm';

import Button from '@components/buttons/button/Button';
import Form from '@components/form/Form';

const INITIAL_DATA: SignupData = {
  firstName: '',
  lastName: '',
  gender: 'Male',
  age: 0,
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  email: '',
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

  const props = { ...data };
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
      <UserForm key={uuidv4()} {...props} updateData={updateData} />,
      <AddressForm key={uuidv4()} {...props} />,
      <AccountForm key={uuidv4()} {...props} />
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
    <section className='container'>
      <h1>Signup</h1>
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
    </section>
  );
}

export default Signup;
