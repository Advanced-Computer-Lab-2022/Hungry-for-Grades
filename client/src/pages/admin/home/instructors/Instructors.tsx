import { HiStatusOffline, HiStatusOnline } from 'react-icons/hi';


import { GiTeacher } from 'react-icons/gi';

import styles from '../card.module.scss';

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
          <div className={`${styles.card ?? ''} card`} style={backStyle}>
            <div className='card-body'>
              <h4 className='card-title'>
                Active Instructors <HiStatusOnline style={style} />
              </h4>
              <h5 className='card-text'>{active}</h5>
            </div>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className={`${styles.card ?? ''} card`} style={backStyle}>
            <div className='card-body'>
              <h4 className='card-title'>
                In Active Instructors <HiStatusOffline style={style} />
              </h4>
              <h5 className='card-text'>{inactive}</h5>
            </div>
          </div>
        </div>
        <div className='col-md-4 mb-4'>
          <div className={`${styles.card ?? ''} card`} style={backStyle}>
            <div className='card-body'>
              <h4 className='card-title'>
                Total Instructors <GiTeacher style={style} />
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
