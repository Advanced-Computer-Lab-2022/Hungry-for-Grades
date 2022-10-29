import {
	FaApple,
	FaFacebookF,
	FaGooglePlay,
	FaInstagram,
	FaLinkedinIn,
	FaTwitter,
	FaYoutube
} from 'react-icons/fa';
function Footer() {
  const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME;
  const COMPANY_ADDRESS = import.meta.env.VITE_COMPANY_ADDRESS;
  const COMPANY_PHONE = import.meta.env.VITE_COMPANY_PHONE;
  const COMPANY_EMAIL = import.meta.env.VITE_COMPANY_EMAIL;
  const COMPANY_WEBSITE = import.meta.env.VITE_COMPANY_WEBSITE;
  const COMPANY_FACEBOOK = import.meta.env.VITE_COMPANY_FACEBOOK;
  const COMPANY_TWITTER = import.meta.env.VITE_COMPANY_TWITTER;
  const COMPANY_INSTAGRAM = import.meta.env.VITE_COMPANY_INSTAGRAM;
  const COMPANY_YOUTUBE = import.meta.env.VITE_COMPANY_YOUTUBE;
  const COMPANY_LINKEDIN = import.meta.env.VITE_COMPANY_LINKEDIN;
  const COMPANY_GOOGLE_PLAY = import.meta.env.VITE_COMPANY_GOOGLE_PLAY;
  const COMPANY_APP_STORE = import.meta.env.VITE_COMPANY_APP_STORE;
  const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;

  return (
    <div className='container-fluid bg-dark mt-5 mb-0'>
      <footer className='text-center  text-lg-start text-white'>
        <section className='d-flex justify-content-between p-4 bg-primary'>
          <div className='me-5'>
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a
              className='text-white me-4'
              href={COMPANY_FACEBOOK}
              rel='noopener noreferrer'
              target='_blank'
            >
              <FaFacebookF />
            </a>
            <a
              className='text-white me-4'
              href={COMPANY_TWITTER}
              rel='noopener noreferrer'
              target='_blank'
            >
              <FaTwitter />
            </a>

            <a
              className='text-white me-4'
              href={COMPANY_LINKEDIN}
              rel='noopener noreferrer'
              target='_blank'
            >
              <FaLinkedinIn />
            </a>
            <a
              className='text-white me-4'
              href={COMPANY_INSTAGRAM}
              rel='noopener noreferrer'
              target='_blank'
            >
              <FaInstagram />
            </a>
            <a
              className='text-white me-4'
              href={COMPANY_YOUTUBE}
              rel='noopener noreferrer'
              target='_blank'
            >
              <FaYoutube />
            </a>
            <a
              className='text-white me-4'
              href={COMPANY_GOOGLE_PLAY}
              rel='noopener noreferrer'
              target='_blank'
            >
              <FaGooglePlay />
            </a>
            <a
              className='text-white me-4'
              href={COMPANY_APP_STORE}
              rel='noopener noreferrer'
              target='_blank'
            >
              <FaApple />
            </a>
          </div>
        </section>

        <section className=''>
          <div className='container text-center text-md-start mt-5'>
            <div className='row mt-3'>
              <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold'>
                  <a
                    className='text-white me-4'
                    href={COMPANY_WEBSITE}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <img
                      alt='logo'
                      className='img-fluid'
                      src={COMPANY_LOGO}
                      style={{
                        width: '100%',
                        height: '100%',
                        fill: 'white',
                        filter: 'contrast(1.5)'
                      }}
                    />
                  </a>
                </h6>
                <hr className='mb-4 mt-0 d-inline-block mx-auto' />
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>

              <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold'>Products</h6>
                <hr className='mb-4 mt-0 d-inline-block mx-auto' />
                <p>
                  <a className='text-white' href='#!'>
                    MDBootstrap
                  </a>
                </p>
                <p>
                  <a className='text-white' href='#!'>
                    MDWordPress
                  </a>
                </p>
                <p>
                  <a className='text-white' href='#!'>
                    BrandFlow
                  </a>
                </p>
                <p>
                  <a className='text-white' href='#!'>
                    Bootstrap Angular
                  </a>
                </p>
              </div>

              <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold'>Useful links</h6>
                <hr className='mb-4 mt-0 d-inline-block mx-auto' />
                <p>
                  <a className='text-white' href='#!'>
                    Your Account
                  </a>
                </p>
                <p>
                  <a className='text-white' href='#!'>
                    Become an Affiliate
                  </a>
                </p>
                <p>
                  <a className='text-white' href='#!'>
                    Shipping Rates
                  </a>
                </p>
                <p>
                  <a className='text-white' href='#!'>
                    Help
                  </a>
                </p>
              </div>

              <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold'>Contact</h6>
                <hr className='mb-4 mt-0 d-inline-block mx-auto' />
                <p>
                  <i className='fas fa-home mr-3' />
                  {COMPANY_ADDRESS}
                </p>
                <p>
                  <i className='fas fa-envelope mr-3' /> {COMPANY_EMAIL}
                </p>
                <p>
                  <i className='fas fa-phone mr-3' />
                  <a
                    className='text-white me-4'
                    href={`tel:${COMPANY_PHONE}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    {COMPANY_PHONE}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className='text-center p-3'>
          © {new Date().getFullYear()} Copyright &middot;{' '}
          <a className='text-white' href={COMPANY_WEBSITE}>
            {COMPANY_NAME}
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
