import { useNavigate } from 'react-router-dom';

import styles from './payment-rejected.module.scss';

import failureIcon from 'src/assets/failure.png';
export default function PaymentAccepted() {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate('/cart');
  };
  return (
    <div className={styles.box}>
      <div className='mb-1'>
        <img alt='Failure icon' height='60' src={failureIcon} width='60' />
      </div>
      <div className={styles.failure_text}>Payment Failed</div>
      <div className={styles.transaction_text}>
        Transaction Failed, please try again
      </div>
      <hr className='mt-4' />
      <button className={styles.reject_btn} type='submit' onClick={routeChange}>
        To your Cart
      </button>
    </div>
  );
}
