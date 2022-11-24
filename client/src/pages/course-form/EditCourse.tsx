import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { useMemo } from 'react';
import { toast } from 'react-toastify';

import {
  AnswerFormValues,
  ExerciseFormValues,
  getUniqueId,
  LessonFormValues,
  OutlineFormValues,
  QuestionFormValues,
  SectionFormValues
} from './course-form-types';
import CourseForm from './CourseForm';

import { UseCountry } from '@/store/countryStore';
import {
  createCourse,
  getCourseByID
} from '@/services/axios/dataServices/CoursesDataService';

import { IAddCourseRequest } from '@/interfaces/course.interface';

function EditCourse() {
  const country = UseCountry();
  const { courseid } = useParams();
  const { isError, isLoading, data } = useQuery(
    ['courseByID', courseid, country],
    () => getCourseByID(courseid, country)
  );
  const navigate = useNavigate();
  const submitAction = useMemo(
    () => async (course: IAddCourseRequest) => {
      const result = await createCourse(course);
      if (result) {
        toast('Course was updated successfully.');
        navigate(`/course/${result._id}`);
      }
    },
    [navigate]
  );
  if (isError) {
    return (
      <h1 className='text-danger text-center'>
        An error has occurred while loading course information.
      </h1>
    );
  }
  if (isLoading) {
    return (
      <div className='text-info text-center'>Loading course information...</div>
    );
  }
  if (!data) {
    return <></>;
  }
  const initialValues = {
    info: {
      title: data.title,
      description: data.description,
      language: data.language,
      level: data.level,
      price: data.price.currentValue.toString(),
      thumbnail: data.thumbnail,
      previewVideoURL: data.previewVideoURL
    },
    outline: data.outline.map(o => ({
      uid: getUniqueId(),
      value: o
    })) as OutlineFormValues[],
    sections: data.sections.map(s => ({
      uid: getUniqueId(),
      title: s.title,
      description: s.description,
      lessons: s.lessons.map(l => ({
        uid: getUniqueId(),
        duration: l.duration.toString(),
        videoURL: l.videoURL,
        title: l.title,
        description: l.description
      })) as LessonFormValues[],
      exercises: s.exercises.map(e => ({
        uid: getUniqueId(),
        title: e.title,
        questions: e.questions.map(q => ({
          uid: getUniqueId(),
          question: q.question,
          options: q.options.map(o => ({
            uid: getUniqueId(),
            value: o
          })) as AnswerFormValues[],
          answer: q.answer
        })) as QuestionFormValues[]
      })) as ExerciseFormValues[]
    })) as SectionFormValues[]
  };

  return (
    <CourseForm
      isUpdating
      initialValues={initialValues}
      submitAction={submitAction}
    />
  );
}
export default EditCourse;
