import { Dispatch, SetStateAction } from 'react';

import { type SelectFiltersType } from '../types';

export type SearchSectionProps = {
  setSelectedFilters: Dispatch<SetStateAction<SelectFiltersType>>;
  selectedFilters: SelectFiltersType;
};
