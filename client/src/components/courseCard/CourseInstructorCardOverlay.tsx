import StarRatings from 'react-star-ratings';
import './courseCardOverlay.scss';

function CourseCardOverlay() {
  return (
    <div className='overlay__container' id='button-tooltip-2'>
      <div className='overlay__content'>
        <div className='overlay__content__header'>
          <h4 className='overlay__content__header__title'>Course Title</h4>
          <div className='overlay__content__header__rating'>
            <span className='overlay__content__header__rating__number'>
              4.5
            </span>
            <span className='overlay__content__header__rating__stars'>
              <StarRatings
                numberOfStars={5}
                rating={4.5}
                starDimension='20px'
                starRatedColor='#FFD700'
                starSpacing='0px'
              />
            </span>
          </div>
        </div>
        <div className='overlay__content__body'>
          <div className='overlay__content__body__instructors'>
            <span className='overlay__content__body__instructors__label'>
              Instructors:
            </span>
            <span className='overlay__content__body__instructors__value'>
              Instructor 1, Instructor 2
            </span>
          </div>
          <div className='overlay__content__body__duration'>
            <span className='overlay__content__body__duration__label'>
              Duration:
            </span>
            <span className='overlay__content__body__duration__value'>4h</span>
          </div>
          <div className='overlay__content__body__price'>
            <span className='overlay__content__body__price__label'>Price:</span>
            <span className='overlay__content__body__price__value'>$100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCardOverlay;
