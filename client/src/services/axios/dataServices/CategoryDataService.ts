/**
 *  Data service related to Course Category
 * @param  verb - The HTTP verb to use for the request
 * @param  route - The route to use for the request
 * @returns  The USER data service
 * @example
 *  GET request
 * const dataService = CategoryRoute.GET.getCategories;
 * set params/payload as needed
 * const response = await getRequest(dataService);
 */
export const CategoryRoute = {
  GET: {
    getCategories: {
      URL: '/courses/category' as const,
      params: '',
      payload: {},
      response: {
        data: [
          {
            label: '',
            subcategory: [{ label: '' }]
          }
        ]
      }
    }
  }
};
