// https://fkhadra.github.io/react-toastify/promise
import { ToastOptions } from 'react-toastify';

export const toastOptions = {
  position: 'bottom-right',
  autoClose: 6000,
  pauseOnHover: true,
  hideProgressBar: false,
  draggable: true,
  theme:
    localStorage &&
    localStorage.getItem('theme') !== null &&
    localStorage.getItem('theme') === 'dark'
      ? 'dark'
      : 'light'
} as ToastOptions;
