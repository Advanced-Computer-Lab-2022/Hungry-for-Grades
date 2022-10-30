import { v4 as uuid } from 'uuid';

import LoaderCard from './LoaderCard';
function LoaderCards(props: { numberOfCards: number }) {
  const { numberOfCards } = props;
  return (
    <div className='row mb-5'>
      {Array.from(Array(numberOfCards).keys()).map(() => (
        <div key={uuid()} className='col-12 col-md-6 col-lg-4'>
          <LoaderCard />
        </div>
      ))}
    </div>
  );
}

export default LoaderCards;
