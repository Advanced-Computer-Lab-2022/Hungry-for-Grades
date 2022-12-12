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
                    Trend Analysis
                  </h4>
                  <p>
                    Curabitur pulvinar vel odio sed sagittis. Nam maximus ex
                    diam, nec consectetur diam.
                  </p>
                  <a className='main-button' href='#testimonials'>
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
                  <h4>Site Optimization</h4>
                  <p>
                    Curabitur pulvinar vel odio sed sagittis. Nam maximus ex
                    diam, nec consectetur diam.
                  </p>
                  <a className='main-button' href='#testimonials'>
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
                  <h4>Email Design</h4>
                  <p>
                    Curabitur pulvinar vel odio sed sagittis. Nam maximus ex
                    diam, nec consectetur diam.
                  </p>
                  <a className='main-button' href='#testimonials'>
                    More Detail
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='left-image-decor' />
    </>
  );
}

export default FeatureSection;
