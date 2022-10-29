import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useCallback } from 'react';

import { LoginProps } from './types';

import { UserRoutes } from '@services/axios/dataServices/UserDataService';

import usePostQuery from '@/hooks/usePostQuery';
import Button from '@components/buttons/button/Button';
import Form from '@components/form/Form';
import Input from '@components/inputs/input/Input';
import './login.scss';

function Login() {
  const { mutateAsync: login, isError, data } = usePostQuery();
  const navigate = useNavigate();
  const formik = useFormik<LoginProps>({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid Email address')
        .min(6, 'Email address is Too Short!')
        .max(50, 'Email address is Too Long!')
        .required('Email address is Required'),
      password: Yup.string()
        .min(6, 'Password Too Short!')
        .max(50, 'Password Too Long!')
        .required('Password is Required')
    }),
    onSubmit: function submit(values, actions) {
      actions.resetForm();
      return Promise.resolve(values);
    }
  });

  const navigateToSignup = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const handleSubmit = useCallback(async () => {
    const { email, password } = (await formik.submitForm()) as LoginProps;
    const loginRoute = UserRoutes.POST.login;
    loginRoute.payload = {
      email: {
        address: email
      },
      password
    };
    const response = await login(loginRoute);
    if (response) {
      navigate('/aadmin');
      return true;
    }
    return false;
  }, [navigate, formik, login]);

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
                key='email-1'
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
              />,
              <Input
                key={'password-1'}
                correctMessage={''}
                errorMessage={formik.errors.password as string}
                hint={''}
                isError={
                  formik.touched.password && formik.errors.password
                    ? true
                    : null
                }
                isTop={false}
                label={'Password'}
                name={'password'}
                placeholder='Password'
                size={0}
                type='password'
                value={formik.values.password}
                onBlurFunc={formik.handleBlur}
                onChangeFunc={formik.handleChange}
              />
            ]}
            isError={false}
            isLoading={false}
            method={'post'}
            subtitle='Login to your account'
            title='Login'
            onResetFunc={formik.handleReset}
          >
            <div className='d-flex flex-column justify-content-between'>
              <Button
                backgroundColor='primary-bg'
                isDisabled={formik.isValid}
                label='Login'
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
          {isError && <div>{data}</div>}
        </div>
      </section>
      <div className='w-75 img__container'>
        <img alt='t' src={'/login.jpg'} />
        <div />
      </div>
    </div>
  );
}

export default Login;
