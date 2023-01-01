/* eslint-disable @typescript-eslint/no-use-before-define */

import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { BiUserPin } from 'react-icons/bi';

import { FaRegAddressCard } from 'react-icons/fa';

import { MdMarkEmailRead } from 'react-icons/md';

import AccountForm from './accountForm/AccountForm';
import { type SignupData, type UpdateSignupData } from './types';
import UserForm from './userForm/UserForm';

import ConfirmEmail from './ConfirmEmail';

import useMultistepForm from '@hooks/useMultistepForm';

import { Gender } from '@/enums/gender.enum';
import Form from '@components/form/Form';
import ProgressSteps from '@components/progress/progressStepper/ProgressStepper';
import './signup.scss';
import usePostQuery from '@/hooks/usePostQuery';
import { TraineeRoutes } from '@services/axios/dataServices/TraineeDataService';
import { toastOptions } from '@/components/toast/options';
import { HttpResponse } from '@/interfaces/response.interface';

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
  const { mutateAsync } = usePostQuery<HttpResponse<null>>();
  const navigate = useNavigate();
  function updateData(newData: UpdateSignupData) {
    setData(prev => {
      return { ...prev, ...newData };
    });

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    next();
  }

  const {
    currentStepIndex,
    steps,
    step,
    title,
    subtitle,
    subtitles,
    isLastStep,
    next,
    prev,
    goTo
  } = useMultistepForm(
    [
      // eslint-disable-next-line react/jsx-no-bind
      <UserForm key='sfodsfmapf88380' {...data} updateData={updateData} />,
      <AccountForm
        key='asdasdasqwmeiom3o'
        {...data}
        prev={previous}
        updateData={updateData}
      />,
      <ConfirmEmail
        key='asddmadmd3i029393284'
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
    try {
      const signup = Object.assign({}, TraineeRoutes.POST.signup);
      const address = data.email;
      const name = `${data.firstName} ${data.lastName}`;

      signup.payload = {
        ...data,
        email: {
          address
        },
        name
      };
      const response = await toast.promise(
        mutateAsync(signup),
        {
          pending: 'Signing up ...'
        },
        toastOptions
      );

      if (!response.status) {
        toast.error(response.data.message, toastOptions);

        return;
      } else {
        toast.success(`Welcome ${name}`, toastOptions);
      }

      navigate('/auth/login', {
        state: {
          email: data.email
        },
        replace: true
      });

      if (isLastStep) {
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      if (!error) return;
      if (
        error?.response &&
        error?.response.data &&
        error?.response?.data.message
      )
        toast.error(error.response.data.message, toastOptions);
      else toast.error(error?.message, toastOptions);
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
              <div className='mt-4'>
                <ProgressSteps
                  currentStepIndex={currentStepIndex}
                  goTo={goTo}
                  icons={[
                    <BiUserPin key='icon-12313' className='icon' />,
                    <FaRegAddressCard
                      key='icon-123dssd00013'
                      className='icon'
                    />,
                    <MdMarkEmailRead key='icon-12dssd313' className='icon' />
                  ]}
                  steps={titles}
                  subtitles={subtitles}
                />
              </div>
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
