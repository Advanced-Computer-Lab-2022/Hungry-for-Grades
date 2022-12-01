import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useQuery } from '@tanstack/react-query';

import ExamForm from './ExamForm';

import { QuestionFormValues } from './course-form-types';

import { ICourseQuestion } from '@/interfaces/course.interface';
import {
  createExam,
  getCourseByID
} from '@/services/axios/dataServices/CoursesDataService';
import { UseCountry } from '@/store/countryStore';
import ErrorMessage from '@/components/error/message/ErrorMessage';

function AddExam() {
  const country = UseCountry();

  const navigate = useNavigate();
  const { courseid } = useParams();
  const { isError, isLoading, data } = useQuery(
    ['courseByID', courseid, country],
    () => getCourseByID(courseid, country)
  );
  const submitAction = useCallback(
    async (questions: QuestionFormValues[]) => {
      const exam: ICourseQuestion[] = questions.map(q => ({
        question: q.question,
        answer: q.answer,
        options: q.options.map(o => o.value)
      }));
      const result = await createExam(courseid, exam);
      if (result) {
        toast('Exam was created successfully.');
        navigate(`/instructor`);
      }
    },
    [navigate, courseid]
  );

  if (isError) {
    return <ErrorMessage />;
  }
  if (isLoading) {
    return (
      <div className='text-info text-center'>Loading course information...</div>
    );
  }
  if (!data) {
    return <></>;
  }

  return (
    <div className='container'>
      <h1 className='text-center text-dark'>Create Exam</h1>
      <h4 className='text-dark'>Course: {data.title} </h4>
      <ExamForm createExam={submitAction} />
    </div>
  );
}
export default AddExam;
