/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useCallback } from 'react';

import { LoginProps } from './types';

import { Role } from '@/enums/role.enum';

import { UseSetUser } from '@/store/userStore';

import { AuthRoutes } from '@services/axios/dataServices/AuthDataService';
import usePostQuery from '@/hooks/usePostQuery';
import Button from '@components/buttons/button/Button';
import Form from '@components/form/Form';
import Input from '@components/inputs/input/Input';
import { UseAuthStoreSetToken } from '@store/authStore';

import './login.scss';
import CheckBoxInput from '@/components/inputs/checkbox/CheckBoxInput';

function Login() {
  const { mutateAsync: login, isError, error } = usePostQuery();
  const useSetUser = UseSetUser();
  const useAuthStoreSetToken = UseAuthStoreSetToken();

  const navigate = useNavigate();
  const location = useLocation();
  const from: string = location?.state?.from?.pathname || '';
  const formik = useFormik<LoginProps>({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
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
    navigate('/auth/signup');
  }, [navigate]);

  const handleSubmit = useCallback(async () => {
    try {
      const { email, password } = (await formik.submitForm()) as LoginProps;
      const loginRoute = Object.assign({}, AuthRoutes.POST.login);
      loginRoute.payload = {
        email: {
          address: email
        },
        password
      };
      const response = await login(loginRoute);
      if (response && response.status === 200) {
        const { token, user } = response?.data?.data;
        useSetUser(user);
        useAuthStoreSetToken(token);

        console.log(user);
        console.log(token);
        if (from) {
          navigate(from.toLocaleLowerCase());
        } else {
          navigate(`/${user.role as Role}/home`.toLocaleLowerCase(), {
            replace: true
          });
        }

        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  }, [formik, login, useSetUser, useAuthStoreSetToken, navigate, from]);

  return (
    <div className='login d-flex flex-row justify-content-between'>
      <section className='container-fluid'>
        <div className='form__container'>
          <Form
            ariaLabel={'Login Form'}
            disabled={false}
            encType={'application/x-www-form-urlencoded'}
            id={'loginForm'}
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
            <span className='d-flex flex-row justify-content-between'>
              <CheckBoxInput
                checked={formik.values.rememberMe}
                className={''}
                errorMessage={''}
                isChecked={formik.values.rememberMe}
                label='Remember Me'
                name='rememberMe'
                required={false}
                value={formik.values.rememberMe}
                onChange={async function handleChange(e) {
                  await formik.setFieldValue('rememberMe', e.target.checked);
                }}
              />
              <Link className='forgot-password' to='/auth/forgot-password'>
                Forgot Password?
              </Link>
            </span>
            {isError && error?.response?.data?.message && (
              <div className='alert alert-danger' role='alert'>
                {error?.response?.data?.message}
              </div>
            )}
            {isError && !error?.response?.data?.message && (
              <div className='alert alert-danger' role='alert'>
								Please report this Problem through this
								<Link
									className='alert-link'
									to='/report'
								>
									Link
								</Link>

              </div>
            )}
            <div className='d-flex flex-column justify-content-between'>
              <Button
                backgroundColor='primary-bg'
                isDisabled={!formik.isValid || !formik.dirty}
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
        </div>
      </section>
      <div className='w-75 img__container'>
        <img alt='login-red-page' src={'/login.jpg'} />
        <div />
      </div>
    </div>
  );
}

export default Login;
