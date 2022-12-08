/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './InstructorMainSection.module.scss';

export default function InstructorMainSection() {
  const [myArray, setMyArray] = useState([1, 0, 0, 0]);

  return (
    <div className={styles.hero}>
      <div style={{ marginLeft: '15%', marginTop: '2rem' }}>
        <div className={styles.mylearning}>Instructor Dashboard</div>
        <Link to='add-course'>
          <button className={styles.add_course} type='submit'>
            Create Course
          </button>
        </Link>
        <div className={styles.list}>
          <div style={{ marginRight: '3.2rem' }}>
            <div
              className={styles.listitem}
              onClick={() => setMyArray([1, 0, 0, 0])}
            >
              My Courses
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
            <Link to={'/instructor/rating-review'}>
              <div
                className={styles.listitem}
                onClick={() => setMyArray([0, 1, 0, 0])}
              >
                Rating and Reviews
              </div>
            </Link>
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
              onClick={() => setMyArray([0, 0, 1, 0])}
            >
              Q&A
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
          <div style={{ marginRight: '3.2rem' }}>
            <Link to={'/instructor/edit-profile'}>
              <div
                className={styles.listitem}
                onClick={() => setMyArray([0, 0, 0, 1])}
              >
                Edit Profile
              </div>
            </Link>
            {myArray.at(3) == 1 && (
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
  );
}
