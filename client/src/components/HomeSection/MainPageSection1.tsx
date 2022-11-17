import { Container, Row, Col } from 'react-bootstrap';

import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import styles from './MainPageSection1.module.css';

export default function MainPageSection1() {
  return (
    <div style={{ backgroundColor: '#F9F7F7' }}>
      <Container className='bg-light'>
        <Row>
          <Col
            lg='6'
            md='6'
            style={{ marginTop: 'auto', marginBottom: 'auto' }}
          >
            <div className={styles.MainSectionHome__content}>
              <h2 className='mb-4 MainSection__title'>
                Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule
              </h2>
              <p className='mb-4'>
                The Best place to learn anything you want
                <br /> There exists a vaariety of all fields and all courses
                <br /> Start Learning now
              </p>
            </div>
            <div className={styles.search}>
              <input
                placeholder='Search for anything ...'
                style={{ color: '#3F72AF' }}
                type='text'
              />
              <Link to='/courses'>
                <BsSearch
                  style={{
                    fontSize: '1.5rem',
                    color: '#112D4E',
                    cursor: 'pointer'
                  }}
                />
              </Link>
            </div>
          </Col>
          <Col lg='6' md='6'>
            <img
              alt='Girl Reading in a Book'
              className='w-100 MainSection__img'
              src='https://www.bollyinside.com/articles/wp-content/uploads/sites/4/2022/05/Best-Educational-Websites.jpg'
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
