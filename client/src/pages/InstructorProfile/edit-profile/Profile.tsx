import { Outlet } from 'react-router-dom';

import Accounts from './pages/Accounts';
import EditProfile from './pages/EditProfile';
import Security from './pages/Security';

import styles from './profile.module.scss';

import useMultistepForm from '@/hooks/useMultistepForm';

export default function Profile() {
  const { currentStepIndex, goTo, step, titles } = useMultistepForm(
    [
      <div key='edit-profile'>
        <EditProfile />
      </div>,
      <div key='security'>
        <Security />
      </div>,
      <div key='accounts'>
        <Accounts />
      </div>
    ],
    ['Profile', 'Security', 'Accounts'],
    ['']
  );

  return (
    <>
      <div className='py-5' style={{ backgroundColor: '#F8F9FA' }}>
        <div className='container-xl'>
          <div className='row gx-3'>
            <div className='col-xxl-1 col-2'>
              <div className='d-flex flex-column align-items-end'>
                {titles?.map((title, index) => (
                  <button
                    key={title}
                    className={`${styles.item__list || ''} ${
                      currentStepIndex === index
                        ? styles.active__link || ''
                        : ''
                    }`}
                    type='button'
                    onClick={function go() {
                      goTo(index);
                    }}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
            <div className='col-10 px-3 '>{step}</div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
