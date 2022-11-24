/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useNavigate } from 'react-router-dom';

import { useCallback } from 'react';

import { type ForgotPasswordProps } from './types';

import useValidation from './useValidation';

import { AuthRoutes } from '@services/axios/dataServices/AuthDataService';
import usePostQuery from '@/hooks/usePostQuery';
import Button from '@components/buttons/button/Button';
import Form from '@components/form/Form';
import Input from '@components/inputs/input/Input';

import '../login/login.scss';

const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

function ForgotPassword() {
  const { isError, error, mutateAsync } = usePostQuery();
  const { formik } = useValidation();
  const navigate = useNavigate();

  const navigateToSignup = useCallback(() => {
    navigate('/auth/signup');
  }, [navigate]);

  const handleSubmit = useCallback(async () => {
    try {
      const { email } = (await formik.submitForm()) as ForgotPasswordProps;
      const forgetPasswordRoute = Object.assign(
        {},
        AuthRoutes.POST.forgetPassword
      );
      forgetPasswordRoute.payload = {
        email
      };
      await mutateAsync(forgetPasswordRoute);
      console.log('success');
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }, [formik, mutateAsync]);

  return (
    <div className='forgotPassword d-flex flex-row justify-content-between'>
      <section className='container-fluid'>
        <div className='form__container'>
          <Link to='/'>
            <div className='form__container__logo'>
              <img alt='logo' src={COMPANY_LOGO} />
            </div>
          </Link>
          <Form
            ariaLabel={'Forgot Password Form'}
            className='middle'
            disabled={false}
            encType={'application/x-www-form-urlencoded'}
            id='forgotPasswordForm'
            inputs={[
              <Input
                key='password-2'
                correctMessage={''}
                errorMessage={formik.errors.email as string}
                hint={''}
                isError={
                  formik.touched.email && formik.errors.email ? true : null
                }
                isTop={false}
                label={'Email'}
                name={'email'}
                placeholder='Email'
                size={0}
                type='email'
                value={formik.values.email}
                onBlurFunc={formik.handleBlur}
                onChangeFunc={formik.handleChange}
              />
            ]}
            isError={false}
            isLoading={false}
            method={'post'}
            subtitle='Enter your email address to reset your password'
            title='Forgot Password'
            onResetFunc={formik.handleReset}
          >
            {isError && error?.response?.data?.message && (
              <div className='alert alert-danger' role='alert'>
                {error?.response?.data?.message}
              </div>
            )}
            {isError && !error?.response?.data?.message && (
              <div className='alert alert-danger' role='alert'>
                Please report this Problem through this
                <Link className='alert-link' to='/report'>
                  Link
                </Link>
              </div>
            )}
            <div className='d-flex flex-column justify-content-between'>
              <Button
                backgroundColor='primary-bg'
                isDisabled={!formik.isValid || !formik.dirty}
                label='Forgot Password'
                name='forgotPassword'
                type='button'
                onClickFunc={handleSubmit}
              />
              <span className='d-flex flex-row justify-content-end'>
                Don&apos;t have an account? &nbsp;
                <Link to='/signup' onClick={navigateToSignup}>
                  Sign Up
                </Link>
              </span>
            </div>
            <div />
          </Form>
        </div>
      </section>
      <div className='w-75 img__container'>
        <img alt='login-red-page' src={'/login.jpg'} />
        <div />
      </div>
    </div>
  );
}

export default ForgotPassword;
