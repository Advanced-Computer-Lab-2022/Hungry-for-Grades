/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import styles from './pagination.module.scss';
import { type PaginationProps } from './types';

function Pagination({ activePage, pages, setActivePage }: PaginationProps) {
  function getPages() {
    const elements = [];
    for (let i = 1; i <= pages; i++) {
      elements.push(
        <div
          key={i}
          className={`${activePage === i ? styles.active??'' : ''}`}
          onClick={() => setActivePage(i)}
        >
          {i < 10 ? `0${i}` : i}
        </div>
      );
    }
    return elements;
  }
  return (
    <div className={styles.pagination}>
      <div
        // Previous page (<) inactive if current page is 1
        className={`${styles['pagination-arrow'] ?? ''}${
          activePage === 1 ? styles.inactive ?? '' : ''
        }`}
        onClick={() =>
          activePage !== 1 && setActivePage((page: number) => page - 1)
        }
      >
        <GrFormPrevious />
      </div>
      {getPages()} {/* We will handle this method in the next step */}
      <div
        // Next Page (>) inactive if the current page is the last page.
				className={`${styles['pagination-arrow'] ?? ''}${
					activePage === pages ? styles.inactive ?? '' : ''
        }`}
        onClick={() =>
          activePage !== pages && setActivePage((page: number) => page + 1)
        }
      >
        <GrFormNext />
      </div>
    </div>
  );
}

export default Pagination;
