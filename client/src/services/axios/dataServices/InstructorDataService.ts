export const InstructorRoutes = {
  GET: {
    getCourses: {
      URL: '/courses/instructor' as const,
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
    }
  }
};
