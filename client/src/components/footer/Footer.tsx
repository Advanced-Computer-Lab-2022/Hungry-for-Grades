import './footer.scss';

function Footer() {
  return (
    <footer className='bg-dark text-center container-fluid'>
      <img alt='canadian chamber of commerce logo' src='/logo.png' />
      <br />
      <div className='link-container'>
        <ul className='row'>
          <li className='col'>
            <a className='text-light' href='/'>
              Home
            </a>
          </li>
          <li className='col'>
            <a className='text-light' href='/'>
              Features
            </a>
          </li>
          <li className='col'>
            <a className='text-light' href='/'>
              Pricing
            </a>
          </li>
          <li className='col'>
            <a className='text-light' href='/'>
              FAQs
            </a>
          </li>
          <li className='col'>
            <a className='text-light' href='/'>
              About
            </a>
          </li>
        </ul>
      </div>
      <hr className='text-light' />
      <p className='text-light'>© 2022 Canadian Chamber of Commerce, Inc.</p>
    </footer>
  );
}

export default Footer;
