import { v4 as uuid } from 'uuid';

import { AiOutlineFilter } from 'react-icons/ai';

import { useState } from 'react';

import styles from './SearchSection.module.scss';

import CategoryFilter from './filtersInput/Category&SubFilter';
import DurationFilter from './filtersInput/DurationFilter';
import LevelFilter from './filtersInput/LevelFilter';
import PaidFreeFilter from './filtersInput/Paid&FreeFilter';
import SortFilter from './filtersInput/SortFilter';
import { type SearchSectionProps } from './types';

function SearchSection(props: SearchSectionProps) {
  const id = uuid();
  const { setSelectedFilters, selectedFilters } = props;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className={styles.searchSection__container}>
      <div className={`container-fluid bg-dark ${styles.searchSection ?? ''}`}>
        <div className='container my-3 mb-5'>
          <h1 className={`${styles.heading ?? ''}`}>Search for Courses</h1>
          <h2 className={`${styles.subheading ?? ''}`}>subheading</h2>
        </div>
        <div className={`fluid-container ${styles.searchFilters ?? ''}`}>
          <div
            className='container p-5 d-flex flex-row justify-content-between'
            id={id}
          >
            <div className='input-group '>
              <input
                aria-describedby='search-addon'
                aria-label='Search'
                className={`form-control rounded input ${styles.search ?? ''}`}
                name={'searchTerm'}
								placeholder='Search by the course name ...'
                type='search'

                value={selectedFilters.searchTerm}
                onChange={e => {
                  setSelectedFilters(prev => {
                    return { ...prev, [e.target.name]: e.target.value };
                  });
                }}
              />
            </div>
            <button
              className={styles.filter__icon}
              type='button'
              onClick={() => setIsFilterOpen(prev => !prev)}
            >
              <AiOutlineFilter />
            </button>
          </div>
          <div
            className={`${
              isFilterOpen ? '' : 'd-none '
            } container d-flex flex-row justify-content-evenly gap-5 mb-3 ${
              styles.filters ?? ''
            }`}
          >
            <CategoryFilter
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
            <div className='d-flex flex-column gap-4 w-100'>
              <LevelFilter
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
              <DurationFilter
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
            </div>
            <div className='d-flex flex-column gap-4 w-100'>
              <SortFilter
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
      </div>
    </section>
  );
}

export default SearchSection;
