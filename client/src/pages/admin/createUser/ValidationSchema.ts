import * as yup from 'yup';

export const ValidationSchema = yup.object().shape({
  Name: yup
    .string()
    .min(2, 'Name must be at least 2 charactres')
    .required('Name is Required'),

  username: yup
    .string()
    .matches(/^[A-Za-z0-9]+$/, 'Your Username must be alphabetical characters')
    .min(6, 'User Name must be at least 6 characters')
    .required('User Name is Required'),

  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 charaters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});
