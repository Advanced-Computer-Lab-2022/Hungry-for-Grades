import { FaLock, FaEnvelope } from 'react-icons/fa';

import { RiAccountCircleFill } from 'react-icons/ri';

import * as Yup from 'yup';

import { Formik, Form } from 'formik';

// eslint-disable-next-line css-modules/no-unused-class
import { toast } from 'react-toastify';

import styles from './AddAdmin.module.scss';

import TextArea from './TextArea';

import { toastOptions } from '@/components/toast/options';

import { AdminRoutes } from '@/services/axios/dataServices/AdminDataService';

import usePostQuery from '@/hooks/usePostQuery';

export default function AddCorporateTrainee() {

  const { mutateAsync : create, isError, data } = usePostQuery();

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
      onSubmit={
        async function (values: {firstName:string, lastName:string, username:string, email: string; password: string; confirmPassword: string;}, actions)
        {
          const AdminRoute = Object.assign({}, AdminRoutes.POST.createCorporateTrainee);
          AdminRoute.payload = {
            email: {
              address: values.email
            },
            password: values.password,
            username : values.username,
            name : values.firstName + values.lastName,
            address: {
              city: '',
              country: ''
            },
            role:'Trainee'
          };

          try{ 
            await toast.promise(create(AdminRoute),
            {
            pending:'Pending',
            success:'Corporate Trainee Added Successfuly',
            
          }, toastOptions)
          actions.resetForm();
        } //AxiosResponse
          catch(err)
          {
            toast.error(err.response.data.message, toastOptions);
          }
        

          //('Internal Server Error', toastOptions);
        } 
    }
    >
      {function (formik) {
        return (
          <div className={styles.form_wrapper}>
            <div className={styles.form_container}>
              <div className={styles.title_container}>
                <h2>Register a Corporate Trainee</h2>
              </div>
              <div className={`row ${styles.clearfix || ''}`}>
                <div className=''>
                  <Form>
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
                  </Form>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
