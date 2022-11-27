import Certificates from './Certificates';

function Profile() {
  return (
		<div className="container">
    <div className='row'>
      <div className='col-lg-4'>
        <div className='card mb-4'>
          <div className='card-body text-center'>
            <div
              className={`my-2  mx-auto card-img-top circular_img`}
              data-bs-toggle='tooltip'
            />

            <h5 className='my-3'>{'omar'}</h5>
            <p className='text-muted mb-1'>{'user.job_title'}</p>
            <p className='text-muted mb-4'>{'user.address'}</p>
          </div>
        </div>

        <div className='card mb-4 mb-lg-0'>
          <div className='card-body p-0'>
            <ul className='list-group list-group-flush rounded-3'>
              <li className='list-group-item d-flex justify-content-between align-items-center p-3'>
                <i className='bi bi-telegram icon' />
                <a className='mb-0' href={'user.telegram_link'}>
                  telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='col-lg-8'>
        {/*         <UserData bind:user />
         */}{' '}
        <div className='row'>
          {/*           <Skills  />
           */}{' '}
          <Certificates />
        </div>
        <div className='row'>
          {/*   <Company bind:companies={user.user_company_properties} />
            <Evaluation bind:evaluations={user.user_evaluation} />
   */}{' '}
        </div>
        <div className='row'>
          {/*             <Salary bind:salaries={user.salary} />
           */}{' '}
        </div>
      </div>
    </div>
		</div>
  );
}

export default Profile;
