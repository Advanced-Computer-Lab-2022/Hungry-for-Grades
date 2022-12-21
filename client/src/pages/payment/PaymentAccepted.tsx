import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import styles from './payment-accepted.module.scss';
import PaymentFailed from './PaymentFailed';

import usePostQuery from '@/hooks/usePostQuery';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { UseUser } from '@/store/userStore';
import successIcon from 'src/assets/success.png';
import Loader from '@/components/loader/loaderpage/Loader';
export default function PaymentAccepted() {
  const navigate = useNavigate();
  const user = UseUser();
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState(0);
  const { walletUsed } = useParams<{ walletUsed: string }>();
  const [isRendered, setIsRendered] = useState(false);

  const { mutateAsync: savePayment, isLoading, isError } = usePostQuery();

  const handleSavePayment = async () => {
    const acknowledge = TraineeRoutes.POST.savePayment;
    acknowledge.URL = `/payment/success/${encodeURIComponent(
      user?._id as string
    )}?walletUsed=${walletUsed as string}`;
    const response = await savePayment(acknowledge);
    setPaymentId(response?.data?.data?._id);
    setAmount(response?.data?.data?.amount);
  };

  if (!isRendered) {
    void handleSavePayment();
    setIsRendered(true);
  }

  if (isError) return <PaymentFailed />;

  if (isLoading) {
    <Loader />;
  }

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
