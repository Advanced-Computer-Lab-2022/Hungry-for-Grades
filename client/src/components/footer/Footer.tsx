import { Link } from 'react-router-dom';

import styles from './footer.module.scss';

function Footer() {
  return (
    <footer
      className={`${
        styles['footer-design'] ?? ''
      } bg-light text-center container-fluid`}
    >
      <img alt='canadian chamber of commerce logo' src='/logo.png' />
      <br />
      <div className={`${styles['link-container'] ?? ''}`}>
        <ul className='row'>
          <li className='col'>
            <Link className='text-dark' to='/'>
              Home
            </Link>
          </li>
          <li className='col'>
            <Link className='text-dark' to='/'>
              Features
            </Link>
          </li>
          <li className='col'>
            <Link className='text-dark' to='/'>
              Pricing
            </Link>
          </li>
          <li className='col'>
            <Link className='text-dark' to='/'>
              FAQs
            </Link>
          </li>
          <li className='col'>
            <Link className='text-dark' to='/'>
              About
            </Link>
          </li>
        </ul>
      </div>
      <hr className='text-dark' />
      <p className='text-dark pb-3'>
        © 2022 Canadian Chamber of Commerce, Inc.
      </p>
    </footer>
  );
}

export default Footer;
