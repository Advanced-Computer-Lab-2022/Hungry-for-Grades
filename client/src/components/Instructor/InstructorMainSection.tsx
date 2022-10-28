import { Nav } from 'react-bootstrap';

import styles from './InstructorMainSection.module.css';

export default function InstructorMainSection() {
  return (
    <div style={{ width: '100%', backgroundColor: '#112D4E' }}>
      <div
        className='container-lg'
        style={{
          width: '100%',
          backgroundColor: '#112D4E',
          alignItems: 'center'
        }}
      >
        <br />
        <br />
        <div
          className='d-flex justify-content-between'
          style={{ alignItems: 'center' }}
        >
          <span
            style={{ color: '#F9F7F7', fontSize: '1.7rem', fontWeight: '350' }}
          >
            Instructor Dashboard
          </span>
          <button
            style={{
              backgroundColor: '#F9F7F7',
              color: '#3F72AF',
              borderColor: '#3F72AF',
              borderWidth: '1.5px',
              width: 'auto'
            }}
            type='button'
          >
            Create new Course
          </button>
        </div>
        <br />

        <Nav defaultActiveKey='/home' variant='pills'>
          <Nav.Item>
            <Nav.Link href='/home'>
              <span className={styles.dashhero}>Courses </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='/Instructor/Performance'>
              <span className={styles.dashhero}>Performance </span>{' '}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='/Instructor/Q&A'>
              {' '}
              <span className={styles.dashhero}>Q&A </span>{' '}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className={styles.dashhero}
              eventKey='/Instructor/Assignments'
            >
              <span className={styles.dashhero}>Assignments </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}
