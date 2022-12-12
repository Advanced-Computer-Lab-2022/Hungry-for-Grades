import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { getRequest } from '@/services/axios/http-verbs';
import { IUser } from '@/interfaces/user.interface';
import { PaginatedResponse } from '@/interfaces/response.interface';
import { ICourse } from '@/interfaces/course.interface';

async function getCourses(activePage: number, user : IUser) {
  const Courses = TraineeRoutes.GET.getMyWishlist;

  Courses.URL = `trainee/${user?._id}/wishlist`;

  Courses.query = `page=${activePage}
      &limit=${6}`;

  return getRequest<PaginatedResponse<ICourse>>(Courses);
}
const useWishQuery = (location: Location, user : IUser) => {
  const [activePage, setActivePage] = useState<number>(1);

  return {
    ...useQuery(
      ['traine-wishes', activePage, location],
      () => getCourses(activePage, user),
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
