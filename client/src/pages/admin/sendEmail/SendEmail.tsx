import { useState } from 'react';

import SendEmailModal from './SendEmailModal';
import { type UserSearchFiltersType } from './types';

type UserType = {
  email: string;
  role: string;
};
function SendEmail() {
  // table of users emails to send emails
  const users: UserType[] = [{
	email: '',
	role: 'admin'

  }];
  const [usersFilter, setUserFilters] = useState<UserSearchFiltersType>({
    email: '',
    role: '',
    sort: 0
  });

  return (
	<div className='py-4'
	style={{
		backgroundColor: '#f8f9fa'
	}}
	>
	<div
	  className='container'

	>
    <div className='table-responsive'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div className='d-flex align-items-center'>
          <div className='me-3'>
            <label className='form-label' htmlFor='email'>
              Email
            </label>
            <input
              className='form-control'
              id='email'
              placeholder='Email'
              type='text'
              value={usersFilter.email}
              onChange={e =>
                setUserFilters({ ...usersFilter, email: e.target.value })
              }
            />
          </div>
          <div className='me-3'>
            <label className='form-label' htmlFor='role'>
              Role
            </label>
            <input
              className='form-control'
              id='role'
              placeholder='Role'
              type='text'
              value={usersFilter.role}
              onChange={e =>
                setUserFilters({ ...usersFilter, role: e.target.value })
              }
            />
          </div>

        </div>
      </div>

      <table className='table align-middle mb-0 bg-light table-striped'>
        <thead className='bg-light'>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Send Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <SendEmailModal email={user.email} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
	</div>
	</div>
  );
}

export default SendEmail;
