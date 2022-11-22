/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useCallback } from 'react';

import { type ForgotPasswordProps } from './types';

import { AuthRoutes } from '@services/axios/dataServices/AuthDataService';
import usePostQuery from '@/hooks/usePostQuery';
import Button from '@components/buttons/button/Button';
import Form from '@components/form/Form';
import Input from '@components/inputs/input/Input';

import './forgot.scss';

function ForgotPassword() {
  const {  isError, error } = usePostQuery();
  const navigate = useNavigate();
  const formik = useFormik<ForgotPasswordProps>({
    enableReinitialize: true,
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid Email address')
        .min(6, 'Email address is Too Short!')
        .max(50, 'Email address is Too Long!')
        .required('Email address is Required')
    }),
    onSubmit: function submit(values, actions) {
      actions.resetForm();
      return Promise.resolve(values);
    }
  });

  const navigateToSignup = useCallback(() => {
    navigate('/auth/signup');
  }, [navigate]);

  const handleSubmit = useCallback(async () => {
    try {
      const { email } = (await formik.submitForm()) as ForgotPasswordProps;
      const loginRoute = Object.assign({}, AuthRoutes.POST.login);
      loginRoute.payload = {
        email: {
          address: email
        }
      };

      return false;
    } catch (err) {
      console.log(err);
    }
  }, [formik]);

  return (
    <div className='login d-flex flex-row justify-content-between'>
      <section className='container-fluid'>
        <div className='form__container'>
          <Form
            ariaLabel={'Login Form'}
            disabled={false}
            encType={'application/x-www-form-urlencoded'}
            inputs={[
              <Input
                key='email-2'
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
            {isError && (
              <div className='alert alert-danger' role='alert'>
                {error?.response?.data?.message}
              </div>
            )}
            <div className='d-flex flex-column justify-content-between'>
              <Button
                backgroundColor='primary-bg'
                isDisabled={!formik.isValid || !formik.dirty}
                label='Forgot Password'
                name='login'
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
