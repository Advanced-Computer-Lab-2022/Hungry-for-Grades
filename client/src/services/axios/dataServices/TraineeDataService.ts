
import { getRequest, postRequest } from '../http-verbs';

import { getCourseReviews } from './CoursesDataService';

import { Review, ICourseReview, Rating } from '@/interfaces/course.interface';
import { PaginatedRequest } from '@/interfaces/request.interface';
import { HttpResponse } from '@/interfaces/response.interface';
import { SubmittedQuestion } from '@/interfaces/user.interface';

export const TraineeRoutes = {
  GET: {
    getMyCourses: {
      URL: '',
      params: '',
      query: '',
      payload: {}
    },
    getMyCart: {
      URL: '',
      params: '',
      query: '',
      payload: {}
    },
    getMyWishlist: {
      URL: '',
      params: '',
      query: '',
      payload: {}
    },
    getLastViewed: {
      URL: '',
      params: '',
      query: '',
      payload: {}
    },
    getEnrolledCourse: {
      URL: '',
      params: '',
      query: '',
      payload: {}
    },
    getTrainee: {
      URL: '',
      params: '',
      query: '',
      payload: {}
    },
    getSubmittedQuestions: {
      URL: '',
      params: '',
      query: '',
      payload: ''
    }
  },
  POST: {
    storeNotes: {
      URL: '/trainee/notes' as const,
      params: '',
      query: '',
      payload: {}
    },
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
      }
    },
    addToWishlist: {
      URL: '',
      params: '',
      query: '',
      payload: {}
    },
    changePassword: {
      URL: '/change-password' as const,
      params: '',
      query: '',
      payload: {}
    },
    addSubmittedQuestion: {
      URL: '',
      params: '',
      query: '',
      payload: {} as object,
    },
    addReviewToCourse: {
      URL: 'courses/rating' as const,
      params: '',
      query: '',
      payload: {} as Review,
    }
  },
  DELETE: {
    removeFromCart: {
      URL: '',
      params: '',
      query: '',
      payload: {}
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
): Promise<Rating | null> {
  if (!courseId || !traineeReview) {
    return null;
  }
  const newReview = TraineeRoutes.POST.addReviewToCourse;
  newReview.params = encodeURIComponent(courseId);
  newReview.payload = traineeReview;
  const res = await postRequest<HttpResponse<Rating>>(newReview);
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
  const answerToQuestion = TraineeRoutes.POST.addSubmittedQuestion;
  answerToQuestion.URL = `/trainee/${encodeURIComponent(
    traineeId
  )}/course/${encodeURIComponent(courseId)}/exercise/${encodeURIComponent(
    exerciseId
  )}/question/${encodeURIComponent(questionId)}`;
  answerToQuestion.payload = {answer};
  await postRequest<HttpResponse<SubmittedQuestion>>(answerToQuestion);
}

export async function getSubmittedQuestions(
  courseId: string | undefined,
  traineeId: string | undefined,
  exerciseId: string | undefined
): Promise<SubmittedQuestion[] | null> {
  if (!courseId || !traineeId || !exerciseId) {
    return null;
  }
  const submittedQuestion = TraineeRoutes.GET.getSubmittedQuestions;
  submittedQuestion.URL = `/trainee/${encodeURIComponent(
    traineeId
  )}/course/${encodeURIComponent(courseId)}/exercise/${encodeURIComponent(
    exerciseId
  )}`;
  const res = await getRequest<HttpResponse<SubmittedQuestion[]>>(
    submittedQuestion
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data?.data;
}
