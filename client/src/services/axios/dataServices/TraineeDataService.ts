import axios from 'axios';

import { getCourseReviews } from './CoursesDataService';

import { Review, ICourseReview, Rating } from '@/interfaces/course.interface';
import { PaginatedRequest } from '@/interfaces/request.interface';
import { HttpResponse } from '@/interfaces/response.interface';
import { SubmittedQuestion } from '@/interfaces/user.interface';

const APP_BASE_API_URL = import.meta.env.VITE_SERVER_BASE_API_URL;

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

export async function getTraineeReviewById(
  courseId: string | undefined,
  traineeId: string
): Promise<ICourseReview | null> {
  const props: PaginatedRequest = {
    page: 1,
    limit: 1000
  };
  const result = await getCourseReviews(courseId, props);
  if (!result) {
    return null;
  }
  const revs = result?.data.map(r => ({
    _traineeId: r._trainee._id,
    comment: r.comment,
    createdAt: r.createdAt,
    rating: r.rating
  }));
  return revs?.find(r => r._traineeId === traineeId) ?? null;
}

export async function addReviewToCourse(
  courseId: string | undefined,
  traineeReview: Review
): Promise<Rating | undefined> {
  if (!courseId) {
    return undefined;
  }
  const res = await axios.post<HttpResponse<Rating>>(
    `${APP_BASE_API_URL}/courses/rating/${encodeURIComponent(courseId)}`,
    traineeReview
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}

export async function addSubmittedQuestion(
  courseId: string | undefined,
  traineeId: string | undefined,
  exerciseId: string | undefined,
  questionId: string | undefined,
  answer: string | undefined
): Promise<void> {
  if (!courseId || !traineeId || !exerciseId || !questionId || !answer) {
    return;
  }
  await axios.post<HttpResponse<SubmittedQuestion>>(
    `${APP_BASE_API_URL}/trainee/${encodeURIComponent(
      traineeId
    )}/course/${encodeURIComponent(courseId)}/exercise/${encodeURIComponent(
      exerciseId
    )}/question/${encodeURIComponent(questionId)}`,
    { answer }
  );
}

export async function getSubmittedQuestions(
  courseId: string | undefined,
  traineeId: string | undefined,
  exerciseId: string | undefined
): Promise<SubmittedQuestion[] | null> {
  if (!courseId || !traineeId || !exerciseId) {
    return null;
  }
  const res = await axios.get<HttpResponse<SubmittedQuestion[]>>(
    `${APP_BASE_API_URL}/trainee/${encodeURIComponent(
      traineeId
    )}/course/${encodeURIComponent(courseId)}/exercise/${encodeURIComponent(
      exerciseId
    )}`
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}
