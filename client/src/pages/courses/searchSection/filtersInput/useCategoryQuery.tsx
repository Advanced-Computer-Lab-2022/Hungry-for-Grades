import { useQuery } from '@tanstack/react-query';

import { CategoryRoute } from '@services/axios/dataServices/CategoryDataService';

import { getRequest } from '@services/axios/http-verbs';

async function categoryRequest(): Promise<
  typeof CategoryRoute.GET.getCategories.response
> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return (await getRequest(CategoryRoute.GET.getCategories))?.data;
}

function useCategoryQuery() {
  return useQuery(['categories'], categoryRequest);
}

export default useCategoryQuery;
