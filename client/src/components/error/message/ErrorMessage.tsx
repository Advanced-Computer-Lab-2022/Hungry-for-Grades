import { Link } from 'react-router-dom';
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
  /*if (errorMessage)
    return <div className='text-danger text-center'>{errorMessage} </div>;*/
  return (
    <div className='alert alert-danger container mt-3' role='alert'>
      {errorMessage == '' && (
        <>
          <span>
            Sorry for the Inconvenience , Please report this Problem through
            this
          </span>
          <Link className='alert-link' to='/report'>
            Link
          </Link>
        </>
      )}
      {errorMessage?.length > 0 && errorMessage}
      {link?.length > 0 && (
        <Link className='alert-link' to={link}>
          {linkTitle}
        </Link>
      )}
    </div>
  );
}

export default ErrorMessage;
