import { useMemo } from 'react';

import useSearchQuery from './fetchApi';
import { updateProfile } from './updateApi';

import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';

export default function Profile() {
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    username: ''
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid Email address')
        .min(6, 'Email address is Too Short!')
        .max(50, 'Email address is Too Long!')
        .required('Email address is Required'),
      name: Yup.string()
        .min(1, 'Name is Too Short!')
        .max(50, 'Name is Too Long!')
        .required('Name is Required'),
      phone: Yup.string().required('Phone number is Required'),
      username: Yup.string()
        .min(1, 'Username is Too Short!')
        .max(50, 'Username is Too Long!')
        .matches(/^[a-zA-Z]+$/, 'Username must be only letters')
        .required('Username is Required')
    }),
    onSubmit: (values, actions) => {
      actions.resetForm();
      actions.setSubmitting(true);
    }
  });
  const scrollToErrors = (errors: any) => {
    const errorKeys = Object.keys(errors);

    if (errorKeys && errorKeys.length > 0) {
      console.log('errorKeys');
      document?.getElementsByName?.(`${errorKeys[0] || ''}`)[0]?.focus();
      return false;
    }
    return true;
  };
  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    await formik.setTouched({
      name: true,
      email: true,
      phone: true,
      username: true
    });
    formik.handleSubmit();
    if (!scrollToErrors(formik.errors)) {
      console.log('formik.values');
      console.log(formik.errors);
      event.stopPropagation();
      return;
    }
    updateData(formik.values);
  }
  const traineeId = '637969352c3f71696ca34759';
  const { isLoading, isError, error, data } = useSearchQuery();
  const verifiedData = data?.data?.data;
  console.log(verifiedData);
  const submitAction = useMemo(
    () => async (course: any) => {
      await updateProfile(course, traineeId);
    },
    [traineeId]
  );
  if (isError)
    return (
      <h1 className='text-danger text-center'>
        An error has occurred while loading course information.
      </h1>
    );
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='container'>
      <div>
        <img
          alt='Letter C'
          className='rounded-circle border border-2'
          src='/C_logo.jpg'
          style={{ width: '40px', height: '40px' }}
        />
      </div>
    </div>
  );
}
