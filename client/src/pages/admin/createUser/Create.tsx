import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';

import { toast } from 'react-toastify';

import TextArea from '../TextArea';

import styles from './create.module.scss';

import { ValidationSchema } from '@pages/admin/createUser/ValidationSchema';

import { AdminRoutes } from '@/services/axios/dataServices/AdminDataService';

import usePostQuery from '@/hooks/usePostQuery';

import { toastOptions } from '@/components/toast/options';
import { ITrainee } from '@/interfaces/course.interface';
import { AxiosResponse } from 'axios';

export default function Create() {
  const { mutateAsync: createUser } = usePostQuery();

  const [inst, setInst] = useState<string>('Instructor');

  async function createAdmin(
    values: {
      Name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      corporate: string;
    },
    actions: FormikHelpers<{
      Name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      corporate: string;
    }>
  ) {
    const AdminRoutee = AdminRoutes.POST.createAdmin;
    AdminRoutee.payload = {
      email: {
        address: values.email
      },
      password: values.password,
      username: values.username,
      name: values.Name,
      address: {
        city: '',
        country: ''
      },
      role: 'Admin'
    };
    const resp = await createUser(AdminRoutee);
    const succ = resp?.response?.data?.success;
    if (succ == undefined)
      toast.success('Admin Created Successfully', toastOptions);
    else toast.error(resp?.response?.data?.message, toastOptions);
    actions.resetForm();
  }

  async function createinstructor(
    values: {
      Name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      corporate: string;
    },
    actions: FormikHelpers<{
      Name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      corporate: string;
    }>
  ) {
    const AdminRoutee = AdminRoutes.POST.createInstructor;
    AdminRoutee.payload = {
      email: {
        address: values.email
      },
      password: values.password,
      username: values.username,
      name: values.Name,
      address: {
        city: '',
        country: ''
      },
      role: 'Instructor'
    };
    const resp = await createUser(AdminRoutee);
    const succ = resp?.response?.data?.success;
    if (succ == undefined)
      toast.success('Instructor Created Successfully', toastOptions);
    else toast.error(resp?.response?.data?.message, toastOptions);
    actions.resetForm();
  }

  async function createTrainee(
    values: {
      Name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      corporate: string;
    },
    actions: FormikHelpers<{
      Name: string;
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
      corporate: string;
    }>
  ) {
    const AdminRoutee = AdminRoutes.POST.createCorporateTrainee;
    AdminRoutee.payload = {
      email: {
        address: values.email
      },
      password: values.password,
      username: values.username,
      name: values.Name,
      address: {
        city: '',
        country: ''
      },
      corporate: values.corporate,
      role: 'Trainee'
    };
    const resp = await createUser(AdminRoutee);
    const succ = resp?.response?.data?.success;
    if (succ == undefined)
      toast.success('Corporate Trainee Created Successfully', toastOptions);
    else toast.error(resp?.response?.data?.message, toastOptions);
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={{
        Name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        corporate: ''
      }}
      validationSchema={ValidationSchema}
      onSubmit={async function (
        values: {
          Name: string;
          username: string;
          email: string;
          password: string;
          confirmPassword: string;
          corporate: string;
        },
        actions
      ) {
        if (inst == 'Admin') await createAdmin(values, actions);
        else if (inst == 'C') await createTrainee(values, actions);
        else await createinstructor(values, actions);
      }}
    >
      {function (actions) {
        return (
          <Form>
            <div className={styles.hero}>
              <div className={styles.cont}>
                <div className={styles.form}>
                  <h2>Create a User</h2>
                  <div className={styles.toggle}>
                    <button
                      className={styles.toggle_button}
                      style={{
                        ...(inst === 'Instructor'
                          ? { borderBottomColor: 'red' }
                          : { borderBottomColor: 'white' })
                      }}
                      type='button'
                      onClick={() => {
                        setInst('Instructor');
                        actions.resetForm();
                      }}
                    >
                      Instructor
                    </button>
                    <button
                      className={styles.toggle_button}
                      style={{
                        ...(inst === 'C'
                          ? { borderBottomColor: 'red' }
                          : { borderBottomColor: 'white' })
                      }}
                      type='button'
                      onClick={() => {
                        setInst('C');
                        actions.resetForm();
                      }}
                    >
                      Corporate Trainee
                    </button>
                    <button
                      className={styles.toggle_button}
                      style={{
                        ...(inst === 'Admin'
                          ? { borderBottomColor: 'red' }
                          : { borderBottomColor: 'white' })
                      }}
                      type='button'
                      onClick={() => {
                        setInst('Admin');
                        actions.resetForm();
                      }}
                    >
                      Admin
                    </button>
                  </div>
                  <label>
                    <span>Name</span>
                    <input style={{ display: 'none' }} />
                    <TextArea name='Name' placeholder={''} type='text' />
                  </label>
                  <label>
                    <span>UserName</span>
                    <input style={{ display: 'none' }} type='text' />
                    <TextArea name='username' placeholder={''} type='text' />
                  </label>
                  {inst === 'C' && (
                    <label>
                      <span>Corporate</span>
                      <input style={{ display: 'none' }} type='text' />
                      <TextArea name='corporate' placeholder={''} type='text' />
                    </label>
                  )}
                  <label>
                    <span>Email</span>
                    <input style={{ display: 'none' }} type='email' />
                    <TextArea name='email' placeholder={''} type='text' />
                  </label>
                  <label>
                    <span>Password</span>
                    <input style={{ display: 'none' }} type='password' />
                    <TextArea
                      name='password'
                      placeholder={''}
                      type='password'
                    />
                  </label>
                  <label style={{ marginBottom: '1.5rem' }}>
                    <span>Confirm Password</span>
                    <input style={{ display: 'none' }} type='password' />
                    <TextArea
                      name='confirmPassword'
                      placeholder={''}
                      type='password'
                    />
                  </label>
                  <button className={styles.submit} type='submit'>
                    Submit
                  </button>
                </div>
                <div className={styles.sub_cont}>
                  <div className={styles.img} />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
