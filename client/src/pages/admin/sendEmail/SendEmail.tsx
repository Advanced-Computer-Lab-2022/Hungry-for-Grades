import { useState } from 'react';

import Select from 'react-select';

import SendEmailModal from './SendEmailModal';
import { type UserSearchFiltersType } from './types';
import useUserEmailsQuery from './useUserEmailsQuery';

import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import Pagination from '@/components/pagination/Pagination';

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'trainee', label: 'Trainee' },
  { value: 'guest', label: 'Guest' }
];

function SendEmail() {
  // table of users emails to send emails
  const [usersFilter, setUserFilters] = useState<UserSearchFiltersType>({
    email: '',
    role: '',
    sort: 0
  });
  const { data, isLoading, isError, activePage, setActivePage } =
    useUserEmailsQuery(usersFilter);

  return (
    <div
      className='py-4'
      style={{
        backgroundColor: '#f8f9fa'
      }}
    >
      <div className='container'>
        <div className='table-responsive custom-table-responsive'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
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
            <div className='me-3 w-50'>
              <label className='form-label' htmlFor='role'>
                Role
              </label>
              <Select
                id='role'
                options={roles}
                placeholder='Role'
                value={roles.find(role => {
                  return usersFilter.role === role.value;
                })}
                onChange={function (option) {
                  if (option)
                    setUserFilters({ ...usersFilter, role: option.value });
                }}
              />
            </div>
          </div>
          {!isLoading && !isError && data && (
            <>
              <table className='table align-middle mb-0 bg-light table-striped table-hover'>
                <thead className='bg-light'>
                  <tr
                    style={{
                      filter: 'drop-shadow(0 0 0.1rem #eee)',
                      borderRadius: '0.25rem',
                      boxShadow: 'rgba(0, 0, 0, 0.35) 0 5px 15px'
                    }}
                  >
                    <th>&nbsp; Email</th>
                    <th>Role</th>
                    <th>Send Email</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.data.map(user => (
                    <>
                      <tr className='spacer'>
                        <td colSpan='100' />
                      </tr>

                      <tr
                        key={user.email}
                        className='my-4'
                        style={{
                          filter: 'drop-shadow(0 0 0.1rem #eee)',
                          borderRadius: '0.25rem',
                          boxShadow: 'rgba(0, 0, 0, 0.35) 0 5px 15px'
                        }}
                      >
                        <td className='pl-3'> &nbsp; {user.email}</td>
                        <td>{user.role}</td>
                        <td className='pt-3'>
                          <SendEmailModal email={user.email} />
                        </td>
                      </tr>
                    </>
                  ))}
                  {data.data.data.length === 0 && (
                    <tr>
                      <td className='text-center' colSpan={3}>
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {data?.data?.totalResults > 0 && (
                <Pagination
                  activePage={activePage}
                  pages={data?.data?.totalPages}
                  setActivePage={setActivePage}
                />
              )}
            </>
          )}
        </div>
        {isError && <ErrorMessage />}
        {isLoading && <LoaderComponent />}
      </div>
    </div>
  );
}

export default SendEmail;
