import { Link } from 'react-router-dom';

import ReportForm from '@/components/footer/ReportForm';
type ErrorMessageProps = {
  errorMessage: string;
  link: string;
  linkTitle: string;
};

function ErrorMessage({
  errorMessage = '',
  link = '',
  linkTitle = ''
}: Partial<ErrorMessageProps>) {
  return (
    <div className='alert alert-danger container mt-3' role='alert'>
      {errorMessage == '' && (
        <>
          <span>
            Sorry for the Inconvenience , Please report this Problem through
            this
          </span>
          <span
            style={{
              fontWeight: 'bold'
            }}
          >
            <ReportForm />
          </span>
        </>
      )}
      {errorMessage?.length > 0 && errorMessage}
      {link?.length > 0 && (
        <Link className='alert-link' to={link}>
          &nbsp; {linkTitle}
        </Link>
      )}
    </div>
  );
}

export default ErrorMessage;
