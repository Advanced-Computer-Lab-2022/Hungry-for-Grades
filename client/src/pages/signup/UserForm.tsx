import { FormikErrors, useFormik } from 'formik';

import * as Yup from 'yup';

import { type UpdateSignupData, type UserFormProps } from './types';

import Button from '@components/buttons/button/Button';
import Input from '@components/inputs/input/Input';

const scrollToErrors = (
  errors: FormikErrors<{
    firstName: string;
    lastName: string;
    age: string | number;
    phone: string;
    gender: 'Male' | 'Female';
  }>
) => {
  const errorKeys = Object.keys(errors);
  if (errorKeys && errorKeys.length > 0) {
    document?.getElementsByName?.(`${errorKeys[0] || ''}`)[0]?.focus();
    return false;
  }
  return true;
};

function UserForm({
  firstName,
  lastName,
  age,
  phone,
  gender,
  updateData
}: UserFormProps & { updateData: (data: UpdateSignupData) => void }) {
  const formik = useFormik({
    initialValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      age: age || 18,
      phone: phone || '',
      gender: gender || ''
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(6, 'First Name is Too Short!')
        .max(50, 'First Name is Too Long!')
        .matches(/^[a-zA-Z]+$/, 'First Name must be only letters')
        .required('First Name is Required'),
      lastName: Yup.string()
        .min(1, 'Last Name Too Short!')
        .matches(/^[a-zA-Z]+$/, 'First Name must be only letters')
        .max(50, 'Last Name Too Long!')
        .required('Last Name is Required'),
      age: Yup.number()
        .min(18, 'Age is Too Young!')
        .max(100, 'Age is Too Long!')
        .required('Age is Required')

      /*     phone: Yup.string()
        .min(10, 'Phone is Too Short!')
        .max(10, 'Phone is Too Long!')
        .required('Phone is Required') */
    }),
    onSubmit: (values, actions) => {
      //  alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(true);
    }
  });

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    await formik.setTouched({
      firstName: true,
      lastName: true,
      age: true,
      phone: true
    });
    formik.handleSubmit();
    if (scrollToErrors(formik.errors) || formik.values.lastName === '') {
      alert(' errors');
      event.stopPropagation();
      return;
    }
    updateData(formik.values);
  }
  return (
    <div className='row'>
      <div className='col-12 col-md-6  my-4'>
        <Input
          key={'firstName-1'}
          correctMessage={''}
          errorMessage={formik.errors.firstName}
          hint={''}
          isError={
            formik.touched.firstName && formik.errors.firstName ? true : null
          }
          isTop={false}
          label={'First Name'}
          name={'firstName'}
          placeholder='First Name'
          size={0}
          type='text'
          value={formik.values.firstName}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='col-12 col-md-6  my-4'>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.lastName}
          hint={''}
          isError={
            formik.touched.lastName && formik.errors.lastName ? true : null
          }
          isTop={false}
          label={'Last Name'}
          name={'lastName'}
          placeholder='Last Name'
          size={0}
          type='text'
          value={formik.values.lastName}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='col-12 col-md-6  my-4'>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.age}
          hint={''}
          isError={formik.touched.age && formik.errors.age ? true : null}
          isTop={false}
          label={'Age'}
          name={'age'}
          placeholder='Age'
          size={0}
          type='number'
          value={formik.values.age}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='d-flex flex-row justify-content-end my-4'>
        <Button
          isDisabled={false}
          isLoading={false}
          isSuccess={false}
          label={'Next'}
          name={'next'}
          type='button'
          // eslint-disable-next-line @typescript-eslint/no-shadow, react/jsx-no-bind
          onClickFunc={handleSubmit}
        />
      </div>
    </div>
  );
}

export default UserForm;
