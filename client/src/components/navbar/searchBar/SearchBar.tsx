import { BsSearch } from 'react-icons/bs';

import { FormEvent, useEffect, useRef } from 'react';

import { useSearchParams } from 'react-router-dom';

import styles from './SearchBar.module.scss';

import useNavigateSearch from '@hooks/useNavigateSearch';
export default function SearchBar() {
  const [searchParams] = useSearchParams();
  const navigateSearch = useNavigateSearch();
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const value = searchRef?.current?.value || '';
    navigateSearch('/courses', { searchTerm: value });
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = searchParams.get('searchTerm') || '';
    }
  }, [searchParams]);

  return (
    <div style={{ width: '50%', marginLeft: '0', marginRight: '3%' }}>
      <form className={styles.bar} onSubmit={handleSearch}>
        <BsSearch
          style={{
            color: 'grey',
            fontSize: '20px',
            marginLeft: '0.8rem',
            width: '5%'
          }}
        />
        <input
          ref={searchRef}
          aria-label='search'
          className={styles.actual}
          defaultValue={searchParams.get('searchTerm') || ''}
          placeholder='Search for courses ...'
          type='text'
        />
      </form>
    </div>
  );
}
