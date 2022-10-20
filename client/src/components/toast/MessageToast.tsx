import { toast, ToastContainer } from 'react-toastify';

import { createPortal } from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';

import { toastOptions } from './options';
import { type MessageToastProps } from './types';

function Toast(props: MessageToastProps) {
  const notify = () => {
    toast[props.type](props.message, toastOptions);
  };
  //      toast.error("Email and Password is required.", toastOptions);

  return createPortal(
    <>
      <ToastContainer />
      <button type='button' onClick={notify}>
        Notify
      </button>
      ;
    </>,
    document.getElementById('toast') as HTMLElement
  );
}

export default Toast;
