import './Search.scss';

import { BiSearchAlt } from 'react-icons/bi';
import { FormEvent, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
function Search() {
  const [, setSearchParams] = useSearchParams();

  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const value = searchRef?.current?.value || '';
    setSearchParams(['search', value]);
  };

  return (
    <div className='content'>
      <div className='search'>
        <form onSubmit={handleSearch}>
          <input
            ref={searchRef}
            aria-label='search'
            className='search__input'
            placeholder='Search for course'
            type='text'
          />
          <button
            aria-label='submit search'
            className='search__submit'
            type='submit'
          >
            <BiSearchAlt className='search__icon' />
            su
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
