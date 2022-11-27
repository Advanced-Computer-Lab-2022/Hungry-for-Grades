import { Link } from 'react-router-dom';
type ErrorMessageProps = {
  errorMessage: string;
};

function ErrorMessage({ errorMessage = '' }: Partial<ErrorMessageProps>) {
  if (errorMessage)
    return <div className='text-danger text-center'>{errorMessage} </div>;
  return (
    <div className='alert alert-danger' role='alert'>
      Sorry for the Inconvenience , Please report this Problem through this
      <Link className='alert-link' to='/report'>
        Link
      </Link>
    </div>
  );
}

export default ErrorMessage;
