import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import './mainSection.scss';
export default function MainSection() {
  return (
    <>
      <section className='slider '>
        <div
          className='carousel slide'
          data-bs-ride='carousel'
          id='carouselExampleCaptions'
        >
          <div className='carousel-inner '>
            <div className='carousel-item active vh-100'>
              <img
                alt='slideshow-1'
                className='d-block  w-100 img1 img-fluid'
                src='https://learning.linkedin.com/content/dam/me/business/en-us/amp/learning-solutions/images/lls-homepage-2021/bg/01-dsk-b02-v01.jpg/jcr:content/renditions/01-dsk-b02-v01-2x.jpg'
                style={{
                  height: '50%',
                  width: '100%'
                }}
              />
              <div className='carousel-caption  d-sm-none d-lg-block  position-absolute'>
                <h3 className='text-black'>Focused on strategy</h3>
                <h4 className='text-primary'>To Reach Your Goal Faster</h4>
                <div className='d-flex justify-content-start mt-3'>
                  <Link className='btn btn-primary btn-lg' to={'courses'}>
                    courses
                  </Link>
                </div>
              </div>
            </div>
            <div className='carousel-item vh-100  '>
              <img
                alt='slideshow-2'
                className='d-block w-100 img2'
                src='https://s.udemycdn.com/teaching/billboard-mobile-v3.jpg'
                style={{
                  height: '50%',
                  width: '100%'
                }}
              />
              <div className='carousel-caption d-md-block position-absolute text-black'>
                <h3> Take your career to the next level</h3>
                <h4 className='text-primary'>
                  Access to a collection of top-rated courses in tech, business,
                  and more.
                </h4>
              </div>
            </div>
            <div className='carousel-item vh-100'>
              <img
                alt='slideshow-3'
                className='d-block w-100 img-fluid img3'
                src='https://s.udemycdn.com/consumer-subscription/pillars/pillars-1-desktop-v2.jpg'
                style={{
                  height: '50%',
                  width: '100%'
                }}
              />

              <div className='carousel-caption  d-md-block position-absolute '>
                <h3 className='text-black'>
                  Cutting-edge skills to keep you sharp
                </h3>
                <h4 className='text-primary'>
                  Learn confidently with up-to-date courses
                </h4>
              </div>
            </div>
          </div>
          <div>
            <button
              className='carousel-control-prev'
              data-bs-slide='prev'
              data-bs-target='#carouselExampleCaptions'
              style={{
                zIndex: 999,
                top: '35%'
              }}
              type='button'
            >
              <BiChevronLeft className='icon' />
              <span className='visually-hidden'>Previous</span>
              <div className='lay' />
            </button>
            <button
              className='carousel-control-next'
              data-bs-slide='next'
              data-bs-target='#carouselExampleCaptions'
              style={{
                zIndex: 999,
                top: '40%'
              }}
              type='button'
            >
              <BiChevronRight
                className='icon'
                style={{
                  top: '-30%'
                }}
              />
              <span className='visually-hidden'>Next</span>
              <div className='lay' />
            </button>
          </div>
        </div>
      </section>
      {/*      <div
        className='fluid-container'
        style={{
          width: '100%',
          height: '32rem',
          background: '#EFF0F6'
        }}
      >
        <img
          alt='CanCham'
          className={`${styles.img_item ?? ''} img-fluid `}
          loading='lazy'
          src='https://learning.linkedin.com/content/dam/me/business/en-us/amp/learning-solutions/images/lls-homepage-2021/bg/01-dsk-b02-v01.jpg/jcr:content/renditions/01-dsk-b02-v01-2x.jpg'
        />

      </div> */}
    </>
  );
}
