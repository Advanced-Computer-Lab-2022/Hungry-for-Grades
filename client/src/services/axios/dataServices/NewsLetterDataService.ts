export const NewsLetterRoutes = {
  POST: {
    subscribe: {
      URL: '/newsletter/subscribe' as const,
      params: '' as const,
      query: '' as const,
      options: {},
      payload: {
        email: '',
        role: ''
      },
      response: {
        data: {},
        message: '',
        success: ''
      }
    },
    sendEmail: {
      URL: '/newsletter' as const,
      params: '' as const,
      query: '' as const,
      options: {},

      payload: {
        body: '',
        subject: ''
      },
      response: {
        data: {},
        message: '',
        success: ''
      }
    }
  },
  GET: {
    getAllSubscribers: {
      URL: '/newsletter/subscribers' as const,
      params: '' as const,
      query: '' as const,
      options: {},

      payload: {},
      response: {
        data: {},
        message: '',
        success: ''
      }
    }
  },
  DELETE: {
    deleteSubscriber: {
      URL: '/newsletter/subscriber' as const,
      params: '' as const,
      query: '' as const,
      options: {},
      payload: {
        email: ''
      },
      response: {
        data: {},
        message: '',
        success: ''
      }
    }
  }
};
