import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

import styles from './input.module.scss';
import { type InputProps } from './types';
function PasswordInput(props: InputProps) {
  const [isPassword, setIsPassword] = useState(true);
  const id = props.id;
  return (
    <div className={`form-group row ${props.className || ''}`}>
      <label
        className={`${props.isTop ? 'col-sm-4' : ''} col-form-label py-3`}
        htmlFor={id + `-${props.name}`}
      >
        {props.label}
      </label>
      <div
        className={`${props.isTop ? 'col-sm-8' : 'col-sm-12'}`}
        style={{
          position: 'relative'
        }}
      >
        <input
          aria-describedby={id}
          aria-label={`Your ${props.name}`}
          autoComplete='off'
          className={`form-control  ${styles.input || ''} ${
            props.isError !== null
              ? props.isError
                ? 'is-invalid error-border text-danger'
                : 'is-valid text-success'
              : ''
          } `}
          id={id + `-${props.name}`}
          max={props.max}
          min={props.min}
          name={props.name}
          pattern={props.pattern}
          placeholder={props.placeholder}
          size={props.size}
          type={isPassword ? 'password' : 'text'}
          value={props.value}
          onBlur={props.onBlurFunc}
          onChange={props.onChangeFunc}
        />
        <button
          className='position-absolute'
          style={{
            top: '10%',
            right: '0',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--primary-color)',
            fontSize: '1.5rem'
          }}
          type='button'
          onClick={() => setIsPassword(!isPassword)}
        >
          {isPassword ? <BsEye /> : <BsEyeSlash />}
        </button>

        <div className='invalid-feedback px-3' id={id}>
          <span className='alert-link'>{props.errorMessage}</span>
          {props.hint ? ' , ' + props.hint : ''}
        </div>
        <div className='valid-feedback px-3' id={props.id}>
          {props.correctMessage}
        </div>
      </div>
    </div>
  );
}

export default PasswordInput;
