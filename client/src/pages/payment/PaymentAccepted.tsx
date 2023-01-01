import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './payment-accepted.module.scss';
import PaymentFailed from './PaymentFailed';

import usePostQuery from './postApi';

import { UseUser, UseUserDeductBalance } from '@/store/userStore';
import successIcon from 'src/assets/success.png';
import Loader from '@/components/loader/loaderpage/Loader';
import { UseCountry } from '@/store/countryStore';
export default function PaymentAccepted() {
  const navigate = useNavigate();
  const user = UseUser();
  const traineeId = user?._id as string;
  const country = UseCountry();
  const [searchParams] = useSearchParams();
  const deductBalance = UseUserDeductBalance();

  const { data, isLoading, isError, error } = usePostQuery(
    traineeId,
    country,
    searchParams.get('walletUsed') as string
  );
  console.log(data);
  console.log(data?.data.data);
  if (isError) {
    console.log(error);
    return <PaymentFailed />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const routeChange = () => {
    deductBalance(
      data?.data?.data?.amount,
      (searchParams.get('walletUsed') as string) == 'true' ? true : false
    );
    navigate('/enrolled-courses');
  };
  return (
    <div className={styles.box}>
      <div className='mb-1'>
        <img alt='success icon' height='50' src={successIcon} width='50' />
      </div>
      <div className={styles.success_text}>Payment Successful!</div>
      <div className={styles.transaction_text}>
        Transaction Id:&nbsp;{data?.data?.data?._id}
      </div>
      <hr className='my-4' />
      <div className='d-flex justify-content-between'>
        <div className={styles.amount_text}>Amount Paid:</div>
        <div className={styles.amount_text}>${data?.data?.data?.amount}</div>
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
