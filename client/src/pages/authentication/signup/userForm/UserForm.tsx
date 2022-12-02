import PhoneInput from 'react-phone-number-input';
import { FormikErrors } from 'formik';

import Select from 'react-select';

import ReactFlagsSelect from 'react-flags-select';

import { type UpdateSignupData, type UserFormProps } from '../types';

import useValidation from './useValidation';

import Button from '@components/buttons/button/Button';
import Input from '@components/inputs/input/Input';

import 'react-phone-number-input/style.css';
import { Gender } from '@/enums/gender.enum';

type Options = {
  value: string;
  label: string;
};

const genders: Options[] = [
  {
    label: Gender.MALE,
    value: Gender.MALE
  },
  {
    label: Gender.FEMALE,
    value: Gender.FEMALE
  }
];
const scrollToErrors = (
  errors: FormikErrors<{
    firstName: string;
    lastName: string;
    age: string | number;
    phone: string;
    gender: 'Male' | 'Female';
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

function UserForm({
  firstName,
  lastName,
  birthDate,
  phone,
  gender,
  country,
  updateData
}: UserFormProps & { updateData: (data: UpdateSignupData) => void }) {
  const { formik } = useValidation({
    firstName,
    lastName,
    birthDate,
    phone,
    gender,
    country
  });

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    await formik.setTouched({
      firstName: true,
      lastName: true,
      birthDate: true,
      phone: true,
      country: true
    });
    await formik.submitForm();
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
          key='firstName-1'
          correctMessage=''
          errorMessage={formik.errors.firstName}
          hint=''
          isError={
            formik.touched.firstName && formik.errors.firstName ? true : null
          }
          isTop={false}
          label={'First Name'}
          name={'firstName'}
          placeholder='First Name'
          size={0}
          type='text'
          value={formik.values.firstName}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='col-12 col-md-6  my-3'>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.lastName}
          hint={''}
          isError={
            formik.touched.lastName && formik.errors.lastName ? true : null
          }
          isTop={false}
          label={'Last Name'}
          name={'lastName'}
          placeholder='Last Name'
          size={0}
          type='text'
          value={formik.values.lastName}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>
      <div className='col-12 col-md-6  my-3'>
        <div className='form-group'>
          <label className={` col-form-label py-3`} htmlFor={'country'}>
            Gender
          </label>
          <div className='col-sm-12'>
            <Select
              className='select react-select-container'
              classNamePrefix='react-select'
              errorMessage={formik.errors.gender}
              id='Gender'
              label={'Gender'}
              name='gender'
              options={genders}
              placeholder={'Select Your Gender'}
              style={{
                border: '1px solid #ced4da',
                height: '500px',
                width: '100%'
              }}
              value={genders.find(
                currGender => formik?.values?.gender === currGender.value
              )}
              onChange={async function change(option: Options) {
                await formik.setValues(
                  { ...formik.values, gender: option.value as Gender },
                  false
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className='col-12 col-md-6  my-3'>
        <Input
          correctMessage={''}
          errorMessage={formik.errors.birthDate}
          hint={''}
          isError={
            formik.touched.birthDate && formik.errors.birthDate ? true : null
          }
          isTop={false}
          label={'Birth of Date'}
          name={'birthDate'}
          placeholder='Birth of Date'
          size={0}
          type='date'
          value={formik.values.birthDate}
          onBlurFunc={formik.handleBlur}
          onChangeFunc={formik.handleChange}
        />
      </div>

      <div className='col-12 col-md-6  my-3'>
        <div className='form-group'>
          <label className={` col-form-label py-3`} htmlFor={'country'}>
            Country
          </label>
          <div className='col-sm-12 p-0 m-0'>
            <ReactFlagsSelect
              searchable
              className='select flag__select__signup'
              id='country'
              placeholder='Select Your Country'
              selected={formik?.values?.country}
              onSelect={async function change(code) {
                await formik.setValues(
                  { ...formik.values, country: code },
                  false
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className='col-12 col-md-6  my-3'>
        <div className='form-group row'>
          <label className={` col-form-label py-3`} htmlFor={'phoneNumber'}>
            Phone Number
          </label>
          <div className='col-sm-12'>
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
            <div className='invalid-feedback px-3' id='phone'>
              <span className='alert-link'>{formik.errors.phone}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex flex-row justify-content-end my-3'>
        <Button
          backgroundColor={'primary-bg'}
          isDisabled={
            !formik.isValid ||
            formik.values.firstName === '' ||
            formik.values.lastName === '' ||
            formik.values.birthDate === '' ||
            formik.values.phone === '' ||
            formik.values.country === ''
          }
          label={'next'}
          name={'next'}
          type={'button'}
          onClickFunc={handleSubmit}
        />
      </div>
    </div>
  );
}

export default UserForm;
