import { useNavigate } from 'react-router-dom';

import styles from './payment-accepted.module.scss';

import successIcon from 'src/assets/success.png';
export default function PaymentAccepted() {
  const paymentId = '63976f0ca7691a901835e492';
  const amount = 100;
  const navigate = useNavigate();
  const routeChange = () => {
    navigate('/enrolled-courses');
  };
  return (
    <div className={styles.box}>
      <div className='mb-1'>
        <img alt='success icon' height='50' src={successIcon} width='50' />
      </div>
      <div className={styles.success_text}>Payment Successful!</div>
      <div className={styles.transaction_text}>
        Transaction Id:&nbsp;{paymentId}
      </div>
      <hr className='my-4' />
      <div className='d-flex justify-content-between'>
        <div className={styles.amount_text}>Amount Paid:</div>
        <div className={styles.amount_text}>${amount}</div>
      </div>
      <button
        className={styles.success_btn}
        type='submit'
        onClick={routeChange}
      >
        To your Courses
      </button>
    </div>
  );
}
