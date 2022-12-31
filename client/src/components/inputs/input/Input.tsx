import styles from './input.module.scss';
import { type InputProps } from './types';
function Input(props: InputProps) {
  const id = props.id;
  return (
    <div className={`form-group row ${props.className || ''}`}>
      <label
        className={`${props.isTop ? 'col-sm-4' : ''} col-form-label py-3`}
        htmlFor={id}
      >
        {props.label}
      </label>
      <div className={`${props.isTop ? 'col-sm-8' : 'col-sm-12'}`}>
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
          id={id}
          max={props.max}
          min={props.min}
          name={props.name}
          pattern={props.pattern}
          placeholder={props.placeholder}
          size={props.size}
          type={props.type}
          value={props.value}
          onBlur={props.onBlurFunc}
          onChange={props.onChangeFunc}
          onKeyDown={props.onKeyDownFunc}
        />

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

export default Input;
