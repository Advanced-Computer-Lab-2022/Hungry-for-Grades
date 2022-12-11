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
export const AuthRoutes = {
  GET: {
    refresh: {
      URL: '/refresh' as const,
      params: '',
      query: '',
      payload: {}
    }
  },
  POST: {
    verifyEmail: {
      URL: '/verify' as const,
      params: '',
      query: '',
      payload: {
        email: '',
        username: ''
      }
    },
    login: {
      URL: '/login' as const,
      params: '',
      query: '',
      payload: {}
    },
    logout: {
      URL: '/auth/logout' as const,
      params: '',
      query: '',
      payload: {}
    },
    forgetPassword: {
      URL: '/forget' as const,
      params: '',
      query: '',
      payload: {
        email: ''
      }
    },
    changePassword: {
      URL: '/change-password' as const,
      params: '',
      query: '',
      payload: {
        _id: '',
        newPassword: '',
        role: ''
      }
    }
  }
};
