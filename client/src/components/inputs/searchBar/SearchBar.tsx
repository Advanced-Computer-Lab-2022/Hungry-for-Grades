import React from 'react';

import { type SearchBarProps } from './types';
function SearchBar(props: SearchBarProps) {
  const id = props.key;
  return (
    <div className='input-group' id={id}>
      <input
        aria-describedby='search-addon'
        aria-label='Search'
        className='form-control rounded input'
        name={props.name}
        placeholder='Search'
        type='search'
        value={props.value}
        onChange={e => props.onChange(e, e.target.value)}
      />
      <button
        className='btn btn-outline-primary'
        type='button'
        onClick={props.onClick}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
