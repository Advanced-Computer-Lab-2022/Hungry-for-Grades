import { AiOutlineFilter } from 'react-icons/ai';

import { SetStateAction, useState } from 'react';

import styles from './SearchSection.module.scss';

import CategoryFilter from './filtersInput/Category&SubFilter';
import DurationFilter from './filtersInput/DurationFilter';
import LevelFilter from './filtersInput/LevelFilter';
import PaidFreeFilter from './filtersInput/Paid&FreeFilter';
import SortFilter from './filtersInput/SortFilter';

import { type SearchSectionProps } from './types';

import Dictaphone from '@components/dictaphone/Dictaphone';

import Range from '@components/inputs/range/Range';

import { ChangeEvent } from '@/components/common.types';
import ControlledStarsRating from '@/components/starsRating/ControlledStarsRating';

type SearchTitleProps = {
  heading: string;
  subHeading: string;
};

function SearchSection(props: SearchSectionProps & SearchTitleProps) {
  const { setSelectedFilters, selectedFilters } = props;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className={styles.searchSection__container}>
      <div className={`container-fluid bg-dark ${styles.searchSection ?? ''}`}>
        {props.subHeading && props.heading && (
          <div className='container my-3 mb-5'>
            <h1 className={`${styles.heading ?? ''} mt-5 text-black`}>
              {props.heading}
            </h1>
            <h2 className={`${styles.subheading ?? ''} text-primary`}>
              {props.subHeading}
            </h2>
          </div>
        )}
        <div className={`fluid-container ${styles.searchFilters ?? ''} `}>
          <div className='container pb-5 pt-0 mx-auto pt-0 d-flex flex-row justify-content-between'>
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
              className={`${styles.filter__icon ?? ''} mx-4 pb-3`}
              type='button'
              onClick={() => setIsFilterOpen(prev => !prev)}
            >
              <AiOutlineFilter />
            </button>
            <Dictaphone
              onChange={function onChange(value) {
                //alert(value);
                setSelectedFilters(prev => {
                  return { ...prev, searchTerm: value };
                });
              }}
            />
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
                max={1000000000000000}
                min={0}
                name='min'
                value={selectedFilters.min}
                onChangeFunc={function (event: ChangeEvent): void {
                  const correctValue =
                    parseInt(event.target.value) < selectedFilters.max
                      ? parseInt(event.target.value)
                      : selectedFilters.max;

                  const value =
                    selectedFilters.free && selectedFilters.paid
                      ? correctValue
                      : selectedFilters.paid && correctValue === 0
                      ? 1
                      : correctValue;
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
                max={1000000000000000}
                min={0}
                name='max'
                value={selectedFilters.max}
                onChangeFunc={function (event: ChangeEvent): void {
                  setSelectedFilters(prev => {
                    const correctValue =
                      parseInt(event.target.value) > selectedFilters.min
                        ? parseInt(event.target.value)
                        : selectedFilters.max;

                    const value =
                      selectedFilters.free && selectedFilters.paid
                        ? correctValue
                        : selectedFilters.free
                        ? 0
                        : correctValue;

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
