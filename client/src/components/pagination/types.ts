import { Dispatch, SetStateAction } from 'react';

export type PaginationProps = {
  activePage: number;
  pages: number;
  setActivePage: Dispatch<SetStateAction<number>>;
};
