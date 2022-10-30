import './topInstructor.scss';
function TopInstructors() {
  return (
    <div className='profile-card-4 text-center'>
      <img
        alt=''
        className='img img-responsive'
        src='http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg'
      />
      <div className='profile-content'>
        <div className='profile-name'>
          John Doe
          <p>@johndoedesigner</p>
        </div>
        <div className='profile-description'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor.
        </div>
        <div className='row'>
          <div className='col-xs-4'>
            <div className='profile-overview'>
              <p>TWEETS</p>
              <h4>1300</h4>
            </div>
          </div>
          <div className='col-xs-4'>
            <div className='profile-overview'>
              <p>FOLLOWERS</p>
              <h4>250</h4>
            </div>
          </div>
          <div className='col-xs-4'>
            <div className='profile-overview'>
              <p>FOLLOWING</p>
              <h4>168</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopInstructors;
