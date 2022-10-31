import { useState } from 'react';

import { SelectFiltersType } from './types';

export function useSeletedFilters() {
  return useState<SelectFiltersType>({
    category: '',
    subCategory: '',
    searchTerm: '',
    priceLow: 0,
    priceHigh: 10000,
    level: '',
    sortBy: 1,
    durationLow: 0,
    durationHigh: 12,
    country: 'CA'
  });
}
