import { ErrorMessage, Field, FieldProps } from 'formik';

import Select from 'react-select';

import { SelectFieldProps } from './types';

function SelectWrapper(props: FieldProps & SelectFieldProps) {
  return (
    <Select
      name={props.name}
      options={props.options}
      value={props.options.find(o => o.value === props.field.value)}
      onBlur={props.field.onBlur}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={o => props.form.setFieldValue(props.field.name, o?.value)}
    />
  );
}

function SelectField(props: SelectFieldProps) {
  return (
    <div className='form-group'>
      <label className='form-label' htmlFor={props.name}>
        {props.label}
      </label>
      <Field
        component={SelectWrapper}
        hasError={props.hasError}
        id={props.name}
        name={props.name}
        options={props.options}
        touched={props.touched}
      />
      <ErrorMessage
        className='invalid-feedback'
        component='div'
        name={props.name}
      />
    </div>
  );
}

export default SelectField;
