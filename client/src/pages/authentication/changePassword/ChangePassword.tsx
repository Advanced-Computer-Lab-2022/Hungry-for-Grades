/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Link,
  useNavigate,
  useSearchParams,
  useParams
} from 'react-router-dom';

import { useCallback } from 'react';

import useValidation from './useValidation';

import { type ChangePasswordProps } from './types';

import usePostQuery from '@/hooks/usePostQuery';
import Button from '@components/buttons/button/Button';
import Form from '@components/form/Form';
import Input from '@components/inputs/input/Input';
import { AuthRoutes } from '@services/axios/dataServices/AuthDataService';

import '../login/login.scss';
const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

function ChangePassword() {
  const [searchParams] = useSearchParams();
  const { userId } = useParams();

  const { isError, error } = usePostQuery();
  const navigate = useNavigate();
  const { formik } = useValidation();

  const navigateToSignup = useCallback(() => {
    navigate('/auth/signup');
  }, [navigate]);

  const handleSubmit = useCallback(async () => {
    try {
      const { newPassword } =
        (await formik.submitForm()) as ChangePasswordProps;
      const changePasswordRoute = Object.assign(
        {},
        AuthRoutes.POST.changePassword
      );

      changePasswordRoute.payload = {
        role: searchParams.get('role') as string,
        _id: userId as string,
        newPassword
      };

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }, [formik, searchParams, userId]);

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
            className='middle'
            disabled={false}
            encType={'application/x-www-form-urlencoded'}
            id='changePasswordForm'
            inputs={[
              <Input
                key={`password-132143243242`}
                correctMessage={''}
                errorMessage={formik?.errors?.newPassword as string}
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
                key={`password-2231321321`}
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
            {isError && (error?.response?.data?.message as string) && (
              <div className='alert alert-danger' role='alert'>
                {error?.response?.data?.message as string}
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
