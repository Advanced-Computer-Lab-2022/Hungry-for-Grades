import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useCallback } from 'react';

import { LoginProps } from './types';

import useLogin from './useLogin';

import Form from '@components/form/Form';
import Input from '@components/inputs/input/Input';

import Button from '@components/buttons/button/Button';

function Login() {
  const { mutateAsync: login, isError, data } = useLogin();
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
    const values = (await formik.submitForm()) as LoginProps;
    alert(values.password);
    await login(values);
    alert('after');
    navigate('/tasks');
    return true;
  }, [navigate, formik, login]);

  return (
    <section className='login container'>
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
            isError={formik.touched.email && formik.errors.email ? true : null}
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
              formik.touched.password && formik.errors.password ? true : null
            }
            isTop={false}
            label={''}
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
        <Button
          backgroundColor={'default-bg'}
          isDisabled={formik.isValid}
          label='Login'
          name='login'
          type='button'
          onClickFunc={handleSubmit}
        />
        <Button
          backgroundColor={'default-bg'}
          isDisabled={false}
          label='Register'
          name='register'
          type='button'
          onClickFunc={navigateToSignup}
        />
      </Form>

      {isError && <div>{data}</div>}
    </section>
  );
}

export default Login;
