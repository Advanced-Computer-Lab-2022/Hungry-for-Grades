import { v4 as uuid } from 'uuid';

import { AiOutlineFilter } from 'react-icons/ai';

import styles from './SearchSection.module.scss';

import CategoryFilter from './filtersInput/Category&SubFilter';
import PaidFreeFilter from './filtersInput/Paid&FreeFilter';
import { type SearchSectionProps } from './types';

function SearchSection(props: SearchSectionProps) {
  const id = uuid();
  const { setSelectedFilters, selectedFilters } = props;

  return (
    <div className={`container-fluid ${styles.container ?? ''}`}>
      <h1 className={`${styles.heading ?? ''}`}>Search for Courses</h1>
      <h2 className={`${styles.subheading ?? ''}`}>subheading</h2>
      <div
        className='container p-5 d-flex flex-row justify-content-between'
        id={id}
      >
        <div className='input-group '>
          <input
            aria-describedby='search-addon'
            aria-label='Search'
            className={`form-control rounded input ${styles.search ?? ''}`}
            name={'search'}
            placeholder='Search by the course name ...'
            type='search'
            value={selectedFilters.search}
            onChange={e => {
              setSelectedFilters(prev => {
                return { ...prev, [e.target.name]: e.target.value };
              });
            }}
          />
        </div>
        <button className={styles.filter__icon} type='button'>
          <AiOutlineFilter />
        </button>
      </div>
      <div className='container'>
        <div className='d-flex flex-row'>
          <div className='input-group w-10'>
            <label className='form-label' htmlFor='customRange2'>
              Price range
            </label>
          </div>
          <CategoryFilter
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          <PaidFreeFilter
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
