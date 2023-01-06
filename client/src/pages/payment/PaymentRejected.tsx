import { useNavigate } from 'react-router-dom';

import styles from './payment-rejected.module.scss';

import failureIcon from 'src/assets/Rejected.jpg';

export default function PaymentRejected() {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate('/cart');
  };
  return (
    <div className={styles.box}>
      <div className='mb-1'>
        <img alt='Failure icon' height='60' src={failureIcon} width='60' />
      </div>
      <div className={styles.failure_text}>Payment Rejected</div>
      <div className={styles.transaction_text}>
        Transaction Rejected, please try again
      </div>
      <hr className='mt-4' />
      <button className={styles.reject_btn} type='submit' onClick={routeChange}>
        To your Cart
      </button>
    </div>
  );
}
