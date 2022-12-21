import { Link } from 'react-router-dom';

import { IInstructor } from '@/interfaces/instructor.interface';
import './topInstructor.scss';
function TopInstructors({
  profileImage,
  speciality,
  name,
  title,
  rating,
  country,
  biography,
  _id
}: IInstructor) {
  return (
    <div className='profile-card-4 text-center'>
      <Link to={`instructor/${_id}`}>
        <img
          alt=''
          className='img img-responsive'
          loading='lazy'
          src={profileImage}
          style={{
            objectFit: 'cover',
            height: '17rem',
            width: '100%'
          }}
          onError={e => {
            e.currentTarget.src =
              'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';
          }}
        />
        <div className='profile-content'>
          <div className='profile-name'>
            {name}
            <br />
            <small>{speciality}</small>
          </div>
          <div className='text-primary'>{title}</div>
          <div className='profile-description  text-truncate'>{biography}</div>
          <div className='row'>
            <div className='col-xs-4'>
              <div className='profile-overview'>
                <p>COUNTRY</p>
                <h5 className='text-primary text-truncate'>
                  {country || 'unknown'}
                </h5>
              </div>
            </div>
            <div className='col-xs-4'>
              <div className='profile-overview'>
                <p>RATING</p>
                <h5 className='text-primary'>
                  {rating?.averageRating ? rating?.averageRating : 'un-rated'}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TopInstructors;
