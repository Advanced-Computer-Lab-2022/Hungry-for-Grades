import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { createPortal } from 'react-dom';

function Toast() {
  //      toast.error("Email and Password is required.", toastOptions);

  return createPortal(
    <>
      <ToastContainer />
    </>,
    document.getElementById('toast') as HTMLElement
  );
}

export default Toast;
