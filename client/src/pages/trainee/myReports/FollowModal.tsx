import { Modal } from 'react-bootstrap';

import { toast } from 'react-toastify';

import { useState } from 'react';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './FollowModal.module.scss';

import { Role } from '@/enums/role.enum';
import { AllReport, Message } from '@/interfaces/reports.interface';
import { UseUser } from '@/store/userStore';
import usePostQuery from '@/hooks/usePostQuery';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';

import { toastOptions } from '@/components/toast/options';

export default function FollowModal(props: {
  report: AllReport;
  func: () => void;
}) {
  const follow = props?.report?.followUp;

  const user = UseUser();

  const [update, setUpdate] = useState(0);

  const { mutateAsync: sendMessage } = usePostQuery();

  const [value, setValue] = useState('');

  function handleChange(event: { target: { value: string } }) {
    setValue(event.target.value);
  }

  console.log(follow);

  const toShow = follow?.map((msg: Message) => {
    const b = (user?.role == Role.ADMIN ? 1 : 0) ^ (msg?.isAdmin ? 1 : 0);

    console.log(msg);

    return (
      <>
        {b == 1 && (
          <div className={styles.message}>
            <p className={styles.text}> {msg?.content}</p>
          </div>
        )}
        {b == 0 && (
          <div className={styles.response}>
            <p className={styles.text}> {msg?.content}</p>
          </div>
        )}
      </>
    );
  });

  async function SendMessage() {
    const message = ReportDataService.POST.sendMessage;

    message.URL = `/report/${props?.report?._id}/user/${user?._id as string}`;

    message.payload = {
      content: `${value}`
    };

    await sendMessage(message);
    setUpdate(update + 1);
    toast.success('Your Follow up is sent successfully...', toastOptions);
    props.func();
  }

  return (
    <div className={styles.containerChatBody}>
      <Modal show onHide={props.func}>
        <Modal.Header closeButton>
          <Modal.Title>Follow Up</Modal.Title>
        </Modal.Header>
        <div className={styles.container}>
          <div className='row'>
            <section className={styles.chat}>
              <div
                className={styles.messages_chat}
                style={{
                  minHeight: '500px',
                  overflowY: 'scroll',
                  overflowX: 'hidden'
                }}
              >
                {toShow}
              </div>
              <div className={styles.footer_chat}>
                <input
                  className='form-control form-control-md mx-3'
                  placeholder='Type your follow up here'
                  type='text'
                  value={value}
                  onChange={handleChange}
                />
                <button
                  className='btn btn-primary mx-2'
                  type='button'
                  onClick={() => SendMessage()}
                >
                  Send
                </button>
              </div>
            </section>
          </div>
        </div>
      </Modal>
    </div>
  );
}
