import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';

import { PropsTraineeData, TraineeData } from './types';

import Button from '@components/buttons/button/Button';
import Input from '@components/inputs/input/Input';

const scrollToErrors = (
  errors: FormikErrors<{
    name: string;
    phone: string;
    email: { address: string };
    username: string;
  }>
) => {
  const errorKeys = Object.keys(errors);

  if (errorKeys && errorKeys.length > 0) {
    console.log('errorKeys');
    document?.getElementsByName?.(`${errorKeys[0] || ''}`)[0]?.focus();
    return false;
  }
  return true;
};

const validationSchema = Yup.object({
  email: Yup.object({
    address: Yup.string()
      .email('Invalid Email address')
      .min(6, 'Email address is Too Short!')
      .max(50, 'Email address is Too Long!')
      .required('Email address is Required')
  }),
  name: Yup.string()
    .min(1, 'Name is Too Short!')
    .max(50, 'Name is Too Long!')
    .required('Name is Required'),
  phone: Yup.string().required('Phone number is Required'),
  username: Yup.string()
    .min(1, 'Username is Too Short!')
    .max(50, 'Username is Too Long!')
    .matches(/^[a-zA-Z]+$/, 'Username must be only letters')
    .required('Username is Required')
});

export default function ProfileForm(props: PropsTraineeData) {
  const { initialValues, submitAction } = props;
  console.log(typeof submitAction);
  const navigate = useNavigate();

  const formik = useFormik<TraineeData>({
    initialValues,
    validationSchema,
    onSubmit: submitAction,
    enableReinitialize: true
  });

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    await formik.setTouched({
      name: true,
      email: { address: true },
      phone: true,
      username: true
    });
    await formik.submitForm();
    formik.handleSubmit();

    if (!scrollToErrors(formik.errors)) {
      console.log('formik.values');
      console.log(formik.errors);
      event.stopPropagation();
      return;
    }
    console.log(formik.values);
    submitAction(formik.values); //need to be revised
  }
  function navigateToChangePassword() {
    navigate('/instructor/change-password');
  }

  return (
    <div className='container'>
      <div>
        <Input
          key='name'
          correctMessage=''
          errorMessage={formik.errors.name}
          hint=''
          id='trainee-name'
          isError={formik.touched.name && formik.errors.name ? true : null}
          isTop={false}
          label={'Name'}
          name={'name'}
          placeholder='Name'
          size={0}
          type='text'
          value={formik.values.name ? formik.values.name : 0}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.email?.address}
          hint={''}
          id='trainee-email'
          isError={
            formik.touched.email?.address && formik.errors.email?.address
              ? true
              : null
          }
          isTop={false}
          label={'E-mail'}
          name={'email.address'}
          placeholder='E-mail'
          size={0}
          type='text'
          value={formik.values.email.address ? formik.values.email.address : 0}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div>
        <form>
          <div className='mt-3'>
            <label htmlFor='password'>Password</label>
          </div>
          <Button
            backgroundColor={'primary-bg'}
            className='mt-3'
            isDisabled={false}
            label={'Edit Password'}
            name={'Edit Password'}
            type={'button'}
            onClickFunc={navigateToChangePassword}
          />
        </form>
      </div>
      <div />
      <div>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.username}
          hint={''}
          id='trainee-username'
          isError={
            formik.touched.username && formik.errors.username ? true : null
          }
          isTop={false}
          label={'Username'}
          name={'username'}
          placeholder='Username'
          size={0}
          type='text'
          value={formik.values.username ? formik.values.username : 0}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.phone}
          hint={''}
          id='trainee-phone'
          isError={formik.touched.phone && formik.errors.phone ? true : null}
          isTop={false}
          label={'Phone Number'}
          name={'phone'}
          placeholder='Phone Number'
          size={0}
          type='text'
          value={formik.values.phone ? formik.values.phone : 0}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='d-flex flex-row justify-content-center mt-4'>
        <Button
          backgroundColor={'primary-bg'}
          isDisabled={
            !formik.isValid ||
            formik.values.name === '' ||
            formik.values.email?.address === '' ||
            formik.values.username === '' ||
            formik.values.phone === ''
          }
          label={'Edit'}
          name={'Edit'}
          type={'button'}
          onClickFunc={handleSubmit}
        />
      </div>
    </div>
  );
}
