import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './payment-accepted.module.scss';
import PaymentFailed from './PaymentFailed';

import usePostQuery from './postApi';

import { UseUser } from '@/store/userStore';
import successIcon from 'src/assets/success.png';
import Loader from '@/components/loader/loaderpage/Loader';
import { UseCountry } from '@/store/countryStore';
export default function PaymentAccepted() {
  const navigate = useNavigate();
  const user = UseUser();
  const traineeId = user?._id as string;
  const country = UseCountry();
  const [searchParams] = useSearchParams();

  console.log(traineeId, country, searchParams.get('walletUsed') as string);

  const { data, isLoading, isError } = usePostQuery(
    traineeId,
    country,
    searchParams.get('walletUsed') as string
  );

  console.log('El Data ahy');
  console.log(data);

  if (isError) return <PaymentFailed />;

  if (isLoading) {
    return <Loader />;
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
        Transaction Id:&nbsp;{data?.data?._id}
      </div>
      <hr className='my-4' />
      <div className='d-flex justify-content-between'>
        <div className={styles.amount_text}>Amount Paid:</div>
        <div className={styles.amount_text}>${data.data.amount}</div>
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
