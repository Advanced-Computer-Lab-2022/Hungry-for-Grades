import { Link } from 'react-router-dom';

import InsuctorCard from './InstructorCard';

import useTopInstructorQuery from './useTopInstructorQuery';

import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import Pagination from '@/components/pagination/Pagination';

function TopInstructorsSection() {
  const { isLoading, isError, data, activePage, setActivePage } =
    useTopInstructorQuery();

  console.log('data');
  console.log(data);
  return (
    <section className='container'>
      <h2 className='text-dark text-left mb-4'>Top rated instructors</h2>
      {isLoading && <LoaderCards numberOfCards={3} />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && data && data?.data?.totalResults > 0 && (
        <div style={{
					zIndex:'9999999'
				}}>
          <div className='row'>
            {data.data.data.map(instructor => {
              return (
                <div key={instructor._id} className='col-12 col-md-6 col-lg-4'>
                  <InsuctorCard {...instructor} />
                </div>
              );
            })}
          </div>
          <Pagination
            activePage={activePage}
            pages={data?.data?.totalPages}
            setActivePage={setActivePage}
          />
        </div>
      )}


    </section>
  );
}

export default TopInstructorsSection;
