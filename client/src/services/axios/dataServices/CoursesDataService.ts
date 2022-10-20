export const CoursesRoutes = {
  GET: {
    getCourseById: {
      URL: '/courses' as const,
      query: 'id=1;', //
      payload: {},
      params: '',
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
    createCourse: {
      URL: '/courses' as const,
      query: '',
      payload: {
        name: '',
        description: ''
      },
      response: {
        _id: '',
        success: true
      }
    }
  },
  PUT: {},
  PATCH: {},
  DELETE: {}
};
