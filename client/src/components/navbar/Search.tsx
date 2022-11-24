import './Search.scss';

import { BiSearchAlt } from 'react-icons/bi';
function Search() {

  return (
    <div className='content'>
      <div className='search'>
        <input
          aria-label='search'
          className='search__input'
          placeholder='enter your search'
          type='text'
        />
        <button
          aria-label='submit search'
          className='search__submit'
          type='button'
        >
          <BiSearchAlt className='search__icon' />
        </button>
      </div>
    </div>
  );
}

export default Search;
