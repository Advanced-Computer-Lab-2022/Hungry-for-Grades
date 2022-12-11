import { useQuery } from '@tanstack/react-query';

import { getRequest } from '@/services/axios/http-verbs';

import { CoursesRoutes } from '@/services/axios/dataServices/CoursesDataService';

async function getDiscounts(id: string) {
  const Discounts = CoursesRoutes.GET.getDiscounts;

  Discounts.URL = `/courses/${id}/discount`;

  return getRequest(Discounts);
}
const useCourseDiscountsQuery = (id: string, refresh: number) => {
  return {
    ...useQuery(['course-discountsss', refresh, id], () => getDiscounts(id), {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000,
      enabled: true // 1 second
    })
  };
};

export default useCourseDiscountsQuery;
