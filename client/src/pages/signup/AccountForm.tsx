import { useFormik } from 'formik';
import * as Yup from 'yup';

import Input from '@components/inputs/input/Input';

function AccountForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
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
        .required('Email address is Required')
    }),
    onSubmit: (values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.resetForm();
    }
  });

  return (
    <div>
      <Input
        key='email-1'
        isTop
        correctMessage={''}
        errorMessage={formik.errors.email}
        hint={''}
        isError={formik.touched.email && formik.errors.email ? true : null}
        label={'Email'}
        name={'email'}
        placeholder='Email'
        size={0}
        type='email'
        value={formik.values.email}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <Input
        key={'password-1'}
        correctMessage={''}
        errorMessage={formik.errors.password}
        hint={''}
        isError={
          formik.touched.password && formik.errors.password ? true : null
        }
        isTop={false}
        label={''}
        name={'password'}
        placeholder='Password'
        size={0}
        type='password'
        value={formik.values.password}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
    </div>
  );
}

export default AccountForm;
