/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

function Filter() {
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  return <div>Filter</div>;
}

export default Filter;
