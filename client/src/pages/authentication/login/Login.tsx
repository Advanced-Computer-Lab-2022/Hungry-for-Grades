/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useCallback } from 'react';

import { LoginProps } from './types';

import useValidation from './useValidation';

import { Role } from '@/enums/role.enum';

import { UseSetUser } from '@/store/userStore';

import { AuthRoutes } from '@services/axios/dataServices/AuthDataService';
import usePostQuery from '@/hooks/usePostQuery';
import Button from '@components/buttons/button/Button';
import Form from '@components/form/Form';
import Input from '@components/inputs/input/Input';

import { UseCartStoreSetCart } from '@store/cartStore';
import { UseWishListSetCart } from '@store/wishListStore';

import './login.scss';
import CheckBoxInput from '@/components/inputs/checkbox/CheckBoxInput';
import { UpdateCountry } from '@/store/countryStore';
import SessionStorage from '@/services/sessionStorage/SessionStorage';
import LocalStorage from '@/services/localStorage/LocalStorage';
const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

function Login() {
  const { mutateAsync: login, isError, error } = usePostQuery();
  const updateCountry = UpdateCountry();

  const useSetUser = UseSetUser();

  const useCartStoreSetCart = UseCartStoreSetCart();
  const useWishListSetCart = UseWishListSetCart();

  const navigate = useNavigate();
  const location = useLocation();
  const from: string = location?.state?.from?.pathname || '';
  const { formik } = useValidation();
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
        const { token, user, role } = response?.data?.data;
        const userRole: Role = role.toLocaleLowerCase();
        useSetUser({ ...user, role: userRole });
        useCartStoreSetCart(user?._cart);
        useWishListSetCart(user?._wishList);
        //session
        SessionStorage.set('accessToken', token.accessToken);
        console.log('token.accessToken');
        console.log(token.accessToken);
        updateCountry(user.country);
        if (formik.values.rememberMe) {
          LocalStorage.set('refreshToken', token.refreshToken);
        } else {
          LocalStorage.remove('refreshToken');
        }

        console.log(user);
        console.log(token);

        if (from) {
          navigate(from.toLocaleLowerCase());
        } else {
          navigate(`/${userRole}/dashboard`.toLocaleLowerCase(), {
            replace: true
          });
        }

        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }, [
    formik,
    login,
    useSetUser,
    useCartStoreSetCart,
    useWishListSetCart,
    updateCountry,
    from,
    navigate
  ]);

  return (
    <div className='login d-flex flex-row justify-content-between'>
      <section className='container-fluid'>
        <div className='form__container'>
          <Link to='/'>
            <div className='form__container__logo'>
              <img alt='logo' src={COMPANY_LOGO} />
            </div>
          </Link>
          <Form
            ariaLabel={'Login Form'}
            className={'middle'}
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
                id='rememberMe'
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
                <Link className='alert-link' to='/report'>
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
                <Link to='/auth/signup' onClick={navigateToSignup}>
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
