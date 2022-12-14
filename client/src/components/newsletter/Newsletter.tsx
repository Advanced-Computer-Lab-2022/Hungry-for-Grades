import { useCallback } from 'react';

import useValidation from './UseValidation';

import usePostQuery from '@/hooks/usePostQuery';
import { NewsLetterRoutes } from '@services/axios/dataServices/NewsLetterDataService';

import './newsletter.scss';
function Newsletter() {
  const { formik } = useValidation();
  const { mutateAsync: signupToNewsletter } = usePostQuery();

  const handleSubmit = useCallback(async () => {
    try {
      const { email } = (await formik.submitForm()) as { email: string };
      const subscribeRoute = Object.assign({}, NewsLetterRoutes.POST.subscribe);
      subscribeRoute.payload = {
        email,
        role: 'guest'
      };
      await signupToNewsletter(subscribeRoute);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }, [formik, signupToNewsletter]);

  return (
    <div className='container subscribe' >
      <h2 className='subscribe__title'>Subscribe to our NewsLetter </h2>
      <div className='container form d-flex flex-row justify-content-center'>
        <input
          className='form__email mx-2'
          id='newsletter'
					name='email'
          placeholder='Enter your email address'
          type='email'
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <button
          className='form__button '
          disabled={!formik.isValid || !formik.dirty}
          type='button'
          onClick={handleSubmit}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
