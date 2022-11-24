import { v4 as uuidv4 } from 'uuid';

import styles from './form.module.scss';
import { type FormProps } from './types';
function Form(props: FormProps) {
  const id = props.id || uuidv4();

  return (
    <form
      noValidate
      acceptCharset='utf-8'
      aria-label={props.ariaLabel}
      autoComplete='off'
      className={`needs-validation ${props.className ?? ''}`}
      encType={props.encType}
      id={id}
      name={props.name || `form-${id}`}
      onReset={props.onResetFunc ?? undefined}
      onSubmit={props.onSubmitFunc ?? undefined}
    >
      <h4 className={styles.title}>{props.title}</h4>
      <h6
        className={`${styles?.subtitle ?? ''} ${
          props.className === 'middle' ? styles?.middle ?? '' : ''
        }`}
      >
        {props.subtitle}
      </h6>
      <fieldset
        disabled={props.isLoading || props.disabled}
        id='isloading'
        style={{ opacity: props.isLoading ? '0.1' : '1' }}
      >
        {props.inputs}
        {props.children}
      </fieldset>
    </form>
  );
}

export default Form;
