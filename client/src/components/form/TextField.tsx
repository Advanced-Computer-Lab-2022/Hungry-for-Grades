import { ErrorMessage, Field, getIn } from 'formik';

import { TextFieldProps } from './types';

function TextField(props: TextFieldProps) {
  let fieldClassName = 'form-control';
  const touched = getIn(props.formik.touched, props.name);
  const error = getIn(props.formik.errors, props.name);
  if (touched) {
    fieldClassName += error ? ' is-invalid' : ' is-valid';
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
