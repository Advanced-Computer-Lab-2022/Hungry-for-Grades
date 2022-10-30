export const AdminRoutes = {
  POST: {
    createAdmin: {
      URL: '/admin' as const,
      params: '' as const,
      query: '' as const,
      payload: {
        email: {
          address: ''
        },
        password: '',
        username: '',
        name: '',
        address: {
          city: '',
          country: ''
        },
        role: 'Admin' as const
      },
      response: {
        data: {},
        message: '',
        success: ''
      }
    }
  }
};
