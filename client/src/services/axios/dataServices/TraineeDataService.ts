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
    },
    getMyCart: {
      URL: '',
      params: '',
      query: '',
      payload: '',
      response: {
        data: [
          {
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
                  averageRating: 0,
                  reviews: []
                },
                _id: '',
                name: '',
                profileImage: '',
                speciality: '',
                title: ''
              }
            ],
            category: '',
            description: '',
            subcategory: [''],
            thumbnail: '',
            title: '',
            id: ''
          }
        ]
      }
    },
    getMyWishlist: {
      URL: '',
      params: '',
      query: '',
      payload: '',
      response: {
        data: [
          {
            price: {
              currency: '',
              currentValue: 0,
              discounts: [
                {
                  endData: '',
                  percentage: 0,
                  startDate: '',
                  _id: ''
                }
              ]
            },
            rating: {
              averageRating: 0,
              reviews: []
            },
            _id: '',
            _instructor: [
              {
                rating: {
                  averageRating: 0,
                  reviews: []
                },
                _id: '',
                name: '',
                profileImage: '',
                speciality: '',
                title: ''
              }
            ],
            category: '',
            description: '',
            subcategory: [''],
            thumbnail: '',
            title: '',
            id: ''
          }
        ]
      }
    },
    getLastViewed: {
      URL: '',
      params: '',
      query: '',
      payload: '',
      response: {
        data: {
          price: {
            currency: '',
            currentValue: 0,
            discounts: []
          },
          rating: {
            averagerating: 0,
            reviews: []
          },
          _id: '',
          _instructor: [
            {
              rating: {
                averageRating: 0,
                reviews: []
              },
              _id: '',
              name: '',
              profileImage: '',
              speciality: '',
              title: ''
            }
          ],
          category: '',
          description: '',
          subcategory: [],
          thubmnail: '',
          title: '',
          id: ''
        },
        message: '',
        success: true
      }
    },
    getEnrolledCourse: {
      URL: '',
      params: '',
      query: '',
      payload: '',
      response: {
        data: [
          {
            _course: {
              _id: '',
              category: '',
              description: '',
              duration: 0,
              level: '',
              numberOfEnrolledTrainees: 0,
              previewVideoURL: '',
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
              subcategory: [''],
              thumbnail: '',
              title: ''
            },
            earning: 0
          },
          {
            _course: {
              _id: '',
              category: '',
              description: '',
              duration: 0,
              level: '',
              numberOfEnrolledTrainees: 0,
              previewVideoURL: '',
              price: {
                currency: '',
                currentValue: 0,
                discounts: []
              },
              rating: {
                averageRating: 0
              },
              subcategory: ['', ''],
              thumbnail: '',
              title: ''
            },
            earning: 0
          }
        ],
        page: 0,
        pageSize: 0,
        totalPages: 0,
        totalResults: 0,
        message: '',
        success: false
      }
    },
    getTrainee: {
      URL: '',
      params: '',
      query: '',
      payload: '',
      response: {
        data: {
          _id: '',
          _cart: [''],
          _wishlist: [''],
          active: false,
          balance: 0,
          email: {
            address: '',
            _id: '',
            isVerified: false
          },
          name: '',
          preferredSkills: [],
          profileImage: '',
          username: '',
          _enrolledCourses: [
            {
              _course: '',
              dateOfEnrollment: '',
              _id: '',
              notes: [],
              examGrade: 0,
              progress: 0,
              dateOfCompletion: '',
              _visitedLessons: [],
              _submittedQuestions: [
                {
                  _questionId: '',
                  submittedAnswer: ''
                }
              ]
            }
          ],
          creditCards: [],
          createdAt: '',
          updatedAt: '',
          lastLogin: '',
          phone: '',
          gender: '',
          __v: 0,
          country: '',
          _lastViewedCourse: ''
        },
        message: '',
        success: false
      }
    }
  },
  POST: {
    signup: {
      URL: '/trainee/signup' as const,
      params: '',
      query: '',
      payload: {
        name: '',
        birthDate: '',
        phone: '',
        email: {
          address: ''
        },
        username: '',
        password: '',
        gender: '',
        country: ''
      },
      response: {
        data: {
          accessToken: '',
          refreshToken: ''
        }
      }
    },
    addToWishlist: {
      URL: '',
      params: '',
      query: '',
      payload: '',
      response: {
        data: [],
        message: '',
        success: false
      }
    },
    changePassword: {
      URL: '/change-password' as const,
      params: '',
      query: '',
      payload: {},
      response: {
        data: {},
        message: '',
        success: false
      }
    }
  },
  DELETE: {
    removeFromCart: {
      URL: '',
      params: '',
      query: '',
      payload: '',
      response: {
        data: '',
        message: '',
        success: ''
      }
    }
  }
};
