import { createPortal } from 'react-dom';

import { ModalProps } from './types';

// creating a portal to render the modal outside the root div
function Modal(props: ModalProps) {
  const {
    header,
    body,
    loader,
    form,
    footer,
    submit,
    id,
    isDelete,
    deleteText,
    isDone,
    doneText,
    isFooter,
    isClose,
    closeText,
    onDelete,
    onDone,
    children
  } = props;

  return createPortal(
    <div
      aria-hidden='true'
      aria-labelledby='exampleModalCenterTitle'
      className='modal fade modal-lg'
      id={`${id}`}
    >
      <div
        className='modal-dialog modal-dialog-centered modal-dialog-scrollable'
        role='document'
      >
        <div className='modal-content'>
          <div className='modal-header'>
            {header}

            <button
              aria-label='Close'
              className='btn-close'
              data-bs-dismiss='modal'
              data-bs-target={`${id}`}
              type='button'
            />
          </div>
          <div className='modal-body'>
            {body}
            {children}
            {form}
            <div className='m-auto'>{loader}</div>
          </div>
          {isFooter && (
            <div className='modal-footer'>
              {isClose && (
                <button
                  className='btn btn-outline-primary'
                  data-bs-dismiss='modal'
                  data-bs-target='classNamemodal'
                  type='button'
                >
                  {closeText}
                </button>
              )}
              {isDelete && (
                <button
                  aria-label='Close'
                  className='btn  btn-outline-primary'
                  data-bs-dismiss='modal'
                  data-bs-target='classNamemodal'
                  type='button'
                  onClick={onDelete}
                >
                  {deleteText}
                </button>
              )}
              {isDone && (
                <button
                  aria-label='Close'
                  className='btn  btn-primary '
                  data-bs-dismiss='modal'
                  data-bs-target='classNamemodal'
                  type='button'
                  onClick={onDone}
                >
                  {doneText}
                </button>
              )}
              {submit}
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
}

export default Modal;
