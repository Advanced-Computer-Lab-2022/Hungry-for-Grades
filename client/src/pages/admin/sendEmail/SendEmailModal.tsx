import { toast } from 'react-toastify';

import useValidation from './useValidation';

import Modal from '@components/modal/Modal';

import { toastOptions } from '@components/toast/options';

import usePostQuery from '@/hooks/usePostQuery';
import { HttpResponse } from '@/interfaces/response.interface';
import { NewsLetterRoutes } from '@/services/axios/dataServices/NewsLetterDataService';

function SendEmailModal({ email }: { email: string }) {
  const { formik } = useValidation();

  const { mutateAsync: sendEmail } = usePostQuery<HttpResponse<null>>();

  async function clickSubmit(subject: string, body: string) {
    const EmailRoute = Object.assign({}, NewsLetterRoutes.POST.sendEmail);
    EmailRoute.payload = {
      subject,
      body
    };
    EmailRoute.query = `email=${email}`;

    try {
      await sendEmail(EmailRoute);

      toast.success(`Email sent to ${email} Successfully`, toastOptions);
    } catch (error) {
      toast.error(`Error sending email to ${email}`, toastOptions);
    }
  }

  return (
    <>
      <p>
        <a
          className='btn btn-primary'
          data-bs-target={`#modalSendEmail`}
          data-bs-toggle='modal'
          href='#?'
          type='button'
        >
          Send Email
        </a>
      </p>
      <Modal
        isClose
        isDone
        isFooter
        closeText={'close'}
        deleteText={'Reject'}
        doneText={'Send Email'}
        header={`Send Email to ${email}`}
        id={'modalSendEmail'}
        isDelete={false}
        onDone={async function onDone() {
          await formik.submitForm();
          void clickSubmit(formik.values.subject, formik.values.body);
        }}
      >
        <div className='row'>
          <div className='col-12 my-2'>
            <div className='form-group'>
              <label className='label col-form-label py-3' htmlFor='report'>
                Subject
              </label>
              <input
                className='form-control'
                id='subject'
                name='subject'
                placeholder='Enter Your Subject'
                value={formik.values.subject}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className='col-12 my-2'>
            <div className='form-group'>
              <label className='label col-form-label py-3' htmlFor='report'>
                Body{' '}
              </label>
              <textarea
                className='form-control'
                id='body'
                name='body'
                placeholder='Enter Your Body'
                value={formik.values.body}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SendEmailModal;
