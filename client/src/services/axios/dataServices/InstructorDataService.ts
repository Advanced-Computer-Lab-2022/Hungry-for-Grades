export const InstructorRoutes = {
  GET: {
    getCourses: {
      URL: '/courses/instructor',
      params: '',
      query: '',
      payload: {},
      response: {
        data: [
          {
            _course: {
              price: {
                currency: '',
                currentValue: 0,
                discounts: [
                  {
                    endDate: '',
                    percentage: 0,
                    startDate: '',
                    _id: ''
                  }
                ]
              },
              rating: {
                averageRating: 0
              },
              _id: '',
              _instructor: [''],
              announcements: [
                {
                  createdAt: '',
                  description: '',
                  title: '',
                  _id: ''
                }
              ],
              captions: ['', '', ''],
              category: '',
              coupouns: [
                {
                  code: '',
                  count: 0,
                  discount: 0,
                  expiryDate: '',
                  _id: ''
                }
              ],
              description: '',
              duration: 0,
              exam: [
                {
                  answer: '',
                  options: ['', '', '', ''],
                  question: '',
                  _id: ''
                }
              ],
              frequentlyAskedQuestions: [
                {
                  answer: '',
                  question: '',
                  votes: 0,
                  _id: ''
                }
              ],
              keywords: ['', '', '', '', '', ''],
              language: '',
              level: '',
              numberOfEnrolledTrainees: 0,
              outline: ['', '', '', ''],
              previewVideoURL: '',
              sections: [
                {
                  lessons: [
                    {
                      description: '',
                      duration: 2,
                      title: '',
                      videoURL: '',
                      _id: ''
                    }
                  ],
                  title: '',
                  _id: '',
                  exercises: []
                }
              ],
              subcategory: [''],
              thumbnail: '',
              title: '',
              createdAt: '',
              updatedAt: '',
              __v: 0,
              id: ''
            },
            earning: 0
          }
        ],
        page: 0,
        pageSize: 0,
        totalPages: 0,
        message: '',
        success: false
      }
    },
    getInstructor: {
      URL: '/instructor',
      params: '',
      query: '',
      payload: {},
      response: {
        data: {
          rating: { averageRating: 0 },
          _id: '',
          active: false,
          biography: '',
          email: {
            address: '',
            isValidated: false,
            _id: ''
          },
          name: '',
          profileImage: '',
          socialMedia: {
            facebook: '',
            github: '',
            linkedin: '',
            personalWebsite: '',
            youtube: '',
            _id: ''
          },
          speciality: '',
          title: '',
          username: '',
          lastLogin: '',
          phone: '',
          gender: '',
          country: '',
          __v: 0
        },
        message: '',
        success: ''
      }
    },
    getReviews: {
      URL: '/instructor/rating' as const,
      params: '',
      query: '',
      payload: {},
      response: {
        data: [
          {
            _trainee: {
              country: '',
              _id: '',
              name: '',
              profileImage: ''
            },
            comment: '',
            createdAt: '2022-10-27T19:43:02.000Z',
            rating: 1,
            _id: ''
          }
        ],
        page: 1,
        pageSize: 5,
        totalPages: 2,
        totalResults: 7,
        message: '',
        success: true
      }
    }
  },
  POST: {
    addDiscount: {
      URL: '',
      params: '',
      query: '',
      payload: {
        startDate: '',
        endDate: '',
        percentage: 0
      },
      response: ''
    }
  }
};
