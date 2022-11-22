/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useCallback } from 'react';

import { type ChangePasswordProps } from './types';

import usePostQuery from '@/hooks/usePostQuery';
import Button from '@components/buttons/button/Button';
import Form from '@components/form/Form';
import Input from '@components/inputs/input/Input';

import '../login/login.scss';
const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

function ChangePassword() {
  const { isError, error } = usePostQuery();
  const navigate = useNavigate();
  const formik = useFormik<ChangePasswordProps>({
    enableReinitialize: true,
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, 'New Password is Too Short!')
        .max(50, 'New Password is Too Long!')
        .required('New Password is Required'),
      confirmPassword: Yup.string()
        .min(6, 'Confirm Password is Too Short!')
        .max(50, 'Confirm Password is Too Long!')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is Required')
    }),
    onSubmit: function submit(values, actions) {
      actions.resetForm();
      return Promise.resolve(values);
    }
  });

  const navigateToSignup = useCallback(() => {
    navigate('/auth/signup');
  }, [navigate]);

  const handleSubmit = useCallback( () => {
    try {
      /*    const { confirmPassword, newPassword } =
        (await formik.submitForm()) as ChangePasswordProps;
      const loginRoute = Object.assign({}, AuthRoutes.POST.login);
      loginRoute.payload = {
        email: {
          address: email
        }
      }; */

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }, []);

  return (
    <div className='changePassword d-flex flex-row justify-content-between'>
      <section className='container-fluid'>
        <div className='form__container'>
          <Link to='/'>
            <div className='form__container__logo'>
              <img alt='logo' src={COMPANY_LOGO} />
            </div>
          </Link>
          <Form
            ariaLabel={'Change Password Form'}
            disabled={false}
            encType={'application/x-www-form-urlencoded'}
            id='changePasswordForm'
            inputs={[
              <Input
                key='password-2'
                correctMessage={''}
                errorMessage={formik.errors.newPassword as string}
                hint={''}
                isError={
                  formik.touched.newPassword && formik.errors.newPassword
                    ? true
                    : null
                }
                isTop={false}
                label={'New Password'}
                name={'newPassword'}
                placeholder='New Password'
                size={0}
                type='password'
                value={formik.values.newPassword}
                onBlurFunc={formik.handleBlur}
                onChangeFunc={formik.handleChange}
              />,
              <Input
                key='password-2'
                correctMessage={''}
                errorMessage={formik.errors.confirmPassword as string}
                hint={''}
                isError={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? true
                    : null
                }
                isTop={false}
                label={'Confirm Password'}
                name={'confirmPassword'}
                placeholder='Confirm Password'
                size={0}
                type='password'
                value={formik.values.confirmPassword}
                onBlurFunc={formik.handleBlur}
                onChangeFunc={formik.handleChange}
              />
            ]}
            isError={false}
            isLoading={false}
            method={'post'}
            subtitle='Enter your new password'
            title='Change Password'
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
                label='Change Password'
                name='changePassword'
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

export default ChangePassword;
