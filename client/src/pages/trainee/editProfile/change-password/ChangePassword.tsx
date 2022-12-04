import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';

import { TraineeData } from './types';

import Button from '@components/buttons/button/Button';
import Input from '@components/inputs/input/Input';

import { useCallback } from 'react';
import usePostQuery from '@/hooks/usePostQuery';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';

import { toast } from 'react-toastify';

const id = '637969352c3f71696ca34759';

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

const initialValues: TraineeData = {
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
        console.log(updateRoute);
        updateRoute.payload = data;
        const response = await changePassword(updateRoute);
        if (response && response.status === 201) {
          console.log('Password changed successfully');
          toast.success('Password changed successfully');
        } else {
          console.log('Password change failed');
          toast.error('Password change failed');
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    [changePassword]
  );
  const formik = useFormik<TraineeData>({
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
      role: 'Trainee',
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
