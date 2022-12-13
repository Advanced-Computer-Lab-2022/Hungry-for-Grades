import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import '../mainSection/mainSection.scss';
/* const imageArray = [
  {
    image: 'https://picsum.photos/id/0/5616/3744',
    title: '學長歸來,MUST國際音樂創作營開箱文',
    time: '2019-10-26'
  },
  {
    image: 'https://picsum.photos/id/10/2500/1667',
    title: '學姊歸來,爽爽開學去',
    time: '2019-10-26'
  },
  {
    image: 'https://picsum.photos/id/1000/5626/3635',
    title: '學弟歸來,開心吃東西去',
    time: '2019-10-26'
  },
  {
    image: 'https://picsum.photos/id/1003/1181/1772',
    title: '老師歸來,悲傷挨罵去',
    time: '2019-10-26'
  }
]; */
function Sponsers() {
  return (
    <section className='container'>
      <h2 className='heading text-left text-primary'>Our Sponsers</h2>

      <section className='slider'>
        <div
          className='carousel slide'
          data-bs-ride='carousel'
          id='carouselExampleCaptions'
        >
          <div className='carousel-inner '>
            <div className='carousel-item active vh-100'>
              <img
                alt='slideshow-1'
                className='d-block vh-40  w-100 img1 img-fluid'
                src='https://learning.linkedin.com/content/dam/me/business/en-us/amp/learning-solutions/images/lls-homepage-2021/bg/01-dsk-b02-v01.jpg/jcr:content/renditions/01-dsk-b02-v01-2x.jpg'
                style={{
                  height: '50%',
                  width: '100%'
                }}
              />
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
    </section>
  );
}

export default Sponsers;
