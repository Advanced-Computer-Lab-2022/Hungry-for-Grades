import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useQuery } from '@tanstack/react-query';

import { QuestionFormValues } from '../course-form/course-form-types';

import ExamForm from './ExamForm';


import { ICourseQuestion } from '@/interfaces/course.interface';
import {
  createExam,
  getCourseByID
} from '@/services/axios/dataServices/CoursesDataService';
import { UseCountry } from '@/store/countryStore';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import useInstructorId from '@/hooks/useInstuctorId';

function AddExam() {
  const country = UseCountry();
  const instructor = useInstructorId();
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
  if(!data._instructor.find(i => i._id === instructor)) {
    return <h1 className='text-danger text-center'>You cannot create an exam for a course you are not teaching</h1>
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
