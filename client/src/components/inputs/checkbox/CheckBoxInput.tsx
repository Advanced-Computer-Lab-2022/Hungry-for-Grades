import { CheckBoxInputProps } from './types';


function CheckBoxInput(props: CheckBoxInputProps) {
  return (
    <div className='d-flex flex-raw'>
      <div className='form-check'>
        <input
          checked={props.checked}
          className={`form-check-input ${props.className}`}
          id={props.id}
          required={props.required}
          type='checkbox'
          value={'true'}
          onChange={props.onChange}
        />
        <label className='form-check-label py-1' htmlFor='invalidCheck'>
          {props.label}
        </label>
        <small className='invalid-feedback'>{props.errorMessage}</small>
      </div>
    </div>
  );
}

export default CheckBoxInput;
