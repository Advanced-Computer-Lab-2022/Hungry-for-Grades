/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

import styles from './StudentPage.module.scss';

import MyCourses from './MyCourses';

export default function StudentPage() {
  const [myArray, setMyArray] = useState([1, 0, 0]);

  return (
    <div>
      <div className={styles.hero}>
        <div style={{ marginLeft: '15%', marginTop: '6%' }}>
          <div className={styles.mylearning}>My learning</div>
          <div className={styles.list}>
            <div style={{ marginRight: '3.2rem' }}>
              <div
                className={styles.listitem}
                onClick={() => setMyArray([1, 0, 0])}
              >
                All courses
              </div>
              {myArray.at(0) == 1 && (
                <div
                  style={{
                    width: '100%',
                    backgroundColor: '#d1d7dc',
                    height: '0.4rem'
                  }}
                />
              )}
            </div>
            <div style={{ marginRight: '3.2rem' }}>
              <div
                className={styles.listitem}
                onClick={() => setMyArray([0, 1, 0])}
              >
                Wishlist
              </div>
              {myArray.at(1) == 1 && (
                <div
                  style={{
                    width: '100%',
                    backgroundColor: '#d1d7dc',
                    height: '0.4rem'
                  }}
                />
              )}
            </div>
            <div style={{ marginRight: '3.2rem' }}>
              <div
                className={styles.listitem}
                onClick={() => setMyArray([0, 0, 1])}
              >
                My Cart
              </div>
              {myArray.at(2) == 1 && (
                <div
                  style={{
                    width: '100%',
                    backgroundColor: '#d1d7dc',
                    height: '0.4rem'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {myArray.at(0) == 1 && <MyCourses />}
      {myArray.at(1) == 1 && <span>Helllo</span>}
      {myArray.at(2) == 1 && <span>Yasser</span>}
    </div>
  );
}
