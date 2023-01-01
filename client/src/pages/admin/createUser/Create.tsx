/* eslint-disable sonarjs/cognitive-complexity */
import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';

import { toast } from 'react-toastify';

import '@pages/instructor/coursesData/nav-button.scss';

import { RiAdminFill } from 'react-icons/ri';

import { GiTeacher } from 'react-icons/gi';

import { MdSchool } from 'react-icons/md';

import { ValidationSchema } from '@pages/admin/createUser/ValidationSchema';

import { AdminRoutes } from '@/services/axios/dataServices/AdminDataService';

import usePostQuery from '@/hooks/usePostQuery';

import { toastOptions } from '@/components/toast/options';
import Input from '@/components/inputs/input/Input';

const style = {
  fontSize: '1.1rem',
  marginLeft: '0.2rem'
};

export default function Create() {
  const { mutateAsync: createUser } = usePostQuery();

  const [chosenTab, setChosenTab] = useState<string>('Instructor');

  async function createAdmin(
    values: {
      name: string;
      userName: string;
      email: string;
      password: string;
      confirmPassword: string;
      corporate: string;
    },
    actions: FormikHelpers<{
      name: string;
      userName: string;
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
      username: values.userName,
      name: values.name,
      address: {
        city: '',
        country: ''
      },
      role: 'Admin'
    };
    const response = await toast.promise(
      createUser(AdminRoutee),
      {
        pending: 'Creating Admin User',
      },
      toastOptions
    );
    const success = response?.response?.data?.success;
    if (success == undefined) {
			toast.success('Admin Is Created Successfully',toastOptions)
    } else toast.error(response?.response?.data?.message, toastOptions);
    actions.resetForm();
  }

  async function createinstructor(
    values: {
      name: string;
      userName: string;
      email: string;
      password: string;
      confirmPassword: string;
      corporate: string;
    },
    actions: FormikHelpers<{
      name: string;
      userName: string;
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
      username: values.userName,
      name: values.name,
      address: {
        city: '',
        country: ''
      },
      role: 'Instructor'
    };
    const response = await toast.promise(
      createUser(AdminRoutee),
      {
        pending: 'Creating Instructor User',
      },
      toastOptions
    );
    const success = response?.response?.data?.success;
    if (success == undefined) {
      toast.success('Instructor Is Created Successfully',toastOptions);
    } else toast.error(response?.response?.data?.message, toastOptions);
    actions.resetForm();
  }

  async function createTrainee(
    values: {
      name: string;
      userName: string;
      email: string;
      password: string;
      confirmPassword: string;
      corporate: string;
    },
    actions: FormikHelpers<{
      name: string;
      userName: string;
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
      username: values.userName,
      name: values.name,
      address: {
        city: '',
        country: ''
      },
      corporate: values.corporate,
      role: 'Trainee'
    };
    const response = await toast.promise(
      createUser(AdminRoutee),
      {
        pending: 'Creating Corporate Trainee User',
      },
      toastOptions
    );
    const success = response?.response?.data?.success;
    if (success == undefined) {
			toast.success('Corporate Trainee Is Created Successfully',toastOptions);

    } else toast.error(response?.response?.data?.message, toastOptions);
    actions.resetForm();
  }

  return (
    <Formik
      initialValues={{
        name: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        corporate: ''
      }}
      validationSchema={ValidationSchema}
      onSubmit={async function (
        values: {
          name: string;
          userName: string;
          email: string;
          password: string;
          confirmPassword: string;
          corporate: string;
        },
        actions
      ) {
        if (chosenTab == 'Admin') await createAdmin(values, actions);
        else if (chosenTab == 'Corporate') await createTrainee(values, actions);
        else await createinstructor(values, actions);
      }}
    >
      {formik => (
        <Form>
          <div
            className={`card p-5`}
            style={{
              backgroundColor: '#f8f9fa'
            }}
          >
            <div className={` card card-cascade rounded bg-light shadow`}>
              <div className={`p-4 `}>
                <div
                  className='container d-flex justify-content-center mb-4'
                  style={{
                    width: '32rem'
                  }}
                >
                  <button
                    className={`navButton ${
                      chosenTab === 'Corporate' ? 'activeNavButton' : ''
                    }`}
                    id='Create_ChooseCorporateTraineeTab'
                    type='button'
                    onClick={() => {
                      setChosenTab('Corporate');
                      formik.resetForm();
                    }}
                  >
                    Corporate Trainee
                    <MdSchool style={style} />
                  </button>
                  <button
                    className={`navButton ${
                      chosenTab === 'Instructor' ? 'activeNavButton' : ''
                    }`}
                    id='Create_ChooseInstructorTab'
                    type='button'
                    onClick={() => {
                      setChosenTab('Instructor');
                      formik.resetForm();
                    }}
                  >
                    Instructor
                    <GiTeacher style={style} />
                  </button>
                  <button
                    className={`navButton ${
                      chosenTab === 'Admin' ? 'activeNavButton' : ''
                    }`}
                    id='Create_ChooseAdminTab'
                    type='button'
                    onClick={() => {
                      setChosenTab('Admin');
                      formik.resetForm();
                    }}
                  >
                    Admin
                    <RiAdminFill style={style} />
                  </button>
                </div>
                <div className='container'>
                  <div className='row'>
                    <div className='col-12 col-md-6'>
                      <Input
                        correctMessage=''
                        errorMessage={formik.errors.name}
                        hint=''
                        id='Create_NameInput'
                        isError={
                          formik.touched.name && formik.errors.name
                            ? true
                            : null
                        }
                        isTop={false}
                        label={'Name'}
                        name={'name'}
                        placeholder='Name'
                        size={0}
                        type='text'
                        value={formik.values.name}
                        onBlurFunc={formik.handleBlur}
                        onChangeFunc={formik.handleChange}
                      />
                    </div>
                    <div className='col-12 col-md-6'>
                      <Input
                        correctMessage=''
                        errorMessage={formik.errors.userName}
                        hint=''
                        id='Create_UserNameInput'
                        isError={
                          formik.touched.userName && formik.errors.userName
                            ? true
                            : null
                        }
                        isTop={false}
                        label={'UserName'}
                        name={'userName'}
                        placeholder='UserName'
                        size={0}
                        type='text'
                        value={formik.values.userName}
                        onBlurFunc={formik.handleBlur}
                        onChangeFunc={formik.handleChange}
                      />
                    </div>
                    {chosenTab === 'Corporate' && (
                      <div className='col-12'>
                        <Input
                          correctMessage=''
                          errorMessage={formik.errors.corporate}
                          hint=''
                          id='Create_CorporateInput'
                          isError={
                            formik.touched.corporate && formik.errors.corporate
                              ? true
                              : null
                          }
                          isTop={false}
                          label={'Corporate Name'}
                          name={'corporate'}
                          placeholder='Corporate Name'
                          size={0}
                          type='text'
                          value={formik.values.corporate}
                          onBlurFunc={formik.handleBlur}
                          onChangeFunc={formik.handleChange}
                        />
                      </div>
                    )}
                    <div className='col-12'>
                      <Input
                        correctMessage=''
                        errorMessage={formik.errors.email}
                        hint=''
                        id='Create_EmailInput'
                        isError={
                          formik.touched.email && formik.errors.email
                            ? true
                            : null
                        }
                        isTop={false}
                        label={'Email'}
                        name={'email'}
                        placeholder='E-mail'
                        size={0}
                        type='text'
                        value={formik.values.email}
                        onBlurFunc={formik.handleBlur}
                        onChangeFunc={formik.handleChange}
                      />
                    </div>

                    <div className='col-12 col-md-6'>
                      <Input
                        correctMessage=''
                        errorMessage={formik.errors.password}
                        hint=''
                        id='Create_PasswordInput'
                        isError={
                          formik.touched.password && formik.errors.password
                            ? true
                            : null
                        }
                        isTop={false}
                        label={'Password'}
                        name={'password'}
                        placeholder='Password'
                        size={0}
                        type='text'
                        value={formik.values.password}
                        onBlurFunc={formik.handleBlur}
                        onChangeFunc={formik.handleChange}
                      />
                    </div>

                    <div className='col-12 col-md-6'>
                      <Input
                        correctMessage=''
                        errorMessage={formik.errors.confirmPassword}
                        hint=''
                        id='Create_ConfirmPasswordInput'
                        isError={
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? true
                            : null
                        }
                        isTop={false}
                        label={'Confirm Password'}
                        name={'confirmPassword'}
                        placeholder='Retype your Password'
                        size={0}
                        type='text'
                        value={formik.values.confirmPassword}
                        onBlurFunc={formik.handleBlur}
                        onChangeFunc={formik.handleChange}
                      />
                    </div>

                    <div className='d-flex flex-row justify-content-end mt-3'>
                      <button
                        className={`btn btn-primary btn-lg`}
                        id='Create_Submit'
                        type='submit'
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
