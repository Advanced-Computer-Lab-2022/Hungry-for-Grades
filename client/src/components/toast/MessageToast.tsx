import { ToastContainer } from 'react-toastify';

import { createPortal } from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';

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
