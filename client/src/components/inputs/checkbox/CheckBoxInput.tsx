import { CheckBoxInputProps } from './types';
function CheckBoxInput(props: CheckBoxInputProps) {
  return (
    <div className='col-12'>
      <div className='form-check'>
        <input
          checked={props.isChecked || false}
          className={'form-check-input'}
          id='invalidCheck'
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
