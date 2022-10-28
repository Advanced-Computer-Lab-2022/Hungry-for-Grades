import { ErrorMessage, Field } from 'formik';

import { TextFieldProps } from './types';

function TextField(props: TextFieldProps) {
  let fieldClassName = 'form-control';
  if (props.touched) {
    fieldClassName += props.hasError ? ' is-invalid' : ' is-valid';
  }
  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={props.name}>
        {props.label}
      </label>
      <Field className={fieldClassName} id={props.name} name={props.name} />
      <ErrorMessage
        className='invalid-feedback'
        component='div'
        name={props.name}
      />
    </div>
  );
}

export default TextField;
