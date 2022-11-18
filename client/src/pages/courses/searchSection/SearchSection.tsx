import { v4 as uuid } from 'uuid';

import { AiOutlineFilter } from 'react-icons/ai';

import { SetStateAction, useState } from 'react';

import styles from './SearchSection.module.scss';

import CategoryFilter from './filtersInput/Category&SubFilter';
import DurationFilter from './filtersInput/DurationFilter';
import LevelFilter from './filtersInput/LevelFilter';
import PaidFreeFilter from './filtersInput/Paid&FreeFilter';
import SortFilter from './filtersInput/SortFilter';

import { type SearchSectionProps } from './types';

import Range from '@components/inputs/range/Range';

import { ChangeEvent } from '@/components/common.types';
import ControlledStarsRating from '@/components/starsRating/ControlledStarsRating';

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
            <div className='d-flex flex-column gap-4 w-33 '>
              <CategoryFilter
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
              <Range
                label='Min Price'
                max={100}
                min={0}
                name='min'
                value={selectedFilters.min}
                onChangeFunc={function (event: ChangeEvent): void {
                  const value =
                    selectedFilters.free && selectedFilters.paid
                      ? event.target.value
                      : selectedFilters.paid &&
                        parseInt(event.target.value) === 0
                      ? 1
                      : parseInt(event.target.value);
                  setSelectedFilters(prev => {
                    return { ...prev, [event.target.name]: value };
                  });
                }}
              />
            </div>
            <div className='d-flex flex-column gap-4 w-33'>
              <SortFilter
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
              <ControlledStarsRating
                rating={selectedFilters.rating}
                setRating={function (value: SetStateAction<number>): void {
                  setSelectedFilters(prev => {
                    return { ...prev, rating: value };
                  });
                }}
              />
              <Range
                label='Max Price'
                max={100}
                min={0}
                name='max'
                value={selectedFilters.max}
                onChangeFunc={function (event: ChangeEvent): void {
                  setSelectedFilters(prev => {
                    const value =
                      selectedFilters.free && selectedFilters.paid
                        ? parseInt(event.target.value)
                        : selectedFilters.free
                        ? 0
                        : parseInt(event.target.value);
                    return { ...prev, [event.target.name]: value };
                  });
                }}
              />
            </div>
            <div className='d-flex flex-column gap-4 w-33'>
              <LevelFilter
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
              />
              <DurationFilter
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
