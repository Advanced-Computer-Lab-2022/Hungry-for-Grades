import { v4 as uuidv4 } from 'uuid';

import { CheckBoxInputProps } from './types';
function CheckBoxInput(props: CheckBoxInputProps) {
  return (
    <div className='col-2'>
      <div className='form-check'>
        <input
          className={'form-check-input'}
          id={uuidv4()}
          required={props.required}
          type='checkbox'
          onChange={props.onChange}
        />
        <label className='form-check-label' htmlFor='invalidCheck'>
          {props.label}
        </label>
        <small className='invalid-feedback'>{props.errorMessage}</small>
      </div>
    </div>
  );
}

export default CheckBoxInput;
