import { ErrorMessage, Field, FieldProps } from 'formik';

import Select, { StylesConfig, SingleValue } from 'react-select';

import { SelectFieldProps, SelectOption } from './types';
type SingleValueOption = SingleValue<SelectOption>;
// type MultiValueOption = MultiValue<SelectOption>;

// Using react select with Formik
// https://gist.github.com/hubgit/e394e9be07d95cd5e774989178139ae8
// Styling react-select
// https://react-select.com/styles#provided-styles-and-state

function SelectWrapper(props: FieldProps & SelectFieldProps) {
  const customStyles: StylesConfig<SelectOption> = {
    control: (provided, state) => {
      return {
        ...provided,
        // Using !important because the I can't override the hover blue border color
        borderColor: !props.touched
          ? '#ced4da !important'
          : props.hasError
          ? '#dc3545 !important'
          : '#198754 !important',
        boxShadow: !state.isFocused
          ? 'initial'
          : !props.touched
          ? '0 0 0 0.25rem rgb(63 114 175 / 25%)'
          : props.hasError
          ? '0 0 0 0.25rem rgb(220 53 69 / 25%)'
          : '0 0 0 0.25rem rgb(25 135 84 / 25%)'
      };
    }
  };
  return (
    <Select
      // Setting class name for the validation message to appear
      className={`${
        props.touched ? (props.hasError ? 'is-invalid' : 'is-valid') : ''
      }`}
      name={props.name}
      options={props.options}
      styles={customStyles}
      value={props.options.find(o => o.value === props.field.value)}
      // eslint-disable-next-line react/jsx-no-bind
      onBlur={e => {
        props.field.onBlur(e);
        props.form.setFieldTouched(props.field.name, true);
      }}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={o =>
        props.form.setFieldValue(
          props.field.name,
          (o as SingleValueOption)?.value
        )
      }
    />
  );
}

function SelectField(props: SelectFieldProps) {
  return (
    <div className='form-group is-invalid'>
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
