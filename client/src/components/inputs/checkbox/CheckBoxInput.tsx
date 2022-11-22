import { v4 as uuidv4 } from 'uuid';

import { CheckBoxInputProps } from './types';
function CheckBoxInput(props: CheckBoxInputProps) {
  return (
    <div className='d-flex flex-raw'>
      <div className='form-check'>
        <input
          checked={props.checked}
          className={`form-check-input ${props.className}`}
          id={uuidv4()}
          required={props.required}
          style={{ display: 'inset' }}
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
