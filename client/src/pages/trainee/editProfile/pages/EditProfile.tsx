import PhoneInput from 'react-phone-number-input';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import styles from './edit-profile.module.scss';

import { updateProfile } from './updateProfileApi';

import { UseUser } from '@/store/userStore';
import { toastOptions } from '@/components/toast/options';
import 'react-phone-number-input/style.css';

type EditProfileData = {
  profileImage: string | undefined;
  name: string | undefined;
  email: string | undefined;
  username: string | undefined;
  phone: string | undefined;
};

const validationSchema = Yup.object({
  profileImage: Yup.string().url('Invalid URL'),
  name: Yup.string()
    .min(1, 'Name is Too Short!')
    .max(50, 'Name is Too Long!')
    .required('Name is Required'),
  email: Yup.string()
    .email('Invalid Email address')
    .min(6, 'Email address is Too Short!')
    .max(50, 'Email address is Too Long!')
    .required('Email address is Required'),
  username: Yup.string()
    .min(1, 'Username is Too Short!')
    .max(50, 'Username is Too Long!')
    .matches(/^[a-zA-Z]+$/, 'Username must be only letters')
    .required('Username is Required'),
  phone: Yup.string()
});

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function EditProfile() {
  const user = UseUser();
  console.log(user);
  const imgURL = user?.profileImage;

  async function submitAction(traineeData: EditProfileData) {
    const response = await toast.promise(updateProfile(user?._id as string, traineeData),{
			pending:'Updating profile',
			success:'Profile updated successfully',
			error:'Error occurred during updating profile'

		},toastOptions);
     if(response.status !== 200) {
      toast.error('Error occurred during updating profile', toastOptions);
    }
    console.log(response);
  }

  const initialValues = {
    profileImage: imgURL,
    name: user?.name,
    username: user?.username,
    email: user?.email?.address,
    phone: user?.phone
  };

  const formik = useFormik<EditProfileData>({
    initialValues,
    validationSchema,
    onSubmit: submitAction,
    enableReinitialize: true
  });

  async function handleSubmit() {
    await formik.setTouched({
      profileImage: true,
      name: true,
      email: true,
      phone: true,
      username: true
    });
    void submitAction(formik.values); //need to be revised
  }

  return (
    <div className='row p-1'>
      <div className='d-flex justify-content-center pb-3'>
        <div>
          <img alt='User pic' className={styles.img__container} src={imgURL} />
        </div>
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Profile Picture</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Change your profile picture
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='trainee-change-profile-picture'
            name='profileImage'
            placeholder='URL of your profile picture'
            style={{ width: '100%' }}
            type='text'
            value={formik.values.profileImage ? formik.values.profileImage : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.profileImage && formik.errors.profileImage ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.profileImage}
          </div>
        ) : null}
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Name</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Change your name
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='trainee-change-name'
            name='name'
            placeholder='Name'
            style={{ width: '100%' }}
            type='text'
            value={formik.values.name ? formik.values.name : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.name}
          </div>
        ) : null}
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Username</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Change your username
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='trainee-change-username'
            name='username'
            placeholder='Username'
            style={{ width: '100%' }}
            type='text'
            value={formik.values.username ? formik.values.username : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.username && formik.errors.username ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.username}
          </div>
        ) : null}
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Email Address</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Change your email address
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className={styles.input_field}>
          <input
            id='trainee-change-email-address'
            name='email'
            placeholder='Email address'
            style={{ width: '100%' }}
            type='text'
            value={formik.values.email ? formik.values.email : ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.email}
          </div>
        ) : null}
      </div>
      <hr className={styles.hr__line} />
      <div className='col-4'>
        <div className='row p-1'>
          <div className='h5 font-weight-bold'>Phone Number</div>
          <div
            className='text-muted'
            style={{ marginTop: '-0.4rem', fontSize: '0.8rem' }}
          >
            Change your phone number
          </div>
        </div>
      </div>
      <div className='col-8 d-flex flex-column justify-content-center'>
        <div className='form-group row'>
          <PhoneInput
            required
            className=' form-control phone'
            id='phone'
            name='phone'
            placeholder='Enter Your Phone Number'
            value={formik?.values?.phone}
            onChange={async function change(phoneValue: string) {
              await formik.setValues(
                { ...formik.values, phone: phoneValue },
                false
              );
              console.log(formik.errors);
            }}
          />
        </div>
        {formik.touched.phone && formik.errors.phone ? (
          <div className='text-danger' style={{ width: '100%' }}>
            {formik.errors.phone}
          </div>
        ) : null}
      </div>
      <button
        className='btn btn-primary mt-3 mx-auto'
        disabled={
          !formik.isValid ||
          formik.values.name === '' ||
          formik.values.email === '' ||
          formik.values.username === '' ||
          formik.values.phone === ''
        }
        id='trainee-save-changes-profile'
        style={{ width: '8rem' }}
        type='submit'
        onClick={handleSubmit}
      >
        Save Changes
      </button>
    </div>
  );
}
