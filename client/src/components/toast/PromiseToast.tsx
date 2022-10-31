/* eslint-disable @typescript-eslint/no-misused-promises */
import { toast, ToastContainer } from 'react-toastify';

import { createPortal } from 'react-dom';

import { toastOptions } from './options';
import { type PromiseToastProps } from './types';

const Toast: React.FC<PromiseToastProps> = props => {
  const notify = async () => {
    await toast.promise(props.request, props.messages, toastOptions);
  };
  //      toast.error("Email and Password is required.", toastOptions);

  return createPortal(
    <>
      <ToastContainer />
      <button type='button' onClick={notify}>
        Notify
      </button>
    </>,
    document.getElementById('toast') as HTMLElement
  );
};

export default Toast;
