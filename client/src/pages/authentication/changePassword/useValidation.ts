import { useFormik } from 'formik';
import * as Yup from 'yup';

import { type ChangePasswordProps } from './types';

function useValidation() {
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
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is Required')
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
