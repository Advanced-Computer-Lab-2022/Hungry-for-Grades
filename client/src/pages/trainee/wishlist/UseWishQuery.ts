import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { getRequest } from '@/services/axios/http-verbs';

async function getCourses(activePage: number) {
  const Courses = TraineeRoutes.GET.getMyWishlist;

  Courses.URL = 'trainee/637969352c3f71696ca34759/wishlist';

  Courses.query = `page=${activePage}
      &limit=${6}`;

  return getRequest(Courses);
}
const useWishQuery = (location: Location) => {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(
      ['traine-wishes', activePage, location],
      () => getCourses(activePage),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: true // 1 second
      }
    ),
    activePage,
    setActivePage
  };
};

export default useWishQuery;
