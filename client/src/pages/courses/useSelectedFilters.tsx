import { useState } from 'react';

import { SelectFiltersType } from './types';

import { Level } from '@/enums/level.enum';

export function useSeletedFilters() {
  return useState<SelectFiltersType>({
    category: '',
    subCategory: '',
    searchTerm: '',
    free: false,
    paid: false,
    level: Level.BEGINNER,
    sortBy: 0,
    durationLow: 0,
    durationHigh: 12
  });
}
