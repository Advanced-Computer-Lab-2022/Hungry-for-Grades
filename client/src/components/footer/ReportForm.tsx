import Select from 'react-select';

import Modal from '../modal/Modal';

import useValidation from './useValidation';

import { UseUser } from '@store/userStore';

function ReportForm() {
  const { formik } = useValidation();
  const useUser = UseUser();
  const reason = [
    { label: 'Technical', value: 'Technical' },
    { label: 'Financial', value: 'Financial' },
    { label: 'Other', value: 'Other' }
  ];

  return (
    useUser?._id && (
      <>
        <p>
          <a
            className='text-white'
            data-bs-target={`#modalReport`}
            data-bs-toggle='modal'
            href='#?'
            type='button'
          >
            Report
          </a>
        </p>
        <Modal
          isClose
          isDone
          isFooter
          closeText={'close'}
          deleteText={'Reject'}
          doneText={'report'}
          header='Report'
          id={'modalReport'}
          isDelete={false}
          onDone={async function onDone() {
            await formik.submitForm();
            // husssein yasser
          }}
        >
          <div className='row'>
            <div className='col-12 my-2'>
              <div className='form-group'>
                <label className='label col-form-label py-3' htmlFor='report'>
                  Reason
                </label>
                <Select
                  className='select react-select-container'
                  classNamePrefix='react-select'
                  errorMessage={formik.errors.reason}
                  id='Reason'
                  label={'Reason'}
                  name='reason'
                  options={reason}
                  placeholder={'Select Your Reason'}
                  style={{
                    border: '1px solid #ced4da',
                    height: '500px',
                    width: '100%'
                  }}
                  value={reason.find(
                    currReason => formik?.values?.reason === currReason.value
                  )}
                  onChange={async function change(option: typeof reason[0]) {
                    await formik.setValues(
                      { ...formik.values, reason: option.value },
                      false
                    );
                  }}
                />
              </div>
            </div>
            <div className='col-12 my-2'>
              <div className='form-group'>
                <label className='label col-form-label py-3' htmlFor='report'>
                  Description
                </label>
                <textarea
                  className='form-control'
                  id='report'
                  name='report'
                  placeholder='Report'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
        </Modal>
      </>
    )
  );
}

export default ReportForm;
