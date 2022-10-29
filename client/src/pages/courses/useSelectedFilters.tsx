import { useState } from 'react';

import { SelectFiltersType } from './types';

export function useSeletedFilters() {
  /*   const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
 */
  return useState<SelectFiltersType>({
    category: '',
    subCategory: '',
    search: '',
    rating: 0,
    free: false,
    paid: false
  });
}
