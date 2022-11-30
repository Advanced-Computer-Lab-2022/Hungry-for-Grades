import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { SelectFiltersType } from '../pages/guest/searchCourses/types';

import { Level } from '@/enums/level.enum';

export default function useSeletedFilters() {
  const [searchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState<SelectFiltersType>({
    category: searchParams.get('category') || '',
    subCategory: searchParams.get('subCategory') || '',
    searchTerm: searchParams.get('searchTerm') || '',
    free: Boolean(searchParams.get('free') || false),
    paid: Boolean(searchParams.get('paid') || false),
    level: (searchParams.get('level') || '') as Level,
    sortBy: parseInt(searchParams.get('sortBy') || '0') as 0 | 1,
    durationLow: parseInt(searchParams.get('durationLow') || '0'),
    durationHigh: parseInt(searchParams.get('durationHigh') || '12'),
    country: searchParams.get('country') || 'CA',
    rating: parseInt(searchParams.get('rating') || '0'),
    min: parseInt(searchParams.get('min') || '0'),
    max: parseInt(searchParams.get('max') || '10000000')
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(searchParams.values().next());
    if (selectedFilters) {
      const params = new URLSearchParams();
      params.append('category', selectedFilters.category);
      params.append('subCategory', selectedFilters.subCategory);
      params.append('free', String(selectedFilters.free));
      params.append('paid', String(selectedFilters.paid));
      params.append('level', selectedFilters.level);
      params.append('sortBy', String(selectedFilters.sortBy));
      params.append('durationLow', String(selectedFilters.durationLow));
      params.append('durationHigh', String(selectedFilters.durationHigh));
      params.append('country', selectedFilters.country);
      params.append('rating', String(selectedFilters.rating));
      params.append('min', String(selectedFilters.min));
      params.append('max', String(selectedFilters.max));
      params.append('searchTerm', String(selectedFilters.searchTerm));
      navigate({ search: params.toString() });
    }
  }, [navigate, searchParams, selectedFilters]);
  return [selectedFilters, setSelectedFilters];
}

/*
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
    durationHigh: 12,
    country: 'CA',
    rating: 0,
    min: 0,
    max: 1000
  });
} */
