import { AiFillStar } from 'react-icons/ai';
import { BsBookFill } from 'react-icons/bs';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

import UseDataQuery from './UseDataQuery';

import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
import ErrorMessage from '@/components/error/message/ErrorMessage';
const style = {
  fontSize: '1.5rem',
  marginBottom: '0.2rem',
  marginLeft: '0.2rem',
  color: 'var(--primary-color)'
};
const backStyle = {
  filter: 'drop-shadow(0 0 0.1rem #eee)',
  borderRadius: '0.25rem',
  boxShadow: ' 0 5px 8px 0 rgba(0, 0, 0, 0.2)',
  backgroundColor: 'white'
};
function Trainees() {
  const { data, isLoading, isError } = UseDataQuery();
  if (isLoading) {
    return <LoaderComponent />;
  }
  if (isError) {
    return <ErrorMessage />;
  }

  const { active, inactive } = data?.data.data;
  return (
    <>
      {' '}
      <div className='row'>
        <div className='col-md-4 mb-4'>
          <div className='card' style={backStyle}>
            <div className='card-body'>
              <h5 className='card-title'>
                Active Trainees <FaRegMoneyBillAlt style={style} />
              </h5>
              <p className='card-text'>{active}</p>
            </div>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className='card ' style={backStyle}>
            <div className='card-body'>
              <h5 className='card-title'>
                In Active Trainees <BsBookFill style={style} />
              </h5>
              <p className='card-text'>{inactive}</p>
            </div>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className='card' style={backStyle}>
            <div className='card-body'>
              <h4 className='card-title'>
                Total Trainees <AiFillStar style={style} />
              </h4>
              <h5 className='card-text'>{active + inactive}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Trainees;
