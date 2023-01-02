import './featureSection.scss';

function FeatureSection() {
  return (
    <>
      <section className='section' id='about'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
              <div className='features-item'>
                <div className='features-icon'>
                  <h2
                    style={{
                      zIndex: '-1'
                    }}
                  >
                    01
                  </h2>
                  <img alt='' src='/features-icon-1.png' />
                  <h4
                    style={{
                      zIndex: 99999
                    }}
                  >
                    Trendy Courses
                  </h4>
                  <p>
                    Education is the key to all the locked doors of the unknown.
                    Find Out Your Favorite courses
                  </p>
                  <a className='main-button' href='#rated-courses'>
                    Read More
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
              <div className='features-item'>
                <div className='features-icon'>
                  <h2>02</h2>
                  <img alt='' src='/features-icon-2.png' />
                  <h4>Top Rated Instructors</h4>
                  <p>Get to see our Top Instructors</p>
                  <a className='main-button' href='#rated-instructors'>
                    Discover More
                  </a>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-md-6 col-sm-12 col-xs-12'>
              <div className='features-item'>
                <div className='features-icon'>
                  <h2>03</h2>
                  <img alt='' src='/features-icon-3.png' />
                  <h4>Signup to our Newsletter</h4>
                  <p>Get to know about our latest courses and updates</p>
                  <a className='main-button' href='#newsletter'>
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className='left-image-decor'
        style={{
          zIndex: '-1'
        }}
      />
    </>
  );
}

export default FeatureSection;
