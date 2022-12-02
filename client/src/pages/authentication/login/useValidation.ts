import { useFormik } from 'formik';
import * as Yup from 'yup';

import { type LoginProps } from './types';

function useValidation() {
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

  return {
    formik
  };
}

export default useValidation;
