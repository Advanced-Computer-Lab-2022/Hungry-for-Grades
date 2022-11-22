import { Link } from 'react-router-dom';
import './error.scss';
type ErrorProps = {
  type: number;
};
function Error({ type }: ErrorProps) {
  return (
    <section className='wrapper'>
      <div className='container'>
        <div className='scene' data-hover-only='false' id='scene'>
          <div className='circle' data-depth='1.2' />

          <div className='one' data-depth='0.9'>
            <div className='content'>
              <span className='piece' />
              <span className='piece' />
              <span className='piece' />
            </div>
          </div>

          <div className='two' data-depth='0.60'>
            <div className='content'>
              <span className='piece' />
              <span className='piece' />
              <span className='piece' />
            </div>
          </div>

          <div className='three' data-depth='0.40'>
            <div className='content'>
              <span className='piece' />
              <span className='piece' />
              <span className='piece' />
            </div>
          </div>

          <p className='p404' data-depth='0.50'>
            {type}
          </p>
          <p className='p404' data-depth='0.10'>
            {type}
          </p>
        </div>

        <div className='text'>
          <article>
            <p>
              {type === 400 &&
                'Sorry,This page isn&apos;t working at the moment.'}
              {type === 404 && 'Uh oh! Looks like you got lost.'}
              {type === 402 && 'You are not Authorized'}
              <br />
              Go back to the homepage if you dare!
            </p>

            <Link to='/'>
              <button type='button'>Home Page</button>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Error;
