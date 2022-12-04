import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';

import { InstructorData } from './types';

import Button from '@components/buttons/button/Button';
import Input from '@components/inputs/input/Input';

import { updatePassword } from './updateApi';
import { useCallback } from 'react';
import usePostQuery from '@/hooks/usePostQuery';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

const id = '6379620f2c3f71696ca34735';

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .min(6, 'Password is Too Short!')
    .max(50, 'Password is Too Long!')
    .required('Current password is Required'),
  newPassword: Yup.string()
    .min(6, 'Password is Too Short!')
    .max(50, 'Password is Too Long!')
    .required('New password is Required'),
  confirmPassword: Yup.string()
    .required('Confirm password is Required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

const initialValues: InstructorData = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

export default function ChangePassword() {
  const { mutateAsync: changePassword, isError, error } = usePostQuery();

  const submitAction = useCallback(
    async (data: any) => {
      try {
        const updateRoute = Object.assign(
          {},
          InstructorRoutes.POST.changePassword
        );
        updateRoute.payload = data;
        const response = await changePassword(updateRoute);
      } catch (err) {
        console.log(err);
      }
    },
    [changePassword]
  );
  const formik = useFormik<InstructorData>({
    initialValues,
    validationSchema,
    onSubmit: submitAction,
    enableReinitialize: true
  });

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    await formik.setTouched({
      oldPassword: true,
      newPassword: true,
      confirmPassword: true
    });
    console.log('was here 2');
    const submittedValues = {
      oldPassword: formik.values.oldPassword,
      newPassword: formik.values.newPassword,
      role: 'Instructor',
      _id: id
    };
    void submitAction(submittedValues); //need to be revised
  }

  return (
    <div className='container'>
      <div>
        <Input
          key='oldPassword'
          correctMessage=''
          errorMessage={formik.errors.oldPassword}
          hint=''
          isError={
            formik.touched.oldPassword && formik.errors.oldPassword
              ? true
              : null
          }
          isTop={false}
          label={'Current Password'}
          name={'oldPassword'}
          placeholder='Please Enter the Current Password'
          size={0}
          type='text'
          value={formik.values.oldPassword}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.newPassword}
          hint={''}
          isError={
            formik.touched.newPassword && formik.errors.newPassword
              ? true
              : null
          }
          isTop={false}
          label={'New Password'}
          name={'newPassword'}
          placeholder='Please Enter the New Password'
          size={0}
          type='password'
          value={formik.values.newPassword}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.confirmPassword}
          hint={''}
          isError={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? true
              : null
          }
          isTop={false}
          label={'Confirm Password'}
          name={'confirmPassword'}
          placeholder='Please Confirm the New Password'
          size={0}
          type='password'
          value={formik.values.confirmPassword}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='d-flex flex-row justify-content-center my-3'>
        <Button
          backgroundColor={'primary-bg'}
          isDisabled={
            !formik.isValid ||
            formik.values.oldPassword === '' ||
            formik.values.newPassword === '' ||
            formik.values.confirmPassword === ''
          }
          label={'Change Password'}
          name={'Edit'}
          type={'button'}
          onClickFunc={handleSubmit}
        />
      </div>
    </div>
  );
}
