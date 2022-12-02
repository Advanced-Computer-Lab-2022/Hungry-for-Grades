import { useFormik } from 'formik';
import * as Yup from 'yup';

import { AccountFormProps } from '../types';

function useValidation({ email, password, terms, username }: AccountFormProps) {
  const formik = useFormik<AccountFormProps & { confirmPassword: string }>({
    initialValues: {
      email: email,
      password: password,
      confirmPassword: password,
      terms: terms,
      username: username
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid Email address')
        .min(6, 'Email address is Too Short!')
        .max(50, 'Email address is Too Long!')
        .required('Email address is Required'),
      password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Password is Required'),
      confirmPassword: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Confirm Password is Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      terms: Yup.boolean().oneOf([true], 'Terms must be accepted'),
      username: Yup.string()
        .min(1, 'Username is Too Short!')
        .max(50, 'Username is Too Long!')
        .matches(/^[a-zA-Z]+$/, 'Username must be only letters')
        .required('Username is Required')
    }),
    onSubmit: (_, actions) => {
      actions.resetForm();
      actions.setSubmitting(true);
    }
  });
  return {
    formik
  };
}

export default useValidation;
