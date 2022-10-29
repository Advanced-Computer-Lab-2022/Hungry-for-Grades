/**
 *  all the data services related to user
 * @param  verb - The HTTP verb to use for the request
 * @param  route - The route to use for the request
 * @returns  The USER data service
 * @example
 *  GET request
 * const dataService = UserRoutes.GET.getCSRFToken;
 * set params/payload as needed
 * const response = await getRequest(dataService);
 */
export const UserRoutes = {
  GET: {
    getCSRFToken: {
      URL: '/getCSRFToken' as const,
      params: '',
      payload: {},
      response: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: ''
      }
    },
    getUser: {
      URL: '/getUser' as const,
      params: '',
      payload: {},
      response: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  POST: {
    login: {
      URL: '/auth/login' as const,
      params: '',
      payload: {
        email: {
          address: ''
        },
        password: ''
      },
      response: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: ''
      }
    },
    logout: {
      URL: '/logout' as const,
      params: '',
      payload: {
        email: '',
        password: ''
      },
      response: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: ''
      }
    },
    register: {
      URL: '/register' as const,
      params: '',
      payload: {
        username: ''
      },
      response: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  PUT: {
    updateUser: {
      URL: '/logout' as const,
      params: '',
      payload: {
        email: '',
        password: ''
      },
      response: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  PATCH: {
    updateUser: {
      URL: '/logout' as const,
      params: '',
      payload: {
        email: '',
        password: ''
      },
      response: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  DELETE: {
    deleteUser: {
      URL: '/logout' as const,
      params: '',
      payload: {
        email: '',
        password: ''
      },
      response: {
        _id: '',
        username: '',
        email: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  }
};
