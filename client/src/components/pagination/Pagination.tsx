/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import './pagination.scss';
import { type PaginationProps } from './types';

function Pagination({ activePage, pages, setActivePage }: PaginationProps) {
  function getPages() {
    const elements = [];
    for (let i = 1; i <= pages; i++) {
      elements.push(
        <div
          key={i}
          className={`${activePage === i ? 'active' : ''}`}
          onClick={() => setActivePage(i)}
        >
          {i < 10 ? `0${i}` : i}
        </div>
      );
    }
    return elements;
  }
  return (
    <div className='pagination'>
      <div
        // Previous page (<) inactive if current page is 1
        className={`pagination-arrow ${activePage === 1 ? 'inactive' : ''}`}
        onClick={() =>
          activePage !== 1 && setActivePage((page: number) => page - 1)
        }
      >
        {'<'}
      </div>
      {getPages()} {/* We will handle this method in the next step */}
      <div
        // Next Page (>) inactive if the current page is the last page.
        className={`pagination-arrow ${activePage === pages ? 'inactive' : ''}`}
        onClick={() =>
          activePage !== pages && setActivePage((page: number) => page + 1)
        }
      >
        {'>'}{' '}
      </div>
    </div>
  );
}

export default Pagination;
