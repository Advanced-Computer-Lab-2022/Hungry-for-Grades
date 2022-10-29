import { useState } from 'react';

import { SelectFiltersType } from './types';


export function useSeletedFilters() {
  return useState<SelectFiltersType>({
    category: '',
    subCategory: '',
    searchTerm: '',
    free: false,
    paid: false,
    level: '',
    sortBy: 0,
    durationLow: 0,
    durationHigh: 12
  });
}
