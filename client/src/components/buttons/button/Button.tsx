import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { toast } from 'react-toastify';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './button.module.scss';
import { type ButtonProps } from './types';

import { toastOptions } from '@components/toast/options';

function Button(props: ButtonProps) {
  const id = props.id || uuidv4();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <button
      className={`btn ${props.className ?? styles.button ?? ''} ${
        styles[props.backgroundColor] ?? ''
      } }`}
      disabled={props.isDisabled}
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
            await props.onClickFunc?.(event);

            if (props.correctMessage && props.correctMessage !== '') {
              toast.success(props.correctMessage, toastOptions);
            }
          }
        } catch (error) {
          if (props.errorMessage && props.errorMessage !== '') {
            toast.error('Something unexpected occurred !', toastOptions);
          }
        } finally {
          setIsLoading(false);
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
            await props.onSubmitFunc?.(event);

          }
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {props.children}
      {isLoading  && (
        <>
          <span
            aria-hidden='true'
            className='spinner-border spinner-border-sm'
            role='status'
          />{' '}
          Loading...
        </>
      )}
      {!isLoading  && props.label}
    </button>
  );
}

export default Button;
