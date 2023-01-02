import Select from 'react-select';

import { toast } from 'react-toastify';

import Modal from '../modal/Modal';

import { toastOptions } from '../toast/options';

import useValidation from './useValidation';

import { UseUser } from '@store/userStore';

import usePostQuery from '@/hooks/usePostQuery';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { POSTRoutesType } from '@/services/axios/types';

function ReportForm(props: { courseID: string }) {
  const { formik } = useValidation();
  const useUser = UseUser();
  const reason = [
    { label: 'Technical', value: 'Technical' },
    { label: 'Financial', value: 'Financial' },
    { label: 'Other', value: 'Other' }
  ];

  const { mutateAsync: submitReport } = usePostQuery();

  async function clickSubmit(res: string, des: string) {
    const Courses = ReportDataService.POST.makeReport;

    Courses.payload = {
      _course: props.courseID == '' ? null : props.courseID,
      _user: useUser?._id,
      description: des,
      reason: res,
      status: 'Unseen'
    };

    await toast.promise(
      submitReport(Courses as POSTRoutesType),
      {
        pending: 'Sending Report...',
        success: 'Report sent successfully',
        error: 'Error while sending Report'
      },
      toastOptions
    );
  }

  return useUser?._id ? (
    <>
      <p>
        <a
          data-bs-target={`#modalReport`}
          data-bs-toggle='modal'
          href='#?'
          style={{
            color: 'inherit'
          }}
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
          // husssein yasser when ahmed wahba adjust the course id back from null we should adjust the hardcoded course id above
          void clickSubmit(formik.values.reason, formik.values.description);
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
                name='description'
                placeholder='Enter Your Description'
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  ) : (
    <></>
  );
}

export default ReportForm;
