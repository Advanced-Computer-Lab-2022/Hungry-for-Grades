/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCallback } from 'react';

import useValidation from './useValidation';

import { Role } from '@/enums/role.enum';

import { UseSetUser } from '@/store/userStore';
import { UseCartStoreSetCart } from '@/store/cartStore';
import { UseWishListSetCart } from '@/store/wishListStore';

import { AuthRoutes } from '@services/axios/dataServices/AuthDataService';
import usePostQuery from '@/hooks/usePostQuery';
import Button from '@components/buttons/button/Button';
import Form from '@components/form/Form';
import Input from '@components/inputs/input/Input';

import './login.scss';
import CheckBoxInput from '@/components/inputs/checkbox/CheckBoxInput';
import { UpdateCountry } from '@/store/countryStore';
import SessionStorage from '@/services/sessionStorage/SessionStorage';
import LocalStorage from '@/services/localStorage/LocalStorage';
import { HttpResponse } from '@/interfaces/response.interface';
import { IUser } from '@/interfaces/user.interface';
import { ITrainee } from '@/interfaces/course.interface';
import ErrorMessage from '@/components/error/message/ErrorMessage';

import { toastOptions } from '@/components/toast/options';
const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

function Login() {
  const { data, mutateAsync: login } = usePostQuery<
    HttpResponse<{
      firstLogin: boolean;
      role: Role;
      token: {
        accessToken: string;
        refreshToken: string;
      };
      user: IUser;
    }>
  >();
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

  async function handleSubmit() {
    try {
      const { email, password } = formik.values;
      const loginRoute = Object.assign({}, AuthRoutes.POST.login);
      loginRoute.payload = {
        email: {
          address: email
        },
        password
      };
      const response = await login(loginRoute);

      console.log('response');
      console.log(response);

      if (response && response.status === 200) {
        const { token, user, role } = response?.data?.data;
        const userRole: Role = role.toLocaleLowerCase() as Role;
        useSetUser({ ...user, role: userRole });
        if (role === Role.TRAINEE) {
          useCartStoreSetCart((user as ITrainee)?._cart);
          useWishListSetCart((user as ITrainee)?._wishlist);
        }
        //session
        SessionStorage.set('accessToken', token.accessToken);
        updateCountry(user.country);
        if (formik.values.rememberMe) {
          LocalStorage.set('role', userRole);
        } else {
          LocalStorage.remove('role');
        }

        if (from) {
          navigate(from.toLocaleLowerCase());
        } else {
          navigate(`/${userRole}/dashboard`.toLocaleLowerCase(), {
            replace: true
          });
        }

        return true;
      }

      console.log(response?.data);
      toast.error(response?.data?.message, toastOptions);
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  console.log('error');

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
                id='input-sadasd'
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
                id='input-sadasssosd993d'
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
            onResetFunc={undefined}
          >
            <span className='d-flex flex-row justify-content-between'>
              <CheckBoxInput
                checked={formik.values.rememberMe}
                className={''}
                errorMessage={''}
                id='rememberMe-jnjnjn'
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

            {data && data?.response && (
              <ErrorMessage errorMessage={data?.response?.data?.message} />
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
