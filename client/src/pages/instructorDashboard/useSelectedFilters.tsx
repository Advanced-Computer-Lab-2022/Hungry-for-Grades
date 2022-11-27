import { useState } from 'react';

import { SelectFiltersType } from './types';

export function useSeletedFilters() {
  return useState<SelectFiltersType>({
    category: '',
    subCategory: '',
    searchTerm: '',
    priceLow: 0,
    priceHigh: 1000,
    level: '',
    sortBy: 1,
    durationHigh: 100,
    country: 'CA'
  });
}
