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
            <a className='text-dark' href='/'>
              Home
            </a>
          </li>
          <li className='col'>
            <a className='text-dark' href='/'>
              Features
            </a>
          </li>
          <li className='col'>
            <a className='text-dark' href='/'>
              Pricing
            </a>
          </li>
          <li className='col'>
            <a className='text-dark' href='/'>
              FAQs
            </a>
          </li>
          <li className='col'>
            <a className='text-dark' href='/'>
              About
            </a>
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
