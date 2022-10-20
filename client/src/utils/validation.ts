import validator from 'validator';

const hintMessage = 'Please try again';

export type FormValues = Array<{
  name: string;
  value: string;
}>;

export function validateEmail(email: string): boolean {
  const re =
    // eslint-disable-next-line security/detect-unsafe-regex
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validatePassword(password: string): boolean {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(password));
}

// validate name
export function validateName(name: string): boolean {
  const re = /^[a-zA-Z]+$/;
  return re.test(String(name));
}

export const validateInputs = (formValues: FormValues) => {
  return formValues
    .map(input => {
      if (!input.value) {
        return {
          inputName: input.name,
          message: 'This field is required',
          hint: ''
        };
      }
      if (input.name === 'firstName' && !validateName(input.value)) {
        return {
          inputName: input.name,
          message: 'First name must be alphabets',
          hint: hintMessage
        };
      }
      if (input.name === 'lastName' && !validateName(input.value)) {
        return {
          inputName: input.name,
          message: 'Last name must be alphabets',
          hint: hintMessage
        };
      }
      if (input.name === 'email' && !validator.isEmail(input.value)) {
        return {
          inputName: input.name,
          message: 'This field must be a valid email',
          hint: hintMessage
        };
      }
      if (
        input.name === 'password' &&
        !validator.isLength(input.value, { min: 8 })
      ) {
        return {
          inputName: 'password',
          message: 'Invalid password',
          hint: hintMessage
        };
      }
      return {
        inputName: '',
        message: '',
        hint: ''
      };
    })
    .filter(input => input.message !== '');
};

export const handleError = (error: string) => {
  switch (error) {
    case 'InvalidPassword':
      return {
        inputName: 'password',
        message: 'Invalid password',
        hint: hintMessage
      };
    case 'InvalidEmail':
      return {
        inputName: 'email',
        message: 'Invalid Email',
        hint: hintMessage
      };
    case 'DuplicateEmail':
      return {
        inputName: 'email',
        message: 'Duplicate email',
        hint: 'This email already exists'
      };
    default:
      return {
        inputName: '',
        message: 'An unknown error has occurred',
        hint: 'Please try again or contact support'
      };
  }
};
