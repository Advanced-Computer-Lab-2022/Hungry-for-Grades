import { useFormik } from 'formik';
import * as Yup from 'yup';

function useValidation() {
  const formik = useFormik<{ email: string }>({
    enableReinitialize: true,
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid Email address')
        .min(6, 'Email address is Too Short!')
        .max(50, 'Email address is Too Long!')
        .required('Email address is Required')
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
