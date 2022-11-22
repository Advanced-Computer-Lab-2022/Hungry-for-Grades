export const TraineeRoutes = {
  GET: {
    getMyCourses: {
      URL: '',
      params: '',
      query: '',
      payload: '',
      response: {
        data: [
          {
            _course: {
              price: {
                currency: '',
                currentValue: 0,
                discounts: []
              },
              rating: {
                averageRating: 0,
                reviews: []
              },
              _id: '',
              _instructor: [
                {
                  rating: {
                    reviews: []
                  },
                  _id: '',
                  name: '',
                  profileImage: ''
                }
              ],
              captions: [''],
              category: '',
              duration: 0,
              language: '',
              level: '',
              previewVideoURL: '',
              subcategory: [''],
              thubmnail: '',
              title: '',
              id: ''
            },
            dateOfEnrollment: '',
            _id: '',
            notes: [],
            examGrade: 0,
            progress: 0
          }
        ]
      }
    }
  },
  POST: {
    signup: {
      URL: '/trainee/signup' as const,
      params: '',
      query: '',
      payload: {
        firstName: '',
        lastName: '',
        birthDate: '',
        phone: '',
        email: {
          address: ''
        },
        username: '',
        password: '',
        gender: '',
        country: ''
      }
    }
  }
};
