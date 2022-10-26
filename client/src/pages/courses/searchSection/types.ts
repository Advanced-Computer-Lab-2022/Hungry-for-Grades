import { Dispatch, SetStateAction } from 'react';

import { type SelectFiltersType } from '../useFilters';

export type SearchSectionProps = {
  setSelectedFilters: Dispatch<SetStateAction<SelectFiltersType>>;
  selectedFilters: SelectFiltersType;
};
