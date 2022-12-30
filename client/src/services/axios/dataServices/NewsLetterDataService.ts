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
      }
    },
    sendEmail: {
      URL: '/newsletter' as const,
      params: '' as const,
      query: '' ,
      options: {},

      payload: {
        body: '',
        subject: ''
      }
    }
  },
  GET: {
    getAllSubscribers: {
      URL: '/newsletter/subscribers' as const,
      params: '' as const,
      query: '',
      options: {},

      payload: {}
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
      }
    }
  }
};
