import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';

import { TraineeData } from './types';

import Button from '@components/buttons/button/Button';
import Input from '@components/inputs/input/Input';

const scrollToErrors = (
  errors: FormikErrors<{
    name: string;
    phone: string;
    email: { address: string };
    username: string;
    biography: string;
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
    .required('Username is Required'),
  biography: Yup.string()
    .min(1, 'Biography is Too Short!')
    .max(500, 'Biography is Too Long!')
    .required('Biography is Required')
});

export default function ProfileForm(props: any) {
  const { initialValues, submitAction } = props;

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
      username: true,
      biography: true
    });
    console.log('was here 2');
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

  return (
    <div className='container'>
      <div>
        <Input
          key='name'
          correctMessage=''
          errorMessage={formik.errors.name}
          hint=''
          isError={formik.touched.name && formik.errors.name ? true : null}
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
      <div>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.biography}
          hint={''}
          isError={
            formik.touched.biography && formik.errors.biography ? true : null
          }
          isTop={false}
          label={'Biography'}
          name={'biography'}
          placeholder='Biography'
          size={0}
          type='text'
          value={formik.values.biography}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.email?.address}
          hint={''}
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
          value={formik.values.email.address}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.username}
          hint={''}
          isError={
            formik.touched.username && formik.errors.username ? true : null
          }
          isTop={false}
          label={'Username'}
          name={'username'}
          placeholder='Username'
          size={0}
          type='text'
          value={formik.values.username}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.phone}
          hint={''}
          isError={formik.touched.phone && formik.errors.phone ? true : null}
          isTop={false}
          label={'Phone Number'}
          name={'phone'}
          placeholder='Phone Number'
          size={0}
          type='text'
          value={formik.values.phone}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='d-flex flex-row justify-content-center my-3'>
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
