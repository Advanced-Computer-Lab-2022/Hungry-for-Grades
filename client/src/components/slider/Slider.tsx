// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/swiper.min.css';

// import required modules for swiper
import { Autoplay, EffectCoverflow, Pagination } from 'swiper';

import { v4 as uuidv4 } from 'uuid';

// type
import LoaderCard from '../loader/loaderCard/LoaderCard';

import { SliderProps } from './types';

function Slider(props: SliderProps) {
  const { children, isLoading } = props;
  return (
    <Swiper
      centeredSlides
      grabCursor
      pagination
      autoplay={{
        delay: 1000,
        disableOnInteraction: true
      }}
      className='mySwiper'
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      }}
      effect={'coverflow'}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      slidesPerView={'auto'}
    >
      {isLoading && (
        <div>
          <SwiperSlide key='1'>
            <div className='skill__item'>
              <LoaderCard
                className='client__review'
                img={
                  <div>
                    <img alt='OSA' className='square-img' />
                  </div>
                }
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key='2'>
            <div className='skill__item'>
              <LoaderCard
                className='client__review'
                img={
                  <div>
                    <img alt='OSA' className='square-img' />
                  </div>
                }
              />
            </div>
          </SwiperSlide>
        </div>
      )}
      {!isLoading &&
        children?.map(child => {
          return <SwiperSlide key={uuidv4()}>{child} </SwiperSlide>;
        })}
    </Swiper>
  );
}

export default Slider;
