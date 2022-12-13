import { Link } from 'react-router-dom';

import InsuctorCard from './InstructorCard';

import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import ErrorMessage from '@/components/error/message/ErrorMessage';

function TopInstructorsSection() {
  const isLoading = false;
  const isError = false;

  return (
    <section className='container'>
      <h2 className='text-dark text-left mb-4'>Top rated instructors</h2>
      {isLoading && <LoaderCards numberOfCards={3} />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <div className='row'>
          <div className='col-12 col-md-6 col-lg-4'>
            <InsuctorCard />
          </div>

          <div className='col-12 col-md-6 col-lg-4'>
            <InsuctorCard />
          </div>

          <div className='col-12 col-md-6 col-lg-4'>
            <InsuctorCard />
          </div>
        </div>
      )}
      <p className='text-end mt-1'>
        <Link to='/courses'>View all Instructors</Link>
      </p>
    </section>
  );
}

export default TopInstructorsSection;
