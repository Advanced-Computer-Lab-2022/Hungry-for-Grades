import { useQuery } from '@tanstack/react-query';


import { CategoryRoute } from '@services/axios/dataServices/CategoryDataService';

import { getRequest } from '@services/axios/http-verbs';
import { HttpResponse } from '@/interfaces/response.interface';

type CategoryType = { label: string; subcategory: { label: string }[] }[];

async function categoryRequest() {
  return (await getRequest<HttpResponse<CategoryType>>(CategoryRoute.GET.getCategories))
    ?.data;
}

function useCategoryQuery() {
  return useQuery(['categories'], categoryRequest);
}

export default useCategoryQuery;
