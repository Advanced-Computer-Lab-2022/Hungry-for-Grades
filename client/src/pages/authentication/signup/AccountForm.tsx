import { FormikErrors, useFormik } from 'formik';
import * as Yup from 'yup';

import { type AccountFormProps, type UpdateSignupData } from './types';

import Terms from './Terms&Conditions';

import Input from '@components/inputs/input/Input';
import Button from '@/components/buttons/button/Button';
import CheckBoxInput from '@/components/inputs/checkbox/CheckBoxInput';
import Modal from '@components/modal/Modal';
function AccountForm({
  email,
  password,
  terms,
  updateData,
  prev
}: AccountFormProps & { updateData: (data: UpdateSignupData) => void } & {
  prev: () => void;
}) {
  const formik = useFormik<AccountFormProps & { confirmPassword: string }>({
    initialValues: {
      email: email,
      password: password,
      confirmPassword: '',
      terms: terms,
      username: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid Email address')
        .min(6, 'Email address is Too Short!')
        .max(50, 'Email address is Too Long!')
        .required('Email address is Required'),
      password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Password is Required'),
      confirmPassword: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Confirm Password is Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      terms: Yup.boolean().oneOf([true], 'Terms must be accepted'),
      username: Yup.string()
        .min(1, 'Username is Too Short!')
        .max(50, 'Username is Too Long!')
        .matches(/^[a-zA-Z]+$/, 'Username must be only letters')
        .required('Username is Required')
    }),
    onSubmit: (values, actions) => {
      actions.resetForm();
      actions.setSubmitting(true);
    }
  });
  const scrollToErrors = (errors: FormikErrors<AccountFormProps>) => {
    const errorKeys = Object.keys(errors);

    if (errorKeys && errorKeys.length > 0) {
      console.log('errorKeys');
      document?.getElementsByName?.(`${errorKeys[0] || ''}`)[0]?.focus();
      return false;
    }
    return true;
  };
  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    await formik.setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      terms: true,
      username: true
    });
    formik.handleSubmit();
    if (!scrollToErrors(formik.errors)) {
      console.log('formik.values');
      console.log(formik.errors);
      event.stopPropagation();
      return;
    }
    updateData(formik.values);
  }
  return (
    <div className='row'>
      <div className='col-12 col-md-6  my-3'>
        <Input
          key='username'
          correctMessage=''
          errorMessage={formik.errors.username}
          hint=''
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
      <div className='col-12 col-md-6  my-3'>
        <Input
          key='emailAddress'
          correctMessage=''
          errorMessage={formik.errors.email}
          hint=''
          isError={formik.touched.email && formik.errors.email ? true : null}
          isTop={false}
          label='Email Address'
          name='email'
          placeholder='Email Address'
          size={0}
          type='text'
          value={formik.values.email}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='col-12 col-md-6  my-3'>
        <Input
          key='password'
          correctMessage=''
          errorMessage={formik.errors.password}
          hint=''
          isError={
            formik.touched.password && formik.errors.password ? true : null
          }
          isTop={false}
          label={'Password'}
          name={'password'}
          placeholder='Password'
          size={0}
          type='password'
          value={formik.values.password}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='col-12 col-md-6  my-3'>
        <Input
          key='confirmPassword'
          correctMessage=''
          errorMessage={formik.errors.confirmPassword}
          hint=''
          isError={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? true
              : null
          }
          isTop={false}
          label={'Confirm Password'}
          name={'confirmPassword'}
          placeholder='Confirm Password'
          size={0}
          type='password'
          value={formik.values.confirmPassword}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='d-flex flex-row justify-content-between'>
        <a
          className='text-primary'
          data-bs-target={`#modalTerms`}
          data-bs-toggle='modal'
          href='/'
          type='button'
        >
          <CheckBoxInput
            checked={formik.values.terms}
            className={''}
            errorMessage={''}
            id={'terms'}
            isChecked={formik.values.terms}
            label={'I agree to the Terms and Conditions'}
            name='rememberMe'
            required={false}
            value={formik.values.terms}
          />
        </a>
        <Modal
          isDelete
          isDone
          isFooter
          closeText={''}
          deleteText={'Reject'}
          doneText={'Accept'}
          header='Terms and Conditions'
          id={'modalTerms'}
          isClose={false}
          onDelete={async function onDelete() {
            await formik.setValues({
              ...formik.values,
              terms: false
            });
          }}
          onDone={async function onDone() {
            await formik.setValues({
              ...formik.values,
              terms: true
            });
          }}
        >
          <div className='row'>
            <div className='col-12'>{Terms}</div>
          </div>
        </Modal>
        <div className='d-flex flex-row justify-content-end'>
          <Button
            backgroundColor={'primary-bg-outline'}
            isDisabled={false}
            label={'back'}
            name={'back'}
            type={'button'}
            onClickFunc={prev}
          />
          <Button
            backgroundColor={'primary-bg'}
            isDisabled={
              !formik.isValid ||
              formik.values.username === '' ||
              formik.values.password === '' ||
              formik.values.confirmPassword === '' ||
              formik.values.email === '' ||
              formik.values.terms === false
            }
            label={'next'}
            name={'next'}
            type={'button'}
            onClickFunc={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountForm;
