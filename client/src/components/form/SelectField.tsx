import { ErrorMessage, Field, FieldProps, getIn } from 'formik';

import Select, { StylesConfig, SingleValue } from 'react-select';

import { SelectFieldProps, SelectOption } from './types';
type SingleValueOption = SingleValue<SelectOption>;
// type MultiValueOption = MultiValue<SelectOption>;

// Using react select with Formik
// https://gist.github.com/hubgit/e394e9be07d95cd5e774989178139ae8
// Styling react-select
// https://react-select.com/styles#provided-styles-and-state

function SelectWrapper(props: FieldProps & SelectFieldProps) {
  const touched = !!getIn(props.formik.touched, props.id);
  const error = !!getIn(props.formik.errors, props.id);
  const customStyles: StylesConfig<SelectOption> = {
    control: (provided, state) => {
      return {
        ...provided,
        // Using !important because the I can't override the hover blue border color
        borderColor: !touched
          ? '#ced4da !important'
          : error
          ? '#dc3545 !important'
          : '#198754 !important',
        boxShadow: !state.isFocused
          ? 'initial'
          : !touched
          ? '0 0 0 0.25rem rgb(63 114 175 / 25%)'
          : error
          ? '0 0 0 0.25rem rgb(220 53 69 / 25%)'
          : '0 0 0 0.25rem rgb(25 135 84 / 25%)'
      };
    }
  };
  return (
    <Select
      // Setting class name for the validation message to appear
      className={`${touched ? (error ? 'is-invalid' : 'is-valid') : ''}`}
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
        formik={props.formik}
        id={props.name}
        name={props.name}
        options={props.options}
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
