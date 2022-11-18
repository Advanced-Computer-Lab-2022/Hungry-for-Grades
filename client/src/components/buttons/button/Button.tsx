import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './button.module.scss';
import { type ButtonProps } from './types';

function Button(props: ButtonProps) {
  const id = props.id || uuidv4();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  return (
    <button
      className={`btn ${props.className ?? styles.button ?? ''} ${
        styles[props.backgroundColor] ?? ''
      } }`}
      disabled={!props.isDisabled || isLoading}
      id={id}
      name={props.name}
      type={props.type === 'submit' ? 'submit' : 'button'}
      onBlur={props.onBlurFunc ?? undefined}
      onClick={async event => {
        try {
          event.preventDefault();
          event.stopPropagation();
          if (props.onClickFunc) {
            setIsLoading(prev => !prev);
            const flag = await props.onClickFunc?.(event);
            if (flag !== undefined) {
              setIsSuccess(flag);
            }
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
          setIsSuccess(false);
        }
      }}
      onFocus={props.onFocusFunc}
      onMouseOut={props.onMouseOutFunc}
      onMouseOver={props.onMouseOverFunc}
      onSubmit={async event => {
        try {
          event.preventDefault();
          event.stopPropagation();
          if (props.onSubmitFunc) {
            setIsLoading(prev => !prev);
            const flag = await props.onSubmitFunc?.(event);
            if (flag !== undefined) {
              setIsSuccess(flag);
            }
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
          setIsSuccess(false);
        }
      }}
    >
      {props.children}
      {isLoading && !isSuccess && (
        <>
          <span
            aria-hidden='true'
            className='spinner-border spinner-border-sm'
            role='status'
          />{' '}
          Loading...
        </>
      )}
      {!isLoading && !isSuccess && props.label}
      {isSuccess && (
        <>
          <span
            aria-hidden='true'
            className='spinner-border spinner-border-sm'
            role='status'
          />{' '}
          Success!
        </>
      )}
    </button>
  );
}

export default Button;
