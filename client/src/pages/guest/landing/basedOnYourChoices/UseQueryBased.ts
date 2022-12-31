import { useQuery } from '@tanstack/react-query';

import { getRequest } from '@/services/axios/http-verbs';
import { CoursesRoutes } from '@/services/axios/dataServices/CoursesDataService';
import { ICourse } from '@/interfaces/course.interface';
import { PaginatedResponse } from '@/interfaces/response.interface';

function getBasedOn(cat: string, sub: string, activePage: number, con: string) {
  const Courses = CoursesRoutes.GET.getCoursesSearchFilter;

  Courses.query = `category=${cat}&subcategory=${sub}&page=${activePage}&limit=${3}&country=${con}`;

  return getRequest<PaginatedResponse<ICourse>>(Courses);
}

const useQueryBased = (
  cat: string,
  sub: string,
  activePage: number,
  con: string,
  locationn : Location
) => {
  return {
    ...useQuery(
      ['based-on-choices-guestt-and-allTheFamily', activePage, con, location, locationn],
      () => getBasedOn(cat, sub, activePage, con),
      {
        cacheTime: 1000 * 60 * 60 * 24,
        retryDelay: 1000,
        enabled: true // 1 second
      }
    )
  };
};

export default useQueryBased;
