import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './edit-profile.module.scss';

import { InstructorData, InstructorSubmitActionData } from './types';

import { IUser } from '@/interfaces/user.interface';
import { HttpResponse } from '@/interfaces/response.interface';
import { InstructorRoutes } from '@/services/axios/dataServices/InstructorDataService';
import { UseUser } from '@/store/userStore';
import usePostQuery from '@/hooks/usePostQuery';
import { toastOptions } from '@/components/toast/options';

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
  confirmPassword: '',
  role: '',
  _id: ''
};

export default function Security() {
  const user = UseUser();
  const id = user?._id;
  const { mutateAsync: changePassword } = usePostQuery<HttpResponse<IUser>>();

  const submitAction = useCallback(
    async (data: InstructorSubmitActionData) => {
      try {
        const updateRoute = Object.assign(
          {},
          InstructorRoutes.POST.changePassword
        );
        console.log(updateRoute);
        updateRoute.payload = data;
        const response: AxiosResponse<HttpResponse<IUser>> =
          await changePassword(updateRoute);
        console.log(response);
        if (response && response.status === 201) {
          toast.success('Password changed successfully', toastOptions);
        } else {
          toast.error(response.response.data.message, toastOptions);
        }
        console.log(response);
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

  async function handleSubmit() {
    await formik.setTouched({
      oldPassword: true,
      newPassword: true,
      confirmPassword: true
    });
    const submittedValues = {
      oldPassword: formik.values.oldPassword,
      newPassword: formik.values.newPassword,
      role: 'Instructor',
      _id: id as string
    };
    void submitAction(submittedValues); //need to be revised
  }

  return (
    <div className='row p-1'>
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Current Password</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Enter your current password
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='instructor-current-password'
            name='oldPassword'
            placeholder='Current password'
            style={{ width: '100%' }}
            type='password'
            value={formik.values.oldPassword ? formik.values.oldPassword : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.oldPassword && formik.errors.oldPassword ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.oldPassword}
          </div>
        ) : null}
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>New Password</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Enter your new password
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='instructor-new-password'
            name='newPassword'
            placeholder='New password'
            style={{ width: '100%' }}
            type='password'
            value={formik.values.newPassword ? formik.values.newPassword : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.newPassword}
          </div>
        ) : null}
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Confirm password</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Enter the new password again
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='instructor-confirm-password'
            name='confirmPassword'
            placeholder='Confirm password'
            style={{ width: '100%' }}
            type='password'
            value={
              formik.values.confirmPassword ? formik.values.confirmPassword : ''
            }
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>
      <button
        className='btn btn-primary mt-3 mx-auto'
        disabled={
          !formik.isValid ||
          formik.values.oldPassword === '' ||
          formik.values.newPassword === '' ||
          formik.values.confirmPassword === ''
        }
        id='instructor-change-password-btn'
        style={{ width: '10rem' }}
        type='submit'
        onClick={handleSubmit}
      >
        Change Password
      </button>
    </div>
  );
}
