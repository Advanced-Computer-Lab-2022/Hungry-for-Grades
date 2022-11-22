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
      payload: {},
      response: {
        data: {
          accessToken: '',
          refreshToken: ''
        }
      }
    }
  },
  POST: {
    login: {
      URL: '/login' as const,
      params: '',
      query: '',
      payload: {},
      options: {
        withCredentials: true
      },
      response: {
        data: {
          accessToken: '',
          user: {
            _id: '',
            active: false,
            email: {
              address: '',
              isValidated: false
            },
            name: '',
            password: '',
            profileImage: '',
            username: '',
            lastLogin: '',
            __v: 0
          }
        }
      }
    },
    logout: {
      URL: '/auth/logout' as const,
      params: '',
      query: '',
      payload: {},
      options: {
        withCredentials: true
      },
      response: {
        data: {
          accessToken: ''
        }
      }
    }
  }
};
