import { FaLock, FaEnvelope } from 'react-icons/fa';

import { RiAccountCircleFill } from 'react-icons/ri';

import * as Yup from 'yup';

import { Formik } from 'formik';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './AddAdmin.module.scss';

import TextArea from './TextArea';

import Button from '@components/buttons/button/Button';

export default function AddInstructor() {
  const validate = Yup.object({
    firstName: Yup.string()
      .min(2, 'First Name must at least 2 charactres')
      .required('First Name is Required'),
    lastName: Yup.string()
      .min(2, 'First Name is Required')
      .required('Last Name is Required'),

    username: Yup.string()
      .min(6, 'User Name must be at least 6 characters')
      .required('User Name is Required'),

    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required')
  });

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={validate}
      onSubmit={function (values: {
        email: string;
        password: string;
        confirmPassword: string;
      }) {
        console.log(values);
      }}
    >
      {function (formik) {
        return (
          <div className={styles.form_wrapper}>
            <div className={styles.form_container}>
              <div className={styles.title_container}>
                <h2>Register an Instructor</h2>
              </div>
              <div className={`row ${styles.clearfix || ''}`}>
                <div className=''>
                  <form action='www.google.com'>
                    <div className={styles.input_field}>
                      {' '}
                      <span>
                        <RiAccountCircleFill />
                      </span>
                      <TextArea
                        name='firstName'
                        placeholder='First Name'
                        type='text'
                      />
                    </div>
                    <div className={styles.input_field}>
                      {' '}
                      <span>
                        <RiAccountCircleFill />
                      </span>
                      <TextArea
                        name='lastName'
                        placeholder='Last Name'
                        type='text'
                      />
                    </div>
                    <div className={styles.input_field}>
                      {' '}
                      <span>
                        <RiAccountCircleFill />
                      </span>
                      <TextArea
                        name='username'
                        placeholder='User Name'
                        type='text'
                      />
                    </div>
                    <div className={styles.input_field}>
                      {' '}
                      <span>
                        <FaEnvelope />
                      </span>
                      <TextArea name='email' placeholder='Email' type='email' />
                    </div>
                    <div className={styles.input_field}>
                      <span>
                        {' '}
                        <FaLock />{' '}
                      </span>
                      <TextArea
                        name='password'
                        placeholder='Password'
                        type='password'
                      />
                    </div>
                    <div className={styles.input_field}>
                      {' '}
                      <span>
                        {' '}
                        <FaLock />{' '}
                      </span>
                      <TextArea
                        name='confirmPassword'
                        placeholder='Re-type Password'
                        type='password'
                      />
                    </div>
                    <input className='button' type='submit' />
                    <Button
                      backgroundColor={'primary-bg'}
                      isDisabled={formik.isValid}
                      label={'Submit'}
                      name={''}
                      type={'submit'}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
