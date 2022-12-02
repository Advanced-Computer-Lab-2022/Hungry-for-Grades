import { useFormik } from 'formik';
import * as Yup from 'yup';

import { type UserFormProps } from '../types';

function useValidation({
  firstName,
  lastName,
  birthDate,
  phone,
  gender,
  country
}: UserFormProps) {
  const formik = useFormik<UserFormProps>({
    initialValues: {
      firstName: firstName || '',
      lastName: lastName || '',
      birthDate: birthDate || '',
      phone: phone || '',
      gender: gender || '',
      country: country || ''
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(1, 'First Name is Too Short!')
        .max(50, 'First Name is Too Long!')
        .matches(/^[a-zA-Z]+$/, 'First Name must be only letters')
        .required('First Name is Required'),
      lastName: Yup.string()
        .min(1, 'Last Name Too Short!')
        .matches(/^[a-zA-Z]+$/, 'First Name must be only letters')
        .max(50, 'Last Name Too Long!')
        .required('Last Name is Required'),
      birthDate: Yup.date()
        .min(new Date(1900, 1, 1), 'Birth Date is Too Old!')
        .max(new Date(), 'Birth Date is Wrong')
        .required('Birth Date is Required'),
      phone: Yup.string().required('Phone is Required'),
      country: Yup.string()
    }),
    onSubmit: (_, actions) => {
      actions.setSubmitting(true);
    }
  });
  return {
    formik
  };
}

export default useValidation;
